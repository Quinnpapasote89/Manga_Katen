import React from 'react';
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@mui/material';
import './Prota.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Review from '../Review/Review';
import Button from 'react-bootstrap/Button';



const Prota = ({mangas}) => {
    const navigate = useNavigate();

    function review(mangaId){
        navigate(`/Review/${mangaId}`);
    }

    return(
        <div className='manga-carousel-container'>
            <Carousel>
                {
                    mangas?.map((mangas) => {
                        return(
                            <Paper>
                                <div className='manga-card-container'>
                                    <div className='manga-card' style={{"--img": `url(${mangas.backdrops[0]})`}}>
                                        <div className='manga-detail'>
                                            <div className='manga-poster'>
                                                <img src={mangas.poster} alt=""/>
                                            </div>
                                            <div className='manga-title'>
                                                <h4>{mangas.title}</h4>
                                            </div>
                                            <div className="manga-buttons-container">
                                                <Link to={`/Trailer/${mangas.trailerLink.substring(mangas.trailerLink.length - 11)}`}>
                                                <div className='play-button-icon-container'>
                                                    <FontAwesomeIcon className='play-button-icon'
                                                    icon = {faCirclePlay}/>
                                                </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )
                    })
                }
            </Carousel>
        </div>

    )
}

export default Prota