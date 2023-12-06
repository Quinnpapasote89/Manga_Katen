import { useEffect, useRef, useState } from "react";
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container,Row,Col,Button,Modal} from 'react-bootstrap';
import ReviewForm from "../ReviewForm/ReviewForm";
import './Review.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import React from 'react'

const Review = ({getMangaData,manga,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const mangaId = params.mangaId;
    

        
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editedReviewText, setEditedReviewText] = useState("");
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reviewIdToDelete, setReviewIdToDelete] = useState(null);

    const isAuthenticated = username !== null;

    useEffect(() => {
        getMangaData(mangaId);
    },[])

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
        const username = localStorage.getItem('username'); // Obtener el usuario del localStorage

        try {
          const response = await api.post("api/v1/reviews", {
            reviewBody: rev.value,
            imdbId: mangaId,
            usuario: username, // Agregar el nombre de usuario al enviar la reseña
          });
    
          const updatedReviews = [...reviews, { body: rev.value, usuario: username }]; // Agregar el usuario a las reseñas
    
          rev.value = "";
          setReviews(updatedReviews);
          toast.success('Review publicada con exito!');
        } catch (err) {
          console.error(err);
          toast.success('Error para poder publicar la review');
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

      const handleDeleteConfirmation = async (reviewId) => {
        setReviewIdToDelete(reviewId);
        setShowDeleteModal(true);

      };
    
      const confirmDeleteReview = async () => {
        try {
          const response = await api.delete(`api/v1/reviews/${reviewIdToDelete}`);
          console.log(response);
    
          if (response.status === 204) {
            const updatedReviews = reviews.filter((r) => r.id !== reviewIdToDelete);
            setReviews(updatedReviews);
            setShowDeleteModal(false);
            toast.success('Review eliminada con exito');
          }
        } catch (err) {
          console.error(err);
        }
      };
    
    return (
      <Container>
          <Row style={{marginTop:'2em'}}>
              <Col><h3>Reviews</h3></Col>
          </Row>
          <Row className="mt-2 show-review">
              <Col>
                  <img src={manga?.poster} className="img-poster" alt="Manga Poster" />
              </Col>
              <Col>
                  {
                      <>  
                          <Row>
                              <Col><h1>Sinopsis</h1>
                              <p>{manga?.sinopsis}</p></Col>
                          </Row>
                          <Row>
                              <Col><h1>Fecha de estreno</h1>
                              <p>{manga?.releaseDate}</p></Col>
                          </Row>
                      </>
                  }
                  
              </Col>
          </Row>
          <Row style={{marginTop:'2em'}}>
            <Row>
              <Col>
              {isAuthenticated &&(
                  <ReviewForm handleSubmit={addReview} revText={revText} labelText="Escriba su review"/>
              )}
              </Col>
            </Row>
            <Row>
                <Col>
                    <hr/>
                </Col>
            </Row>
            {
            reviews?.map((r) => {
                            return(
                                <>
                <Row key={r.id} >
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
                        {username === r.usuario && ( // Mostrar botones solo si el nombre de usuario coincide
                          <>
                            <button onClick={() => handleEdit(r.id)} className="edit-button">
                              <FontAwesomeIcon icon={faEdit} /> Editar
                            </button>
                            <button onClick={() => handleDeleteConfirmation(r.id)} className="delete-button">
                              <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                            </button>
                          </>
                        )}
                        <p style={{marginTop:'1em'}}>{r.body}</p>
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
          </Row>
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar esta revisión?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDeleteReview}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    )
}

export default Review