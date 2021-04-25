import kafka from 'kafka-node';
import path from 'path'
import fs from 'fs'
import https from 'https';
import WebSocketServer from 'ws';
import { } from 'dotenv/config.js'

const __dirname = path.resolve(path.dirname(''));

const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}

const server = https.createServer(options);
const wss = new WebSocketServer.Server({ server });

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.HighLevelProducer(client);
const consumer = new kafka.Consumer(client, [{ topic: 'login' }]);
producer.on('error', function (err) {
    console.error(err);
})

producer.on('ready', function () {
    wss.on('connection', (ws) => {

        ws.on('message', data => {
            const rec = JSON.parse(data);
            rec.payload.timestamp = new Date();
            console.log("sending " + JSON.stringify(rec))
            producer.send([{ topic: rec.type, messages: new kafka.KeyedMessage(rec.payload.email, JSON.stringify(rec)) }], (err, data) => { });
        });

        ws.on('close', () => {
         //   console.log("close")
        });
    });
});

consumer.on('message', function (message) {
    console.log("kafka received topic:" + message.topic);
    console.log("kafka received key:" + message.key);
    console.log("kafka received value:" + message.value);
    wss.clients.forEach(client => {
        client.send(message.value);
    });
})

server.listen(process.env.PORT, () => {
    const url = process.env.WS_URL;
    console.log(`listening on url ${url}`);
});
