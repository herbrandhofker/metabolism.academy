package academy.kafka;

import academy.kafka.JsonSerializer;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.Properties;

import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.KafkaProducer;

import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

public final class JsonProducer {
   
    public static void main(final String[] args) {
        Properties props = new Properties();
        props.put("JsonClass", JsonPerson.class);
        props = ProducerConfig.addSerializerToConfig(props, new StringSerializer(), new JsonSerializer<JsonPerson>());
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        final JsonPerson person = new JsonPerson("a@bcom", "Pietje", "Pukextrea");

        final Producer<String, JsonPerson> producer = new KafkaProducer<>(props);

         for (int i = 0; i < 100; i++) {
            final ProducerRecord<String, JsonPerson> rec = new ProducerRecord<String, JsonPerson>("json_persons",
                    Integer.toString(i), person);
            producer.send(rec);
            System.out.println("produced " + i + "  " + rec.toString());
        }

        producer.close();
    }

}
