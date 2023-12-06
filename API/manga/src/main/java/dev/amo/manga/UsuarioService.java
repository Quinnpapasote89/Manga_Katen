package dev.amo.manga;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepo usuarioRepo;
    @Autowired
    private MongoTemplate mongoTemplate;

    public Usuarios createUser(String username, String password){
        // Verificar si el nombre de usuario es "Root"
        if (username.equalsIgnoreCase("Root")) {
            throw new RuntimeException("El nombre de usuario 'Root' no está permitido.");
        }

        // Verificar si el nombre de usuario ya está en uso
        if (usuarioRepo.findByUsername(username) != null) {
            throw new RuntimeException("El nombre de usuario '" + username + "' ya está en uso.");
        }

        Usuarios usuario = new Usuarios(username, password);
        return usuarioRepo.save(usuario);
    }

    public Usuarios findByUsername(String username){
        return usuarioRepo.findByUsername(username);
    }



}
