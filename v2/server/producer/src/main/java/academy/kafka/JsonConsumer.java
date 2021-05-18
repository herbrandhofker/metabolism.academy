package academy.kafka;

import academy.kafka.JsonDeserializer;
import java.time.Duration;
import java.util.Collections;
import java.util.Properties;

import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;

public final class JsonConsumer{

    public static void main(String[] args) {
        Properties props = new Properties();
        props.put("JsonClass", JsonPerson.class);
        props=ConsumerConfig.addDeserializerToConfig(props, new StringDeserializer(), new JsonDeserializer<JsonPerson>());        
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "my_group");
        Consumer<String, JsonPerson> consumer = new KafkaConsumer<>(props);

        try {
            consumer.subscribe(Collections.singletonList("json_persons"));
            while (true) {
                final ConsumerRecords<String, JsonPerson> consumerRecords = consumer.poll(Duration.ofMillis(100));

                consumerRecords.forEach(record -> {
                    System.out.println("value"+record.value());
                    JsonPerson jsonPerson=(JsonPerson)record.value();
                //    System.out.printf("Consumer Record:(%s, %s, %s, %s)\n", record.key(),jsonPerson,
                  //          record.partition(), record.offset());
                });
                consumer.commitAsync();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        consumer.close();

    }
}
