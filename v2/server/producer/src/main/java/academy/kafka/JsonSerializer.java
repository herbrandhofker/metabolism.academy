package academy.kafka;

import com.fasterxml.jackson.databind.JsonNode;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Serializer;

public class JsonSerializer implements Serializer<JsonNode> {
  
    final static private ObjectMapper objectMapper = new ObjectMapper();
    static {
        objectMapper.registerModule(new JavaTimeModule());
    }
   
    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
     }

    @Override
    public byte[] serialize(String topic, JsonNode data) {
        if (data == null) {
            return null;
        }
       
        try {
           return objectMapper.writeValueAsBytes(data);
        } catch (Exception e) {
            throw new SerializationException("Error when serializing object ");
        }
    }
}
