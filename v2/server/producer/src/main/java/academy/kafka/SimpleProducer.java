package academy.kafka;

import java.util.Properties;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.Callback;
import org.apache.kafka.clients.producer.KafkaProducer;

import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import academy.kafka.utils.AppConfig;
import academy.kafka.utils.KafkaUtils;

public final class SimpleProducer {  
 
    static final Logger logger = LoggerFactory.getLogger(SimpleProducer.class);
    static final public String topic="test";
      public static void main(String[] args) {
       
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,AppConfig.BootstrapServers);
        props.put(ProducerConfig.ACKS_CONFIG, "all");
        props.put(ProducerConfig.DELIVERY_TIMEOUT_MS_CONFIG, 2000);
        props.put(ProducerConfig.REQUEST_TIMEOUT_MS_CONFIG, 2000);
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, org.apache.kafka.common.serialization.StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, org.apache.kafka.common.serialization.StringSerializer.class);
       
        Producer<String, String> producer = new KafkaProducer<>(props);
        System.out.println("kafka server "+AppConfig.BootstrapServers);
        KafkaUtils.createTopic(topic, 1, 1);
        for (int i = 0; i < 100; i++){
            ProducerRecord<String,String> rec=new ProducerRecord<String, String>(topic, Integer.toString(i), Integer.toString(i));
            producer.send(rec,new Callback() {
                public void onCompletion(RecordMetadata metadata, Exception e) {
                    if(e != null){System.out.println("error "+e.getMessage());}
                    else System.out.println("The offset of the record we just sent is: " + metadata.offset());
                
            }});
          // System.out.printf("produced to topic %s %d\n",topic,i);
        }
        producer.close();
        
    } 
}
