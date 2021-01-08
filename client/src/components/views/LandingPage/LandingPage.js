import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from './Sections/MainImage';
import GridCard from '../commons/GridCard';
import {Row} from 'antd';
// import axios from 'axios';

function LandingPage(props) {
     const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        
        fetchMovies(endpoint);

    }, [])

    const fetchMovies = async (endpoint) => {
        await fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([...Movies, ...response.results]);
            setCurrentPage(response.page);
            if(response.page === 1) return setMainMovieImage(response.results[0]);
        })
    }

    const onLoadMoreClick = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage+1}`;
        fetchMovies(endpoint);
    }

    return (
       <div style = { {width: '100%', margin: '0'}}>

           {/* main movie image */}
           {
                MainMovieImage &&
                <MainImage 
                image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                title={MainMovieImage.original_title}
                text={MainMovieImage.overview}/>
               
           }

           <div style={{width: '85%', margin: '1rem auto'}}>
                <h2>Movies by lates</h2>
                <hr/>

                {/* movie Grid card */}
                <Row gutter={[16, 24]}>
                    {Movies && Movies.map((movie, index) => { return(
                        <React.Fragment key={index}>
                        <GridCard
                        landingPage
                        image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` :  null}
                        movieId={movie.id}
                        movieName={movie.title}
                        />
                    </React.Fragment>
                    )
                })}
                </Row>
           </div>
           <div style={{display: 'flex', justifyContent: 'center'}}>
                <button type="button" onClick={onLoadMoreClick}>Load more</button>
           </div>
       </div>
    )
}

export default LandingPage
