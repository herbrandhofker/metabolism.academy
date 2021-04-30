import { LitElement, html, css } from 'lit-element';

const svgWidth = 20;
const svgHeight = svgWidth;
const closeSvg = `<svg width="` + svgWidth + `" height="` + svgHeight + `" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>`;
const playSvg = `<svg width="` + svgWidth + `" height="` + svgHeight + `" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1576 927l-1328 738q-23 13-39.5 3t-16.5-36v-1472q0-26 16.5-36t39.5 3l1328 738q23 13 23 31t-23 31z"/></svg>`;
const pauseSvg = `<svg width="` + svgWidth + `" height="` + svgHeight + `" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 192v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45zm-896 0v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45z"/></svg>`;
const volumeOffSvg = `<svg width="` + svgWidth + `" height="` + svgHeight + `" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1280 352v1088q0 26-19 45t-45 19-45-19l-333-333h-262q-26 0-45-19t-19-45v-384q0-26 19-45t45-19h262l333-333q19-19 45-19t45 19 19 45z"/></svg>`
const volumeOnSvg = `<svg width="` + svgWidth + `" height="` + svgHeight + `" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M832 352v1088q0 26-19 45t-45 19-45-19l-333-333h-262q-26 0-45-19t-19-45v-384q0-26 19-45t45-19h262l333-333q19-19 45-19t45 19 19 45zm384 544q0 76-42.5 141.5t-112.5 93.5q-10 5-25 5-26 0-45-18.5t-19-45.5q0-21 12-35.5t29-25 34-23 29-36 12-56.5-12-56.5-29-36-34-23-29-25-12-35.5q0-27 19-45.5t45-18.5q15 0 25 5 70 27 112.5 93t42.5 142zm256 0q0 153-85 282.5t-225 188.5q-13 5-25 5-27 0-46-19t-19-45q0-39 39-59 56-29 76-44 74-54 115.5-135.5t41.5-173.5-41.5-173.5-115.5-135.5q-20-15-76-44-39-20-39-59 0-26 19-45t45-19q13 0 26 5 140 59 225 188.5t85 282.5zm256 0q0 230-127 422.5t-338 283.5q-13 5-26 5-26 0-45-19t-19-45q0-36 39-59 7-4 22.5-10.5t22.5-10.5q46-25 82-51 123-91 192-227t69-289-69-289-192-227q-36-26-82-51-7-4-22.5-10.5t-22.5-10.5q-39-23-39-59 0-26 19-45t45-19q13 0 26 5 211 91 338 283.5t127 422.5z"/></svg>`;
const volumeDownSvg = `<svg width="` + svgWidth + `" height="` + svgHeight + `" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1088 352v1088q0 26-19 45t-45 19-45-19l-333-333h-262q-26 0-45-19t-19-45v-384q0-26 19-45t45-19h262l333-333q19-19 45-19t45 19 19 45zm384 544q0 76-42.5 141.5t-112.5 93.5q-10 5-25 5-26 0-45-18.5t-19-45.5q0-21 12-35.5t29-25 34-23 29-36 12-56.5-12-56.5-29-36-34-23-29-25-12-35.5q0-27 19-45.5t45-18.5q15 0 25 5 70 27 112.5 93t42.5 142z"/></svg>`;
const expandSvg = `<svg width="` + svgWidth + `" height="` + svgHeight + `" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M883 1056q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23zm781-864v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45z"/></svg>`;


const videos = new Map();
videos.set(0, "Dr. Paul Mason - -Are you smarter than a Doctor What your doctor doesn-t know about nutrition-");
videos.set(1, "Prof. Tim Noakes - -The Cholesterol Hypothesis 10 Key Ideas that the Diet Dictators Have Hidden...-");
videos.set(2, "Dr. Paul Mason - 'Treating and preventing dementia - how diet can work when drugs fail'");
videos.set(3, "Minding your mitochondria Dr. Terry Wahls TEDxIowaCity");
videos.set(4, "Treat cancer with Diet Professor Thomas Seyfried makes a compelling case");
videos.set(5, "How low carbohydrate diets can help you avoid surgery for arthritis");
videos.set(6, "Dr. Paul Mason - -Saturated fat is not dangerous-");
const configs = new Map();

