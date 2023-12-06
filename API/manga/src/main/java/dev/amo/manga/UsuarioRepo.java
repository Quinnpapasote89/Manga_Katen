package dev.amo.manga;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsuarioRepo extends MongoRepository<Usuarios, ObjectId> {
}
