import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import './MangaList.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MangaCard = ({ manga }) => {
  const navigate = useNavigate();

  function review(mangaId){
    navigate(`/Review/${mangaId}`);
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ marginBottom: '20px' }}>
      <Card style={{ height: '100%' }}>
        <Card.Img variant="top" src={manga.poster} style={{ height: '400px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{manga.title}</Card.Title>
          <div className="list-manga-container">
            <Link to={`/Trailer/${manga.trailerLink.substring(manga.trailerLink.length - 11)}`}>
              <div className='play-trailer-button'>
                <FontAwesomeIcon className='play-button' icon={faCirclePlay} />
              </div>
            </Link>
            <div className="manga-review-button-container">
                <Button variant="info" onClick={() => review(manga.imdbId)}>Reviews</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

const MangaList = ({ mangas }) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-3">
      {mangas.map((manga, index) => (
        <MangaCard key={index} manga={manga} />
      ))}
    </Row>
  );
};

export default MangaList;