class Video extends LitElement {


    static get styles() {
        return css`
        .container {
            display: flex; 
            flex-direction: column;
            align-items: center;
        }  

        button{
            background: var(--primary);
            color: var(--secundary);
            font-size:var(--font-size-video-button);
        }

        .video-container {
            display: flex;
            flex-direction: column;
            background-color:  lightgrey;
            width: 100%;
        }

        .video-bottom-section {
            display: flex;
            flex-direction: column;
            margin: 1rem;
        }

        .video-bottom-section>.button-box {
            display: flex;
            width: 100%;
        }

        .btnbox-item {
            margin-left: 1.2rem;
            font-size: 1.6rem;
        }

        .volume-span {
            display: flex;
            background-color:  grey;
            white-space: pre;
            align-items: center;
        }

        .opaque-button {
            border: none;
            background-color: transparent;
            outline: none;
        }

        .video-container>.video-bottom-section>.button-box>.close-button {
            margin-left: auto;
            font-size: 2rem;
        }

        .video-container>.video-bottom-section>.video-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-left: 1.2rem;
            margin-top: .5rem;
            text-decoration: none;
            color: black;
        }

        .video-container>video {
            width: 100%;
        }

        .video-container>video::-webkit-media-controls {
            display: none;
        }   
        
        .length{
            margin-left: 0.2em;
            margin-left: 1em;
            padding: 0.6em 0;
            white-space: nowrap;
 
        }
        `;
    }

    constructor() {
        super();
        this.videoData = null;
        this.title = "dummy title";
    }


    static get properties() {
        return {
            videoData: Object,
            title: String
        };
    }

    render() {
        return html`<button @click=${e => { this.createVideo(e) }}>Show Video</button>`;
    }

