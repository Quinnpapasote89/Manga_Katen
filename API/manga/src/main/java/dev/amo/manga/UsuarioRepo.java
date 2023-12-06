package dev.amo.manga;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepo extends MongoRepository<Usuarios, ObjectId> {

    Usuarios findByUsername(String username);
}
