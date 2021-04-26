import kafka from 'kafka-node';

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
var topicsToCreate = [{
    topic: 'test', 
    partitions: 1 ,
    replicationFactor: 1
  },{
    topic: 'login', 
    partitions: 1,
    replicationFactor: 1
  }];

client.createTopics(topicsToCreate, (error, result) => {
    if (error) console.log(error)
    else console.log(result)
});