    createVideo(e) {

        const videoDialog = getStaticVideo(this.videoData.id);
        if (videoDialog.parentNode) {
            videoDialog.remove();
        }

        const button = e.target;

        button.parentNode.appendChild(videoDialog);
        videoDialog.showModal();
        const start = getSeconds(this.videoData.start);
        const end = getSeconds(this.videoData.end);
        const config = configs.get(this.videoData.id);
        config.video.currentTime = start;
        config.data.current = start;
        config.data.start = start;
        config.data.end = end;
        config.data.titleEl.innerText = this.title;
        config.video.play();
        return videoDialog;

        function getMp4(videoId) {
            return videos.get(videoId);
        }

        function getStaticVideo(videoId) {

            if (configs.has(videoId)) {
                return configs.get(videoId).videoDialog;
            }
            const videoDialog = document.createElement("dialog");
            const videoDialogForm = videoDialog.appendChild(document.createElement("form"));
            videoDialogForm.method = "dialog";

            const videoContainer = videoDialogForm.appendChild(document.createElement("div"));
            videoContainer.classList.add("video-container")
            const menu = videoDialogForm.appendChild(document.createElement('menu'));
        
            const config = { data: {} };
            config.videoDialog = videoDialog;

            const video = videoContainer.appendChild(document.createElement("video"));
            config.video = video;

            const bottomSection = videoContainer.appendChild(document.createElement("div"));
            bottomSection.classList.add("video-bottom-section")
            const btnBox = bottomSection.appendChild(document.createElement("div"));
            btnBox.classList.add("button-box");
            const titleEl = bottomSection.appendChild(document.createElement("label"));
            titleEl.classList.add("video-title");
            config.data.titleEl = titleEl;

            const source = config.video.appendChild(document.createElement("source"));
            source.src = "../videos/" + getMp4(videoId) + ".mp4";
            source.type = "video/mp4";
            let promise = config.video.play();
            if (promise !== undefined) {
                promise.then(_ => {
                    console.log("Autoplay started!");
                    playButton.innerHTML = pauseSvg;

                }).catch(error => {
                    console.log("Autoplay was prevented!");
                });
            }

            const playButton = btnBox.appendChild(document.createElement("a"));
            playButton.classList.add('btnbox-item', 'opaque-button')
            playButton.innerHTML = playSvg;

            const seekBar = btnBox.appendChild(document.createElement("input"));
            seekBar.classList.add('btnbox-item')
            seekBar.type = "range"
            seekBar.value = "0";

            const lengthEl = btnBox.appendChild(document.createElement("label"));
            lengthEl.classList.add('btnbox-item','length');

            const volume_span = btnBox.appendChild(document.createElement("span"));
            volume_span.classList.add('volume-span', 'btnbox-item')
            const volume_low = volume_span.appendChild(document.createElement("i"));
            volume_low.innerHTML = volumeDownSvg;

            const volumeBar = volume_span.appendChild(document.createElement("input"));
            volumeBar.type = "range"
            volumeBar.min = 0;
            volumeBar.max = 1;
            volumeBar.step = 0.1;
            volumeBar.value = 0.5;
            const volume_high = volume_span.appendChild(document.createElement("i"));
            volume_high.innerHTML = volumeOnSvg;

            const fullScreenButton = btnBox.appendChild(document.createElement("a"));
            fullScreenButton.classList.add('opaque-button', 'btnbox-item');
            fullScreenButton.innerHTML = expandSvg;

            const muteButton = btnBox.appendChild(document.createElement("a"));
            muteButton.classList.add('opaque-button', 'btnbox-item');
            muteButton.innerHTML = volumeOffSvg;

            const closeButton = btnBox.appendChild(document.createElement("button"));
            closeButton.classList.add('opaque-button', 'btnbox-item', 'close-button');
            closeButton.innerHTML = closeSvg;

            closeButton.addEventListener("click", () => {
                video.pause();
            });

            video.addEventListener('loadedmetadata', (event) => {
                video.addEventListener("timeupdate", (event) => {
                    const length = (config.data.end - config.data.start);
                    lengthEl.innerText = showProgress(video.currentTime  - config.data.start,length);
                    const value = (100 / (length)) * (video.currentTime - config.data.start);
                    seekBar.value = value;
                    if (video.currentTime >= config.end) {
                        video.pause();
                    }
                    event.stopPropagation();
                });

                playButton.addEventListener("click", () => {
                    if (video.paused == true) {
                        video.play();
                        playButton.innerHTML = pauseSvg;
                    } else {
                        video.pause();
                        playButton.innerHTML = playSvg;
                    }
                });

                seekBar.addEventListener("change", () => {
                    const time = (config.data.end - config.data.start) * (seekBar.value / 100);
                    video.currentTime = (time + config.data.start);
                });
                seekBar.addEventListener("mousedown", () => {
                    video.pause();
                });

                seekBar.addEventListener("mouseup", () => {
                    video.play();
                });

                muteButton.addEventListener("click", () => {
                    if (video.muted == false) {
                        muteButton.innerHTML = volumeOnSvg;
                    } else {
                        muteButton.innerHTML = volumeOffSvg;
                    }
                    video.muted = !video.muted;
                });
                volumeBar.addEventListener("change", () => {
                    video.volume = volumeBar.value;
                });
                fullScreenButton.addEventListener("click", () => {
                    if (video.requestFullscreen) {
                        video.requestFullscreen();
                    } else if (video.mozRequestFullScreen) {
                        video.mozRequestFullScreen(); // Firefox
                    } else if (video.webkitRequestFullscreen) {
                        video.webkitRequestFullscreen(); // Chrome and Safari
                    }
                });
            });

            configs.set(videoId, config);
            return config.videoDialog;
        }

        function showProgress(t, seconds) {
            return showTime(t)+" / "+showTime(seconds);
        }

        function showTime(seconds) {
            seconds=Math.round(seconds)
            let result = "";
           const hours = Math.floor(seconds / 3600);
            if (hours > 1) {
                 result = hours + ":";
            }

            seconds = seconds - (hours * 3600);
            const minutes = Math.floor(seconds / 60);
            if (minutes > 0 || hours > 0) {
               let tmp = minutes;
                if (minutes < 10 && result != "")
                    tmp = "0" + tmp;
                result += tmp + ":";
            }else
            if (minutes==0){
                result="0:"
            }

            seconds = seconds - (minutes * 60);
            let tmp = seconds;
            if (seconds < 10 )
                tmp = "0" + seconds;
            return result + tmp;
        }

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

customElements.define("my-video", Video);
