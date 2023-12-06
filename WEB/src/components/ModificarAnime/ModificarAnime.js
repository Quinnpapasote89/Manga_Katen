import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import { Button, Modal,Row,Col,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ModificarAnime.css';

const ModificarAnime = () => {
    const [mangas, setMangas] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedManga, setSelectedManga] = useState(null);
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const isRoot = username === "Root";

    useEffect(() => {
        if (!isRoot) {
            toast.error('No tienes autorización para ver esta opción');
        } else {
        api.get('http://localhost:8080/api/v1/mangas')
            .then(response => {
                setMangas(response.data);
            });
        }
    }, []);

    const handleDelete = () => {
        if (!isRoot) {
            toast.error('No tienes autorización para realizar esta acción');
            return;
        }
        api.delete(`api/v1/mangas/${selectedManga.imdbId}`)
            .then(response => {
                setMangas(mangas.filter(manga => manga.imdbId !== selectedManga.imdbId));
                toast.success('Manga borrado exitosamente');
                setModalShow(false);
            });
    };

    const handleShowModal = (manga) => {
        if (!isRoot) {
            toast.error('No tienes autorización para realizar esta acción');
            return;
        }
        setSelectedManga(manga);
        setModalShow(true);
    };

    if (!isRoot) {
        return <div>No tienes autorización para ver esta opción</div>;
    }

    return (
        <div>
            <Row>
                {mangas.map(manga => (
                    <Col sm={6} md={4} lg={3} key={manga.imdbId}>
                        <Card style={{ height: '100%' }}>
                            <Card.Img variant="top" src={manga.poster} style={{ height: '200px', objectFit: 'cover' }} />
                            <Card.Body >
                                <Card.Title>{manga.title}</Card.Title>
                                <div className='botones-card'>
                                    <Button variant="outline-danger" onClick={() => handleShowModal(manga)}>Borrar</Button>
                                    <Link to={`/editar-anime/${manga.imdbId}`}><Button variant="outline-primary">Editar</Button></Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar borrado</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que quieres borrar el Manga {selectedManga?.title}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Borrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModificarAnime;