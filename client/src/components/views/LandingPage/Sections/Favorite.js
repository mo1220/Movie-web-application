import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Button} from 'antd';

function Favorite(props) {
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    
    const [favoriteNumber, setFavoriteNumber] = useState(0);
    const [favorited, setFavorited] = useState(false);

    let variabled = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }
    useEffect( () => {


        //favorite 숫자 정보 가져오기
        Axios.post('/api/favorite/favoriteNumber', variabled)
        .then(response => {
            if(response.data.success){
                setFavoriteNumber(response.data.favoriteNumber)
            }else{
                alert('숫자 정보를 가져오는데 실패했습니다.');
            }
        })
        .catch(error => {
            console.log(error);
        })

        
        // favorite 영화 정보 가져오기
        Axios.post('/api/favorite/favorited', variabled)
        .then(response => {
            if(response.data.success){
                setFavorited(response.data.result)
            }else{
                alert('정보를 가져오는데 실패했습니다.');
            }
        })
        .catch(error => {
            console.log(error);
        })

    }, [])

    const onClickFavorite = () => {
        if(favorited){
            Axios.post('/api/favorite/removeFromFavorite', variabled)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(favoriteNumber - 1)
                    setFavorited(!favorited)
                }else {
                    alert('Favorite 리스트에서 지우기를 실패했습니다.')
                }
            })
        } else {
            Axios.post('/api/favorite/addToFavorite', variabled)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(favoriteNumber + 1);
                    setFavorited(!favorited)

                }else {
                    alert('Favorite 리스트에 추가하기를 실패했습니다.')
                }
            })

        }
    }
    return (
        <div>
             <Button onClick={onClickFavorite}> {favorited? "Not Favorite" : "Add to favorite"}  { favoriteNumber}</Button>
        </div>
    );
}

export default Favorite;