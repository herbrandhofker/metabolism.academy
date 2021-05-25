import { LitElement, html, css, svg } from 'lit-element';
import { youtubeDialog, getStaticVideo,configs } from './youtube-dialog.mjs'

class YoutubeVideo extends LitElement {

    static get styles() {
        return css`
        svg {
            max-width: 1.6rem;
            max-height: 1.6rem    
        }
        path {
            fill: var(--primary-color);
        }
      
        path:hover {
            fill: var(--secundairy-color);
        }     
        `;
    }

    constructor() {
        super();
        this.videoData = null;
        this.title = "";
    }

    static get properties() {
        return {
            videoData: Object,
            title: String
        };
    }

    render() {
        return html`
        <svg id="button" @click="${() => this.createVideo()}" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube-square"
            class="svg-inline--fa fa-youtube-square fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512">
         <path d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z">
        </path>
        </svg>`;
    }

    createVideo() {
        let videoDialog = null;
        if (configs.has(this.videoData.id)) {
            videoDialog = configs.get(this.videoData.id).videoDialog;
        }
        else
            videoDialog = getStaticVideo(this.videoData.id);

        youtubeDialog.style.display = "block";
        youtubeDialog.title = this.title;

        const start = getSeconds(this.videoData.start);
        const end = getSeconds(this.videoData.end);
        const config = configs.get(this.videoData.id);
        config.video.currentTime = start;
        config.data.current = start;
        config.data.start = start;
        config.data.end = end;
        config.video.play();
        youtubeDialog.content.innerHTML = null;
        youtubeDialog.content.appendChild(videoDialog)     

        function getSeconds(str) {
            const s = str.split(":");
            let total = 0;
            if (s.length > 2) {
                total += 60 * 60 * parseInt(s[0]);
                total += 60 * parseInt(s[1]);
                total += parseInt(s[2]);
                return total
            }
            if (s.length > 1) {
                total += 60 * parseInt(s[0]);
                total += parseInt(s[1]);
                return total
            }
            total += parseInt(s[0])
            return total;
        }
    }
}



customElements.define("my-youtube-button", YoutubeVideo);
