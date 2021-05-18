package academy.kafka;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

public class JsonPerson {

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
}
