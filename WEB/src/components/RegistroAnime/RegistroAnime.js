import React, { useEffect, useState } from 'react';
import { Form, Button,Col } from 'react-bootstrap';
import './RegistroAnime.css';


const RegistrarAnime = () => {
  const [mangaData, setMangaData] = useState({
    imdbId: '',
    title: '',
    releaseDate: '',
    trailerLink: '',
    genres: [],
    poster: '',
    backdrops: [],
    reviewIds: [],
  });

  const [newGenre, setNewGenre] = useState('');
  const [newBackdrop, setNewBackdrop] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMangaData({ ...mangaData, [name]: value }); // Aquí
  };
  
  const handleAddGenre = () => {
    setMangaData({ ...mangaData, genres: [...mangaData.genres, newGenre] }); // Y aquí
  };
  
  const handleAddBackdrop = () => {
    setMangaData({ ...mangaData, backdrops: [...mangaData.backdrops, newBackdrop] }); // Y aquí
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de la película:', mangaData);

  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 formulario-container" style={{marginTop:'5em', marginBottom:'5em'}} >
      <Form.Group className="mb-3">
        <Col>
          <Form.Label className='labels'>IMDb ID</Form.Label>
          <Form.Control
            type="text"
            name="imdbId"
            value={mangaData.imdbId}
            onChange={handleChange}
            placeholder="Ingresa el IMDb ID"
          />
        </Col>
      </Form.Group>
      <Form.Group className="mb-3">
        <Col>
          <Form.Label className='labels'>Título</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={mangaData.title}
            onChange={handleChange}
            placeholder="Ingresa el título"
          />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3">
        <Col>
          <Form.Label className='labels'>Fecha de lanzamiento</Form.Label>
          <Form.Control
            type="date"
            name="releaseDate"
            value={mangaData.releaseDate}
            onChange={handleChange}
            placeholder="Ingresa la fecha de lanzamiento (YYYY-MM-DD)"
          />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3">
        <Col>
          <Form.Label className='labels'>Enlace del tráiler</Form.Label>
          <Form.Control
            type="text"
            name="trailerLink"
            value={mangaData.trailerLink}
            onChange={handleChange}
            placeholder="Ingresa el enlace del tráiler"
          />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3">
        <Col>
          <Form.Label className='labels'>URL del póster</Form.Label>
          <Form.Control
            type="text"
            name="poster"
            value={mangaData.poster}
            onChange={handleChange}
            placeholder="Ingresa la URL del póster"
          />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3">
        <Col>
          <Form.Label className='labels'>Géneros</Form.Label>
          <Form.Control
            type="text"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            placeholder="Ingresa un género"
          />
        </Col>
        <Col>
          <Button variant="success" className="mt-2" onClick={handleAddGenre} >Agregar Género</Button>
        </Col>
      </Form.Group>

      {mangaData.genres.map((genre, index) => (
        <div key={index}>{genre}</div>
      ))}


      <Button variant="danger" type="submit">
        Registrar Película
      </Button>
    </Form>
  );
};

export default RegistrarAnime;
