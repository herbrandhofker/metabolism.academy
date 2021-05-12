
import { ChatContainer } from './chat-container.mjs';
import { getTheOthers } from './the-others.mjs';

const URL = "wss://ws.metabolism.academy"

export const registrations = new Map();
let ws = undefined;
let stream = undefined;

export function createSocket(detail, role) {
    ws = new WebSocket(URL);
    ws.onopen = () => {
        const json = { type: "login" };
        json.payload = JSON.parse(detail);
        json.payload.role = role;
        getTheOthers().me.profile = json.payload;
        console.log("send")
        ws.send(JSON.stringify(json));
        const json2 = { type: "registrations" };
        ws.send(JSON.stringify(json2));

        //      console.log("onopen")
        //     const rec = { "type": "registerMe", "payload": { "user": getTheOthers().me } }
        //    ws.send(JSON.stringify(rec))

    };

    ws.onmessage = (event) => {
        let rec = undefined;
        try {
            rec = JSON.parse(event.data);
        }
        catch (e) {
            console.error(event.data + " " + e); return;
        }

        const type = rec.type;
        const payload = rec.payload;
        console.log("received : " + type)

        switch (type) {
            case "registrations": {
                const regs = payload.registrations;
                for (let reg of regs) {
                    registrations.set(reg.email, reg);
                }
                break;
            }
            case "login": {
                console.log("logged in " + payload.name)
                break;
            }
            case "registerConfirmation":
                registerConfirmation(msg.payload);
                return;
            case "existingUsers":
                existingUsers(msg.payload);
                return;
            case "joinedRoom":
                joinedRoom(msg.payload);
                return;
            case "leaveRoom":
                leaveRoom(msg.payload);
                return;
            case "offer":
                offer(msg.payload);
                return;
            case "answer":
                answer(msg.payload);
                return;
            case "ice-candidate":
                iceCandidate(msg.payload)
                return;
            case "chatMessage":
                chatMessage(msg.payload)
                return;
            case "requestOneOnOne":
                OneOnOne(msg.payload)
                return;
            default:
                console.error("unknown msg type: " + msg.type);
        }
    }

    function createWebSocket(path) {
        let protocolPrefix = (window.location.protocol === 'https:') ? 'wss:' : 'ws:';
        protocolPrefix = "ws:" //tijdelijk
        const url = protocolPrefix + "//" + window.location.hostname + ":" + process.env.PORT
        return new WebSocket(url);
    }

    function registerConfirmation(payload) {
        const me = payload;
        getTheOthers().updateMe({ "userId": me.userId });

    }

    function existingUsers(payload) {
        payload.forEach(_theOther => {
            enRichTheOther(_theOther)
            stream.getTracks().forEach(track => _theOther.rtpSender = _theOther.peer.addTrack(track, stream));
            getTheOthers().set(_theOther.userId, _theOther)
        })
        getTheOthers().updateMe({ "initialized": true });
    }

    function joinedRoom(payload) {
        const _theOther = payload;
        enRichTheOther(_theOther)
        getTheOthers().set(_theOther.userId, _theOther)
    };

    function leaveRoom(payload) {
        getTheOthers().delete(payload.userId)
    }

    function offer(incoming) {
        const _theOther = getTheOthers().get(incoming.caller)
        const desc = new RTCSessionDescription(incoming.sdp);
        _theOther.peer.setRemoteDescription(desc).then(() => {
            stream.getTracks().forEach(track => _theOther.rtpSender = _theOther.peer.addTrack(track, stream));

        }).then(() => {
            return _theOther.peer.createAnswer();
        }).then(answer => {
            return _theOther.peer.setLocalDescription(answer);
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: getTheOthers().me.userId,
                sdp: _theOther.peer.localDescription
            }
            const rec = { "type": "answer", "payload": payload }
            ws.send(JSON.stringify(rec));
        })
    }

    function iceCandidate(incoming) {
        const _theOther = getTheOthers().get(incoming.me)
        const candidate = new RTCIceCandidate(incoming.candidate);
        _theOther.peer.addIceCandidate(candidate)
            .catch(e => console.error(e));
    }

    function answer(incoming) {
        const _theOther = getTheOthers().get(incoming.caller)
        const desc = new RTCSessionDescription(incoming.sdp);
        _theOther.peer.setRemoteDescription(desc).catch(e => console.error(e));

    }

    function enRichTheOther(theOther) {
        theOther.peer = createPeer();

        function createPeer() { //port 3478?
            const rtcPeer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: "stun:stun.stunprotocol.org"
                    },
                    {
                        urls: 'turn:80.100.18.195',
                        credential: 'kafkapass',
                        username: 'guest'
                    },
                ]
            });

            rtcPeer.onicecandidate = handleICECandidateEvent;
            rtcPeer.ontrack = handleTrackEvent;
            rtcPeer.onnegotiationneeded = () => handleNegotiationNeededEvent();
            return rtcPeer;

            function handleNegotiationNeededEvent() {
                rtcPeer.createOffer().then(offer => {
                    return rtcPeer.setLocalDescription(offer);
                }).then(() => {
                    const payload = {
                        target: theOther.userId,
                        caller: getTheOthers().me.userId,
                        sdp: rtcPeer.localDescription
                    };
                    const rec = { "type": "offer", "payload": payload }
                    ws.send(JSON.stringify(rec));
                }).catch(e => console.error(e));
            }

            function handleICECandidateEvent(e) {
                if (e.candidate) {
                    const payload = {
                        me: getTheOthers().me.userId,
                        target: theOther.userId,
                        candidate: e.candidate,
                    }
                    const rec = { "type": "ice-candidate", "payload": payload }
                    ws.send(JSON.stringify(rec));
                }
            }

            function handleTrackEvent(e) {
                theOther.video.srcObject = e.streams[0];
                //autoplay is on
            }
        }
    }

    function chatMessage(payload) {
        ChatContainer.processChatOutput(payload.senderId, payload.sender, payload.receiverId, payload.message)
    }

    function OneOnOne(payload) {
        getTheOthers().actionOnOneOnOne(payload)
    }
}



export function procesCommunication(p_stream) {
    if (ws == null) {
        console.error(" ws null??");
        return;
    }
    if (p_stream == null) {
        console.error("stream  null??");
        return;
    }
    stream = p_stream;

}

export function getWebSocket() {
    return ws;
}

