import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Button, Form, Col,Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditManga = () => {
    const { imdbId } = useParams();
    const [anime, setAnime] = useState(null);
    const [newGenre, setNewGenre] = useState('');
    const [newBackdrop, setNewBackdrop] = useState('');

    useEffect(() => {
        api.get(`api/v1/mangas/${imdbId}`)
            .then(response => {
                setAnime(response.data);
            });
    }, [imdbId]);

    const handleChange = (event) => {
        setAnime({ ...anime, [event.target.name]: event.target.value });
    };

    const handleAddGenre = () => {
        setAnime({ ...anime, genres: [...anime.genres, newGenre] });
        setNewGenre('');
    };

    const handleAddBackdrop = () => {
        setAnime({ ...anime, backdrops: [...anime.backdrops, newBackdrop] });
        setNewBackdrop('');
    };

    const handleRemoveGenre = (index) => {
        const updatedGenres = anime.genres.filter((_, i) => i !== index);
        setAnime({ ...anime, genres: updatedGenres });
    };

    const handleRemoveBackdrop = (index) => {
        const updatedBackdrops = anime.backdrops.filter((_, i) => i !== index);
        setAnime({ ...anime, backdrops: updatedBackdrops });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const youtubeLinkRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=.{11})$/;

        if (!youtubeLinkRegex.test(anime.trailerLink)) {
          alert('El enlace del tráiler no cumple con el formato de YouTube válido.');
          return;
        }

        api.put(`api/v1/mangas/${imdbId}`, anime)
            .then(response => {
                // Handle success if needed
                toast.success('Se realizo la edición del anime de forma correcta!');
            })
            .catch(error => {
                // Handle error if needed
                toast.error('Error para poder modificar anime!');
            });
    };

    if (!anime) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ margin: '0 auto', maxWidth: '600px' }}>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label>Titulo</Form.Label>
                <Form.Control type="text" name="title" value={anime.title} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formReleaseDate">
                <Form.Label>Fecha de Lanzamiento</Form.Label>
                <Form.Control type="date" name="releaseDate" value={anime.releaseDate} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formTrailerLink">
                <Form.Label>Link del Trailer</Form.Label>
                <Form.Control type="text" name="trailerLink" value={anime.trailerLink} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formPoster">
                <Form.Label>Poster</Form.Label>
                <Form.Control type="text" name="poster" value={anime.poster} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formSinopsis">
                <Form.Label>Sinopsis</Form.Label>
                <Form.Control as="textarea" rows={4} name="sinopsis" value={anime.sinopsis} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formGenres">
                <Form.Label>Generos</Form.Label>
                <Row>
                    <Col>
                        <Form.Control type="text" value={newGenre} onChange={(e) => setNewGenre(e.target.value)} placeholder="Enter a genre" />
                    </Col>
                    <Col>
                        <Button variant="success" onClick={handleAddGenre}>Añadir Genero</Button>
                    </Col>
                </Row>
                {anime.genres.map((genre, index) => (
                    <div key={index}>
                        {genre}
                        <Button variant="danger" onClick={() => handleRemoveGenre(index)}>Remover</Button>
                    </div>
                ))}
            </Form.Group>

            <Form.Group controlId="formBackdrops">
                <Form.Label>Fondos</Form.Label>
                <Row>
                    <Col>
                        <Form.Control type="text" value={newBackdrop} onChange={(e) => setNewBackdrop(e.target.value)} placeholder="Enter a backdrop URL" />
                    </Col>
                    <Col>
                        <Button variant="success" onClick={handleAddBackdrop}>Añadir Fondo</Button>
                    </Col>
                </Row>
                {anime.backdrops.map((backdrop, index) => (
                    <div key={index}>
                        <img src={backdrop} alt={`Backdrop ${index}`} style={{ width: '150px', height: 'auto', marginRight: '10px' }} />
                        <Button variant="danger" onClick={() => handleRemoveBackdrop(index)}>Remover</Button>
                    </div>
                ))}
            </Form.Group>

            <Button variant="primary" type="submit">
                Editar
            </Button>
        </Form>
        </div>
    );
};

export default EditManga;
