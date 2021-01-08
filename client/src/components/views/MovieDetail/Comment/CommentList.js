import React, { useEffect, useState } from 'react';
import { Comment, List } from 'antd';
import Axios from 'axios';

function CommentList(props) {

    const movieId = props.movieId;
    const [commentList, setCommentList] = useState([]);

    useEffect( () => {
        console.log('movieId:', movieId);
        Axios.post('/api/comment/getComments', movieId)
        .then(response => {
            console.log(response.data)
            if(response.data.success){  
                setCommentList([
                    response.data.comments,
                    ...commentList,
                ])
            }else{
                alert('댓글 불러오기를 실패했습니다.')
            }
        })

    }, [])
    
    return (
        <>
        {
            commentList && commentList.map((comment, index)=>{
                return(
                    <List
                    key={index}
                    dataSource={comment}
                    header={`${comment.length} ${comment.length > 1 ? 'replies' : 'reply'}`}
                    itemLayout = "horizontal"
                    renderItem = {item => 
                                    <Comment
                                        author={item.name}
                                        avatar={item.image}
                                        content={item.content}
                                        datetime={item.createdAt}/> }
                />
    
                )
            })
        }

        </>
    );
}   

export default CommentList;