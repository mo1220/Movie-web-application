import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './favorte.css';
import {Button, Popover} from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage(props) {
    const [favoriteList, setFavoriteList] = useState([]);
    
    useEffect(() => {
       fetchFavoreMovie();
    }, [])

    const fetchFavoreMovie = () => {
        Axios.post('/api/favorite/getFavoriteMovie', {userFrom: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success){
                setFavoriteList(response.data.favorite)
            } else{
                alert('영화 정보를 가져오는데 실패했습니다.')
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId: movieId,
            userFrom: userFrom
        }
        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if(response.data.success){
                fetchFavoreMovie();
            }else{
                alert('리스트를 삭제하는데 실패했습니다.')
            }
        })
    }

    const renderCards =  favoriteList.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} alt={`${favorite.title}포스트`}/> : "No Image"
                }
            </div>
        )

        return (
            <tr key={index}>
                <Popover content={content} title={`${favorite.movieTitle}`}>
                    <td>{favorite.movieTitle}</td>
                </Popover>
                <td>{favorite.movieRunTime} mins</td>
                <td onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}><Button>Remove</Button></td>
            </tr>

        )
    })

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr/>

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorite</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    );
}

export default FavoritePage;