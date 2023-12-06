package dev.amo.manga;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepo reviewRepo;
    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createReview(String reviewBody, String imdbId, String usuario){
        Review review = reviewRepo.insert(new Review(reviewBody,usuario));

        mongoTemplate.update(Manga.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("reviewIds").value(review))
                .first();

        return review;
    }
    public Review updateReview(String reviewId, String updatedReviewBody) {
        // Primero, obtenemos la revisión existente
        Review review = reviewRepo.findById(reviewId).orElseThrow(() -> new RuntimeException("Review not found"));
        // Actualizamos el cuerpo de la revisión
        review.setBody(updatedReviewBody);
        // Guardamos la revisión actualizada en la base de datos
        review = reviewRepo.save(review);

        return review;
    }

    public void deleteReview(String reviewId) {
        // Primero, obtenemos la revisión existente
        Review review = reviewRepo.findById(reviewId).orElseThrow(() -> new RuntimeException("Review not found"));

        // Eliminamos la revisión de la base de datos
        reviewRepo.delete(review);

        // También necesitamos eliminar la referencia de la revisión en la clase Manga
        mongoTemplate.update(Manga.class)
                .matching(Criteria.where("reviewIds").is(review))
                .apply(new Update().pull("reviewIds", review))
                .first();
    }


}
