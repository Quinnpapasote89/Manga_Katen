import React, { useEffect, useState,useRef } from 'react';
import { Form, Button,Col } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import './RegistroAnime.css';
import { toast } from 'react-toastify';


const RegistrarAnime = () => {
  const [mangaData, setMangaData] = useState({
    imdbId: '',
    title: '',
    releaseDate: '',
    trailerLink: '',
    sinopsis:'',
    genres: [],
    poster: '',
    backdrops: [],
    reviewIds: [],
  });

  const [newGenre, setNewGenre] = useState('');
  const [newBackdrop, setNewBackdrop] = useState('');
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const isRoot = username === "Root";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMangaData({ ...mangaData, [name]: value }); 
  };
  
  const handleAddGenre = () => {
    setMangaData({ ...mangaData, genres: [...mangaData.genres, newGenre] }); // Y aquí
  };
  
  const handleAddBackdrop = () => {
    setMangaData({ ...mangaData, backdrops: [...mangaData.backdrops, newBackdrop] }); // Y aquí
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Expresión regular para validar el enlace del tráiler de YouTube
    const youtubeLinkRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=.{11})$/;

    if (!youtubeLinkRegex.test(mangaData.trailerLink)) {
      alert('El enlace del tráiler no cumple con el formato de YouTube válido.');
      return;
    }
    console.log('Datos de la película:', mangaData);

    try {
      const response = await api.post('api/v1/mangas', mangaData);
      console.log(response.data);
      toast.success('Se agrego de forma exitosa el anime!');
      // Realizar acciones adicionales si es necesario
    } catch (error) {
      console.error(error);
      toast.error('Ocurrio un error para poder ingresar el anime');

    }

  };

  if (!isRoot) {
    toast.error('No tienes autorización para realizar esta acción');
    return <div>No tienes autorización para ver esta opción</div>;
  }

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
          <Form.Label className='labels'>Sinopsis</Form.Label>
          <Form.Control
            as="textarea"
            rows={4} // Puedes ajustar el número de filas según sea necesario
            name="sinopsis"
            value={mangaData.sinopsis}
            onChange={handleChange}
            placeholder="Ingresa la sinopsis del manga"
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

      <Form.Group className="mb-3">
        <Col>
          <Form.Label className='labels'>Backdrops</Form.Label>
          <Form.Control
            type="text"
            value={newBackdrop}
            onChange={(e) => setNewBackdrop(e.target.value)}
            placeholder="Ingresa un enlace de backdrop"
          />
        </Col>
        <Col>
          <Button variant="success" className="mt-2" onClick={handleAddBackdrop} >Agregar Backdrop</Button>
        </Col>
      </Form.Group>

      {mangaData.backdrops.map((backdrop, index) => (
        <div key={index}>{backdrop}</div>
      ))}


      <Button variant="danger" type="submit">
        Registrar Película
      </Button>
    </Form>
  );
};

export default RegistrarAnime;
