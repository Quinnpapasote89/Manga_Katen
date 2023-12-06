import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import { Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/header/Header';
import Trailer from './components/Trailer/Trailer';
import MangaList from './components/List/MangaList';
import Review from './components/Review/Review';
import Registro from './components/Registro/Registro';
import RegistrarAnime from './components/RegistroAnime/RegistroAnime';
import Login from './components/Login/Login';
import { ToastContainer } from 'react-toastify';


function App() {
  
  const [mangas, setMangas] = useState();
  const [manga,setManga] = useState();
  const [reviews,setReviews] = useState();

  const getMangas = async () =>{
    try {
      const response = await api.get("/api/v1/mangas");

      setMangas(response.data);
    }catch(error){
      console.log(error);
    }
  }
  
  useEffect(() => {
    getMangas();
  },[])

  const getMangaData = async (mangaId) => {

    try{
      const response = await api.get(`/api/v1/mangas/${mangaId}`);
      console.log(response.data);

      const singleManga = response.data;

      setManga(singleManga);

      setReviews(singleManga.reviewIds);

    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home mangas = {mangas}/>}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Review/:mangaId" element={<Review getMangaData={getMangaData} manga={manga} reviews={reviews} setReviews={setReviews}/>}></Route>
          <Route path="/mangaList" element={<MangaList mangas={mangas} />}></Route>
          <Route path="/registrar" element={<Registro/>}></Route>
          <Route path="/registrar-anime" element={<RegistrarAnime />}></Route>
          <Route path="/ingresar" element={<Login/>}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
