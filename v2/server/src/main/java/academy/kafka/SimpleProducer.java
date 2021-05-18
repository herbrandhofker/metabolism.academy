package academy.kafka;

import java.util.Properties;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.KafkaProducer;

import org.apache.kafka.clients.producer.ProducerRecord;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public final class SimpleProducer {  
 
    static final Logger logger = LoggerFactory.getLogger(SimpleProducer.class);
    static final public String topic="test";
      public static void main(String[] args) {
       
    	KafkaUtils.getTopicNames();
      /*  Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("acks", "all");
        props.put("retries", 0);
        props.put("batch.size", 16384);
        props.put("linger.ms", 1);
        props.put("buffer.memory", 33554432);
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        Producer<String, String> producer = new KafkaProducer<>(props);
        System.out.println("starting");
        for (int i = 0; i < 100; i++){
            producer.send(new ProducerRecord<String, String>(topic, Integer.toString(i), Integer.toString(i)));
            System.out.printf("produced %d\n",i);
        }
        producer.close();
        */
        
    } 
}