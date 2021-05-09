import WebSocketServer from 'ws';
import kafka from 'kafka-node';
const port = 3000;

const connections = new Map();
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

        console.log("connection with client:" + ws.id)
        ws.on('message', data => {
            console.log("message from client received")
            const rec = JSON.parse(data);
            switch (rec.type) {
                case 'login': {
                    connections.set(ws.id, rec.payload)
                    rec.payload.timestamp = new Date();
                    ws.send(JSON.stringify(rec));
                    producer.send([{ topic: rec.type, messages: new kafka.KeyedMessage(rec.payload.email, JSON.stringify(rec)) }], (err, data) => { console.log(data); });


                    break;
                }
                case 'registrations': {
                    
                    const rec={type: "registrations"};
                    const arr=[];

                    for (let value of connections.values()) {
                        arr.push(value)
                      }
                    rec.payload={registrations: arr}
                    ws.send(JSON.stringify(rec));                 
                    break;
                }
                default: console.error("unknown type: " + rec.type);
            }
        }); 

        ws.on('close', () => {
            console.log("close");
            connections.delete(ws.id);
        });
    });
    consumer.on('message', function (message) {
        wsServer.clients.forEach(client => {
            client.send(message.value);
        });
    })



    console.log(" ws listening on ws://localhost:" + port)

});
