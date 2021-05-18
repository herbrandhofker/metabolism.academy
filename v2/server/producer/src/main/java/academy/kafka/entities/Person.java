package academy.kafka.entities;

import java.time.LocalDate;
import java.util.Date;
import java.util.Locale;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.javafaker.Faker;
import com.kjetland.jackson.jsonSchema.annotations.JsonSchemaDescription;
import com.kjetland.jackson.jsonSchema.annotations.JsonSchemaFormat;
import com.kjetland.jackson.jsonSchema.annotations.JsonSchemaInject;
import com.kjetland.jackson.jsonSchema.annotations.JsonSchemaOptions;
import com.kjetland.jackson.jsonSchema.annotations.JsonSchemaOptions.Item;
import com.kjetland.jackson.jsonSchema.annotations.JsonSchemaString;
import com.kjetland.jackson.jsonSchema.annotations.JsonSchemaTitle;

import org.rocksdb.RocksDB;
import org.rocksdb.RocksDBException;

import academy.kafka.utils.KafkaUtils;
import academy.kafka.utils.RocksDbUtils;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonSchemaInject(strings = { @JsonSchemaString(path = "$id", value = "academy.kafka.entity.Person") })
@JsonSchemaDescription(value = "A natural person or a company (NYI)")
@JsonSchemaTitle(value = "Persons")
public class Person extends Entity {

    private static final Faker faker = new Faker(new Locale("nl"));

    @JsonProperty(required = true)
    private String email;
    @JsonProperty(required = true)
    private String name;
   
    public Person() {
    }

   

    public String getKey() {
        return email;
    }

 


    /**************************************************************************************
     ************************** Utilities**************************************************
     *************************************************************************************/

    static public final String topicName = Person.class.getSimpleName(); 
 
    public static Person fromJson(String jsonStr) {
        try {
            return JACKSON_MAPPER.readValue(jsonStr, Person.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }


   
}
