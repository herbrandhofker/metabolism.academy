package academy.kafka;

import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Serializer;

public class JsonSerializer<T> implements Serializer<T> {
    final static public String JSON_CLASS = "JsonClass";

    final static private ObjectMapper objectMapper = new ObjectMapper();
    static {
        objectMapper.registerModule(new JavaTimeModule());
    }
    private Class<?> clazz;
    // private Boolean isKey;

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        // this.isKey = isKey;
        this.clazz = (Class<?>) configs.get(JSON_CLASS);
    }

    @Override
    public byte[] serialize(String topic, T object) {
        if (object == null) {
            return null;
        }
        if (this.clazz == null) {
            throw new SerializationException("deserializing error: configuration expects that JSONClass is set");
        }
        try {
            String jsonString = objectMapper.writeValueAsString(object);
            return jsonString.getBytes();
        } catch (Exception e) {
            throw new SerializationException("Error when serializing object ");
        }
    }
}
