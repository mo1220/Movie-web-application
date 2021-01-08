import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './MovieInfo';
import GridCard from '../commons/GridCard';
import Noimage from '../../../Images/icon-no-image.svg';
import {Row} from 'antd';
import Favorite from '../LandingPage/Sections/Favorite';
import {Button} from 'antd'
import CommentEdit from './Comment/CommentEdit';
import Axios from 'axios';


function MovieDetail(props) {
    let movieId = props.match.params.movieId;
    const [movieDetail, setMovieDetail] = useState([]);
    const [actors, setActors] = useState([]);
    const [toggle, setToggle] = useState(false);

    //댓글 저장
    const [comments, setComments] = useState([]);

    useEffect(()=> {
        let urlCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`; 
        let urlInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`; 

        fetchMovieInfo(urlInfo);
        fetchMovieCrewInfo(urlCrew);

        Axios.post('/api/comment/getComments', { movieId })
        .then(response => {
            if(response.data.success){  
                setComments(...comments, response.data.comments)
            }else{
                alert('댓글 불러오기를 실패했습니다.')
            }
        })

    }, [])
    

    const fetchMovieInfo = (urlInfo) => {
        fetch(urlInfo)
        .then(response => response.json())
        .then(response => {
            setMovieDetail(response);
        })
    }

    const fetchMovieCrewInfo = (urlCrew) => {
        fetch(urlCrew)
        .then(response => response.json())
        .then(response => {
            setActors(response.cast);
        })
    }

    const onClickToggle = () => {
        setToggle(!toggle);
    }

    const refreshComment = (newComment) => {
        setComments(comments.concat(newComment))
    }
    
    const refreshDeleteComment = (deleteCommentId) => {

        Axios.post('/api/comment/getComments', { movieId })
        .then(response => {
            if(response.data.success){  
                setComments(response.data.comments.filter(comment => comment._id !== deleteCommentId))

            }else{
                alert('댓글 불러오기를 실패했습니다.')
            }
        })
    }

    const refreshUpdateComment = () => {
        Axios.post('/api/comment/getComments', { movieId })
        .then(response => {
            if(response.data.success){
                setComments(response.data.comments.map(comment => comment))

            }else{
                alert('댓글 불러오기를 실패했습니다.')
            }
        })
    }

    return (
        <div>
            {/* Header */}
            <MainImage
             image={`${IMAGE_BASE_URL}w1280${movieDetail.backdrop_path}`}
             title={movieDetail.original_title}
             text={movieDetail.overview}/>

             
            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto', textAlign: 'center'}}>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Favorite 
                    movieInfo={movieDetail} 
                    movieId={movieId} 
                    userFrom={localStorage.getItem('userId')}/>
                </div> 
            
                {/* Movie info */}
                <MovieInfo movie={movieDetail}/>

                <Button
                onClick={onClickToggle} 
                style={{margin: '2rem'}}
                type="button">Toggle Actor View</Button>

                {/* Actor Grid */}
                { toggle &&
                    <Row gutter={[16, 24]}>
                    {actors && actors.map((actor, index) => { 
                        return(
                        <React.Fragment key={index}>
                        <GridCard
                        MovieDetail
                        image={actor.profile_path ? `${IMAGE_BASE_URL}w500${actor.profile_path}` :  `${Noimage}`}
                        actorName={actor.name}
                        />
                    </React.Fragment>
                    )
                })}
                </Row>
                }
            </div>

            <div style={{width: '85%', margin: '1rem auto'}}>
                <CommentEdit 
                    refreshComment={refreshComment} 
                    refreshDeleteComment={refreshDeleteComment}
                    refreshUpdateComment={refreshUpdateComment} 
                    commentsList={comments}
                    movieId={movieId}/>
            </div>
        </div>
    );
}

export default MovieDetail;