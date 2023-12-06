package dev.amo.manga;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    private ObjectId id;

    private String usuario;

    private String body;

    

    public Review(String reviewBody,String usuario) {
        this.body = reviewBody;
        this.usuario = usuario;
    }
}
