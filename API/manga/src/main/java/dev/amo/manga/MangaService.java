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
    public Manga saveManga(Manga manga) {
        return mangaRepository.save(manga);
    }

    public Optional<Manga> singleManga(String imdbId){
        return mangaRepository.findMangaByImdbId(imdbId);
    }

    public Manga updateManga(String imdbId, Manga updatedManga) {
        Optional<Manga> manga = mangaRepository.findMangaByImdbId(imdbId);
        if (manga.isPresent()) {
            updatedManga.setId(manga.get().getId());
            return mangaRepository.save(updatedManga);
        } else {
            return null;
        }
    }

    public void deleteManga(String imdbId) {
        Optional<Manga> manga = mangaRepository.findMangaByImdbId(imdbId);
        manga.ifPresent(mangaRepository::delete);
    }
}
