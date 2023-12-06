package dev.amo.manga;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MangaRepo extends MongoRepository<Manga, ObjectId>{
    Optional<Manga> findMangaByImdbId(String imdbId);

}
