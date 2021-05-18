package academy.kafka;

import com.fasterxml.jackson.databind.JsonNode;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Deserializer;

import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class JsonDeserializer implements Deserializer<JsonNode> {
    
    private static ObjectMapper objectMapper = new ObjectMapper();
    // private Boolean isKey;
    static{
        objectMapper.registerModule(new JavaTimeModule());       
    }
  
    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
      }

    @Override
    public JsonNode deserialize(String topic, byte[] data) {
        if (data == null) {
            return null;
        }
       
        try {
           return  objectMapper.readTree(data);
       } catch (Exception e) {
            throw new SerializationException("Error when deserializing byte[] to JsonNode ");
        }

    }
}
