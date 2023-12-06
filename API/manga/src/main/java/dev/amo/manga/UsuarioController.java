package dev.amo.manga;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/usuarios")
@CrossOrigin(origins = "http://localhost:3456/")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuarios> createUser(@RequestBody Map<String, String> payload){
        return new ResponseEntity<Usuarios>(usuarioService.createUser(payload.get("username"), payload.get("password")), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Usuarios> loginUser(@RequestBody Map<String, String> payload){
        Usuarios usuario = usuarioService.findByUsername(payload.get("username"));
        if (usuario != null && usuario.getPassword().equals(payload.get("password"))) {
            return new ResponseEntity<Usuarios>(usuario, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
