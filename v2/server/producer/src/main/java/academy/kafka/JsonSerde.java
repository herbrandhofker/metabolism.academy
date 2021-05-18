package academy.kafka;

import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serializer;

public class JsonSerde<T> implements Serde<T> {
    final static public String JSON_CLASS="JsonClass";
    Serializer<T> serializer= new JsonSerializer<T>();
    Deserializer<T> deserializer= new JsonDeserializer<T>();

    @Override
    public Serializer<T> serializer() {
        return serializer;
    }

    @Override
    public Deserializer<T> deserializer() {
        return deserializer;
    }

    @Override
    public void configure(final java.util.Map<String, ?> serdeConfig, final boolean isSerdeForRecordKeys) {
      serializer.configure(serdeConfig, isSerdeForRecordKeys);
      deserializer.configure(serdeConfig, isSerdeForRecordKeys);
    }
}
