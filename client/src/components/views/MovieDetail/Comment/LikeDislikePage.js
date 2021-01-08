import React, {createElement, useEffect, useState} from 'react';
import Axios from 'axios';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, DeleteOutlined } from '@ant-design/icons';
import {Tooltip } from 'antd';

function LikeDislikePage(props) {
    const [likes, setLikes] = useState(0);
    const [disLikes, setDisLikes] = useState(0);
    const [action, setAction] = useState(null);

    const values = {
        userId: props.userId,
        movieId: props.movieId,
        commentId: props.commentId
    }


    useEffect(() => {
        //'좋아요' 갯수 가져오기
        Axios.post('/api/like/getLikes', values)
        .then(response => {
            if(response.data.success){
                let likeNumber = response.data.likes.length  
                setLikes(likeNumber);
                
                if(likeNumber > 0){
                    response.data.likes.map( like => {
                        if(like.userId._id === values.userId._id) {
                            setAction('liked');
                        }
                    })    
                }
            }
        })

        //'싫어요' 갯수 가져오기
        Axios.post('/api/dislike/getDislikes', values)
        .then(response => {
            if(response.data.success) {
                let dislikeNumber = response.data.dislikes.length
                setDisLikes(dislikeNumber);

                if(dislikeNumber > 0) {
                    response.data.dislikes.map( dislike => {
                        if(dislike.userId._id == values.userId._id){
                            setAction('disliked');
                        }
                    })    
                }
            }
        })
    }, [])

    const clickLiked = (_values) => {
        // console.log('click')
        if(action === null || action === 'disliked'){
            Axios.post('/api/like/saveLike', _values)
            .then(response => {
                if(response.data.success){
                    setLikes(likes + 1)
                    setAction('liked'); 
                } else{
                    alert('좋아요 누르기를 실패했습니다.')
                }
            })    
        }
        if(action === 'disliked'){
            Axios.post('/api/dislike/removeDislike', values)
            .then(response => {
                if(response.data.success){
                    setLikes(likes + 1);
                    setDisLikes(disLikes-1)
                    setAction('liked');  
                } else{
                    alert('좋아요를 삭제하는데 실패했습니다.')
                }
            })    
        }
    }

    const clickDisliked = (_values) => {
        // console.log('click')
        if(action === null || action === 'liked'){
            Axios.post('/api/dislike/saveDislike', _values)
            .then(response => {
                if(response.data.success){
                    setDisLikes(disLikes + 1);
                    setAction('disliked');     
                } else{
                    alert('좋아요 누르기를 실패했습니다.')
                }
            })
        }

        if(action === 'liked'){
            Axios.post('/api/like/removeLike', values)
            .then(response => {
                if(response.data.success){
                    setDisLikes(disLikes + 1);
                    setLikes(likes - 1);
                    setAction('disliked');  
                } else{
                    alert('좋아요를 삭제하는데 실패했습니다.')
                }
            })    
        }
    }

    const likeHandler = () => {
        clickLiked(values);
    }

    const dislikeHandler = () => {
        clickDisliked(values);
    }
 

    return (
        <div>
             <Tooltip key='comment-basic-like' title="Like">
            <span className="comment-action" onClick={action !== 'liked' && likeHandler}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>

        <Tooltip key='comment-basic-dislike' title="Dislike">
            <span className="comment-action" onClick={action !== 'disliked' && dislikeHandler}>
                {createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{disLikes}</span>
            </span>
        </Tooltip>
        </div>
    );
}

export default LikeDislikePage;