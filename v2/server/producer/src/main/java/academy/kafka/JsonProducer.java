package academy.kafka;

import academy.kafka.JsonSerializer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Properties;
import org.apache.kafka.clients.producer.Callback;

import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.KafkaProducer;

import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.serialization.StringSerializer;

public final class JsonProducer {
    
    final static private ObjectMapper objectMapper = new ObjectMapper();
   
    public static void main(final String[] args) throws JsonProcessingException {
        
        Properties props = new Properties();
        props.put("JsonClass", JsonPerson.class);
        props = ProducerConfig.addSerializerToConfig(props, new StringSerializer(), new JsonSerializer());
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        final JsonPerson person = new JsonPerson("a@bcom", "Pietje", "Pukextrea");

        final Producer<String, JsonNode> producer = new KafkaProducer<>(props);

         for (int i = 0; i < 100; i++) {
             final ProducerRecord<String, JsonNode> rec = new ProducerRecord<String, JsonNode>("json_person",
                    Integer.toString(i), person.getJsonNode());
            producer.send(rec,new Callback() {
                public void onCompletion(RecordMetadata metadata, Exception e) {
                    if(e != null){System.out.println("error "+e.getMessage());}
                    else System.out.println("The offset of the record we just sent is: " + metadata.offset());
                
            }});
        //    System.out.println("produced " + i + "  " + rec.toString());
        }

        producer.close();
    }

}
