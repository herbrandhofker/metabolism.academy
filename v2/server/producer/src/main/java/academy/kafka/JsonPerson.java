package academy.kafka;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JsonPerson {

    final static private ObjectMapper objectMapper = new ObjectMapper();
    @JsonProperty(required = true)
    private String email;
    @JsonProperty(required = true)
    private String name;

    private String extra;

    public JsonPerson() {
    }

    public JsonPerson(String email, String name, String extra) {
        this.email = email;
        this.name = name;
        this.extra = extra;
    }

    @Override
    public String toString() {
        return "Person, email=" + email + ", name=" + name + ", extra="
                + extra + "]";
    }

    JsonNode getJsonNode() {
        try {
            String jsonStr = objectMapper.writeValueAsString(this);
            return objectMapper.readTree(jsonStr);
        } catch (Exception ex) {
            Logger.getLogger(JsonPerson.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
}
