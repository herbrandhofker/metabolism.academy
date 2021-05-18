package academy.kafka;

import com.fasterxml.jackson.databind.JsonNode;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serializer;

public class JsonSerde implements Serde<JsonNode> {
    Serializer<JsonNode> serializer= new JsonSerializer();
    Deserializer<JsonNode> deserializer= new JsonDeserializer();

    @Override
    public Serializer<JsonNode> serializer() {
        return serializer;
    }

    @Override
    public Deserializer<JsonNode> deserializer() {
        return deserializer;
    }

    @Override
    public void configure(final java.util.Map<String, ?> serdeConfig, final boolean isSerdeForRecordKeys) {
      serializer.configure(serdeConfig, isSerdeForRecordKeys);
      deserializer.configure(serdeConfig, isSerdeForRecordKeys);
    }
}
