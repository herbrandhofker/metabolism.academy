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
const configs = new Map();

/*
class Video extends LitElement {

    constructor(){
        super();
    }

    static get styles() {
        return css` ` ;
    }

    static get properties() {
        return { 
            parentId: String,
            videoData: Object,
            title: String
        };
      }

    render() {
        return doVideoButton(this.shadowRoot, parentId, videoData, title)
    }
}


customElements.define("my-video", Video);
*/



function doVideoButton(shadowRoot, parentId, videoData, title) {
    if (videoData == null)
        return null;
    return html`
    <button @click=${e => { showVideo(parentId, videoData, title) }}>Details</button>
   `

    function showVideo(parentId, videoData, title) {
        const parent = shadowRoot.getElementById(parentId);
        if (!parent) { console.error("parent of video with id " + parentId + " is null"); return; }
        createVideo(parent, videoData, title);


        function createVideo(parent, videoData, title) {
            const vc = getStaticVideo(videoData.id);
            if (vc.parentNode) {
                vc.remove();
            }
            parent.appendChild(vc);
            const start = getSeconds(videoData.start);
            const end = getSeconds(videoData.end);
            const config = configs.get(videoData.id);
            config.video.currentTime = start;
            config.data.current = start;
            config.data.start = start;
            config.data.end = end;
            config.data.titleEl.innerText = title;
            config.vc.style.display = "block";
            config.video.play();

            function getMp4(videoId) {
                return videos.get(videoId);
            }

            function getStaticVideo(videoId) {
                if (configs.has(videoId))
                    return configs.get(videoId).vc;

                const videoContainer = document.createElement("div");
                videoContainer.classList.add("video-container")
                const video = videoContainer.appendChild(document.createElement("video"));
                const config = { data: {} };
                config.vc = videoContainer;
                config.video = video;
                const bottomSection = videoContainer.appendChild(document.createElement("div"));
                bottomSection.classList.add("video-bottom-section")
                const btnBox = bottomSection.appendChild(document.createElement("div"));
                btnBox.classList.add("button-box");
                const titleEl = bottomSection.appendChild(document.createElement("label"));
                titleEl.classList.add("video-title");

                config.data.titleEl = titleEl;

                const source = config.video.appendChild(document.createElement("source"));
                console.log(videoId + " " + getMp4(videoId))
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

                config.video.addEventListener("timeupdate", (event) => {
                    config.data.current = config.video.currentTime;
                    if (config.video.currentTime >= config.data.end) {
                        config.video.pause();
                    }
                    event.stopPropagation();
                });

                const playButton = btnBox.appendChild(document.createElement("button"));
                playButton.classList.add('item', 'opaque-button')
                playButton.innerHTML = playSvg;

                const seekBar = btnBox.appendChild(document.createElement("input"));
                seekBar.classList.add('item')
                seekBar.type = "range"
                seekBar.value = "0";

                const volume_span = btnBox.appendChild(document.createElement("span"));
                volume_span.classList.add('volume-span', 'item')
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

                const fullScreenButton = btnBox.appendChild(document.createElement("button"));
                fullScreenButton.classList.add('opaque-button', 'item');
                fullScreenButton.innerHTML = expandSvg;

                const muteButton = btnBox.appendChild(document.createElement("button"));
                muteButton.classList.add('opaque-button', 'item');
                muteButton.innerHTML = volumeOffSvg;

                const closeButton = btnBox.appendChild(document.createElement("button"));
                closeButton.classList.add('opaque-button', 'item', 'close-button');
                closeButton.innerHTML = closeSvg;

                closeButton.addEventListener("click", () => {
                    console.log("close");
                    videoContainer.style.display = "none";
                    video.pause();

                });

                video.addEventListener('loadedmetadata', (event) => {
                    video.addEventListener("timeupdate", (event) => {
                        const value = (100 / (config.data.end - config.data.start)) * (video.currentTime - config.data.start);
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

                return config.vc;
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
}

export default doVideoButton