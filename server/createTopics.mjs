import kafka  from 'kafka-node';


const client = new kafka.KafkaClient({ kafkaHost: '192.168.178.80:9092' });
var topicsToCreate = [{
    topic: 'login',
    partitions: 1,
    replicationFactor: 1
  },{
    topic: 'test',
    partitions: 1,
    replicationFactor: 1
  }];
  
  client.createTopics(topicsToCreate, (error, result) => {
   console.log(result);
  });