package dev.amo.manga;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MangaService {
    @Autowired
    private MangaRepo mangaRepository;
    public List<Manga> allMangas(){
        return mangaRepository.findAll();

    }

    public Optional<Manga> singleManga(String imdbId){
        return mangaRepository.findMangaByImdbId(imdbId);
    }
}
