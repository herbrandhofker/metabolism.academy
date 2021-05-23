import WebSocketServer from 'ws';
import kafka from 'kafka-node';
const port = 3010;

const connections = new Map();

const mapOfRooms = new Map();
const socketRoom = new Map();
const sockets = new Map();

const client = new kafka.KafkaClient({ kafkaHost: '192.168.178.80:9092' });
const producer = new kafka.HighLevelProducer(client);
const consumer = new kafka.Consumer(client, [{ topic: 'login' }, { topic: 'test' }]);

producer.on('error', function (err) {
    console.error("kafka error:", err);
})


producer.on('ready', function () {

    console.log("kafka producer on");
    const wsServer = new WebSocketServer.Server({ port: port });
    wsServer.getUniqueID = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    };


    wsServer.on('connection', (ws) => {
        ws.id = wsServer.getUniqueID();
        sockets.set(ws.id, ws);
        console.log("connection with client:" + ws.id)
        ws.on('message', data => {
            let msg = "";
            try { msg = JSON.parse(data); }
            catch (err) { console.error(err + " with data:" + data); return; }
            const msgType = msg.type;
            const payload = msg.payload;
            producer.send([{ topic: msgType, messages: new kafka.KeyedMessage(msgType, payload) }], (err, data) => { console.log(data); });

            switch (msgType) {

                case 'registrations': {

                    const rec = { type: "registrations" };
                    const arr = [];

                    for (let value of connections.values()) {
                        arr.push(value)
                    }
                    rec.payload = arr;

                    ws.send(JSON.stringify(rec));
                    break;
                }
                case "login":
                    console.error("register me not active")
                    login(payload);
                    //   producer.send([{ topic: msgType, messages: new kafka.KeyedMessage(payload.email, JSON.stringify(msg)) }], (err, data) => { console.log(data); });

                    break;
                case "registerMe":
                    registerMe(payload);
                    //   producer.send([{ topic: msgType, messages: new kafka.KeyedMessage(payload.email, JSON.stringify(msg)) }], (err, data) => { console.log(data); });

                    break;
                case "chatMessage":
                    chatMessage(payload);
                    break;
                case "offer":
                    offer(payload);
                    break;
                case "ice-candidate":
                    iceCandidate(payload);
                    break;
                case "answer":
                    answer(payload);
                    break;
                case "requestOneOnOne":
                    requestOneOnOne(payload);
                    break;

                default: console.error("unknown type: " + msgType);
            }
        });

        ws.on('close', () => {
            console.log("close");
            connections.delete(ws.id);
            const roomId = socketRoom.get(ws.id);
            const rec = { "type": "leaveRoom", "payload": { "userId": ws.id } }
            wsServer.clients.forEach(client => {
                if (client.readyState === WebSocketServer.OPEN) {
                    client.send(JSON.stringify(rec));
                }
            })
            let myRoomUsers = [];
            let myRoomSockets = [];
            let myRoom = mapOfRooms.get(roomId);
            if (myRoom) {
                myRoomUsers = myRoom.userInfoArray;
                myRoomSockets = myRoom.socketArray;
                myRoomSockets = myRoomSockets.filter(id => id !== ws.id);
                myRoomUsers = myRoomUsers.filter(info => info.userId !== ws.id);
                myRoom.userInfoArray = myRoomUsers;
                myRoom.socketArray = myRoomSockets
                mapOfRooms.set(roomId, myRoom);
            }
            sockets.delete(ws.id);
            socketRoom.delete(ws.id)
        });

        function offer(payload) {
            const rec = { "type": "offer", "payload": payload }
            sockets.get(payload.target).send(JSON.stringify(rec));
        }

        function iceCandidate(payload) {
            const rec = { "type": "ice-candidate", "payload": payload }
            sockets.get(payload.target).send(JSON.stringify(rec));
        }

        function answer(payload) {
            const rec = { "type": "answer", "payload": payload }
            sockets.get(payload.target).send(JSON.stringify(rec));
        }

        function requestOneOnOne(payload) {
            wsServer.clients.forEach(client => {
                if (client.readyState === WebSocketServer.OPEN) {
                    client.send(JSON.stringify(payload));
                }
            })
        }

        function chatMessage(payload) {
            const senderId = payload.senderId;
            const receiverId = payload.receiverId;
            const roomId = socketRoom.get(ws.id);
            const myRoom = mapOfRooms.get(roomId);
            const rec = { "type": "chatMessage", "payload": payload };
            const msg = JSON.stringify(rec);
            if (receiverId == undefined) {
                for (const usr of myRoom.socketArray) {
                    sockets.get(usr).send(msg);
                }
            }
            else {
                sockets.get(senderId).send(msg);
                sockets.get(receiverId).send(msg);
            }
        }

        function login(_payload) {
            console.log("login")
            _payload.userId = ws.id;
            _payload.timestamp = new Date();
            const recConfirmation = { "type": "loginConfirmation", "payload": _payload }
            ws.send(JSON.stringify(recConfirmation));

        }

        function registerMe(_payload) {
            console.log("registerme")
             const recConfirmation = { "type": "registerConfirmation", "payload": _payload }
            ws.send(JSON.stringify(recConfirmation));

            const roomId = _payload.room

            let myRoomUsers = [];
            let myRoomSockets = [];
            let myRoom = mapOfRooms.get(roomId);
            if (!myRoom) {
                mapOfRooms.set(roomId, { socketArray: [], userInfoArray: [] });
                myRoom = mapOfRooms.get(roomId);
            } else {
                myRoomUsers = myRoom.userInfoArray;
                myRoomSockets = myRoom.socketArray;
                const rec = { "type": "existingUsers", "payload": myRoomUsers }
                const msg = JSON.stringify(rec);
                ws.send(msg)
            }

            myRoomUsers.push(_payload);
            myRoom.userInfoArray = myRoomUsers;
            myRoom.socketArray = myRoomSockets
            mapOfRooms.set(roomId, myRoom);
            const userRec = { "type": "joinedRoom", "payload": _payload }
            for (const usr of myRoomSockets) {//emit works here but send does not
                sockets.get(usr).send(JSON.stringify(userRec));//Todo remove to
            }
            myRoomSockets.push(ws.id);
            socketRoom.set(ws.id, roomId);
        }


    });
    consumer.on('message', message =>
        wsServer.clients.forEach(client => {
            //   console.log("from kafka",message);
            //    client.send(message.value);
        })
    )


    console.log(" ws listening on ws://localhost:" + port)

});
