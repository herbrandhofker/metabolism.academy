package academy.kafka;

import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Deserializer;

import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class JsonDeserializer<T> implements Deserializer<T> {
    final static public String JSON_CLASS="JsonClass";
  
    private static ObjectMapper objectMapper = new ObjectMapper();
    // private Boolean isKey;
    static{
        objectMapper.registerModule(new JavaTimeModule());       
    }
    private Class<?> clazz;

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        this.clazz = (Class<?>) configs.get(JSON_CLASS);
     }

    @Override
    public T deserialize(String topic, byte[] data) {
        if (data == null) {
            return null;
        }
        if (this.clazz == null) {
            throw new SerializationException("deserializing error: configuration expects that JsonClass is set");
        }
        try {
           return (T) objectMapper.readValue(data, clazz);
       } catch (Exception e) {
            throw new SerializationException("Error when deserializing byte[] to class " + clazz.getName());
        }

    }
}
