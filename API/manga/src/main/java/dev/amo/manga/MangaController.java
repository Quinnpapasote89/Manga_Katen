package dev.amo.manga;

import org.apache.coyote.Response;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/mangas")
@CrossOrigin(origins = "http://localhost:3456/")
public class MangaController {
    @Autowired
    private MangaService mangaService;
    @GetMapping
    public ResponseEntity<List<Manga>> getAllMangas(){
        return new ResponseEntity<List<Manga>>(mangaService.allMangas(),HttpStatus.OK);

    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<Manga>> getSingleManga(@PathVariable String imdbId){
        return new ResponseEntity<Optional<Manga>>(mangaService.singleManga(imdbId),HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<Manga> createManga(@RequestBody Manga manga) {
        return new ResponseEntity<Manga>(mangaService.saveManga(manga), HttpStatus.CREATED);
    }

    @PutMapping("/{imdbId}")
    public ResponseEntity<Manga> updateManga(@PathVariable String imdbId, @RequestBody Manga updatedManga) {
        Manga manga = mangaService.updateManga(imdbId, updatedManga);
        if (manga != null) {
            return new ResponseEntity<Manga>(manga, HttpStatus.OK);
        } else {
            return new ResponseEntity<Manga>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{imdbId}")
    public ResponseEntity<Void> deleteManga(@PathVariable String imdbId) {
        mangaService.deleteManga(imdbId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }


}
