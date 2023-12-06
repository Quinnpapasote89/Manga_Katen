import { useEffect, useRef, useState } from "react";
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container,Row,Col} from 'react-bootstrap';
import ReviewForm from "../ReviewForm/ReviewForm";
import './Review.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import React from 'react'

const Review = ({getMangaData,manga,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const mangaId = params.mangaId;

        
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editedReviewText, setEditedReviewText] = useState("");

    useEffect(() => {
        getMangaData(mangaId);
    },[])

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;

        try{

            const response = await api.post("api/v1/reviews", {reviewBody: rev.value, imdbId:mangaId, usuario:'Adrian'});
            console.log(reviews);

            const updatedReviews = [...reviews,{body:rev.value}];

            rev.value = "";
            window.location.reload(); // Esto recargará la página

            setReviews(updatedReviews);
        }catch(err){
            console.error(err);
        }
    }

    const handleEdit = (reviewId) => {
        setEditingReviewId(reviewId);
        const reviewToEdit = reviews.find((r) => r.id === reviewId);
        setEditedReviewText(reviewToEdit.body);
      };
    
      const handleCancelEdit = () => {
        setEditingReviewId(null);
        setEditedReviewText("");
      };

      const handleSaveEdit = async (reviewId) => {
        try {
        console.log(reviewId);
          const response = await api.put(`api/v1/reviews/${reviewId}`, { reviewBody: editedReviewText });
          console.log(response);
    
          const updatedReviews = reviews.map((r) =>
            r.id === reviewId ? { ...r, body: editedReviewText } : r
          );
    
          setReviews(updatedReviews);
          setEditingReviewId(null);
          setEditedReviewText("");
        } catch (err) {
          console.log(reviewId);
          console.error(err);
        }
      };

      const handleDelete = async (reviewId) => {
        try {
            // Intentamos eliminar la revisión
            const response = await api.delete(`api/v1/reviews/${reviewId}`);
            console.log(response);
    
            // Si la revisión se eliminó correctamente, la eliminamos de las revisiones en el estado
            if (response.status === 204) {
                const updatedReviews = reviews.filter((r) => r.id !== reviewId);
                setReviews(updatedReviews);
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
      <Container>
          <Row>
              <Col><h3>Reviews</h3></Col>
          </Row>
          <Row className="mt-2">
              <Col>
                  <img src={manga?.poster} className="img-poster" alt="Manga Poster" />
              </Col>
              <Col>
                  {
                      <>  
                          <Row>
                              <Col><h1>Sinopsis</h1></Col>
                          </Row>
                          <Row>
                              <Col>
                                  <ReviewForm handleSubmit={addReview} revText={revText} labelText="Escriba su review"/>
                              </Col>
                          </Row>
                          <Row>
                              <Col>
                                  <hr/>
                              </Col>
                          </Row>
                      </>
                  }
                  {
                  reviews?.map((r) => {
                                  return(
                                      <>
                      <Row key={r.id}>
                        <Col>
                          {editingReviewId === r.id ? (
                            <div>
                              <textarea
                                value={editedReviewText}
                                onChange={(e) => setEditedReviewText(e.target.value)}
                                rows={4}
                                cols={50}
                              ></textarea>
                              <button onClick={() => handleSaveEdit(r.id)}>Guardar</button>
                              <button onClick={handleCancelEdit}>Cancelar</button>
                            </div>
                          ) : (
                            <>
                              <b>Usuario: {r.usuario}</b> <br />
                              <button onClick={() => handleEdit(r.id)} className="edit-button">
                                <FontAwesomeIcon icon={faEdit} /> Editar
                              </button>
                              <button onClick={() => handleDelete(r.id)} className="delete-button">
                                      <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                              </button>
                              <br />
                              {r.body}
                              <br/>
                              <hr/>

                              {/* ... (otros botones y elementos) */}
                            </>
                          )}
                        </Col>
                      </Row>
                                      </>
                                  )

                              })
                  }
              </Col>
          </Row>
          <Row>
                  <Col>
                      <hr />
                  </Col>
          </Row>
      </Container>
    )
}

export default Review