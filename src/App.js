import './App.css';
import api from '../src/api/axiosConfig';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';


function App() {


  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {

    try {

      const response = await api.get("/api/v1/movies");
      const resData = response.data;
      setMovies(resData);



    } catch (err) {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`)

      const singleMovie = response.data;


      setMovie(singleMovie);

      const singleMovieReview = singleMovie.reviewIds;
      console.log(singleMovieReview);

      setReviews(singleMovieReview);




    } catch (err) {
      console.log(err);
    }

  }
  useEffect(() => {
    getMovies();


  }, [])



  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />} />
          <Route path='/Trailer/:ytTrailerId' element={<Trailer />} />
          <Route path='/Reviews/:movieId' element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
