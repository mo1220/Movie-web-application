import React, {Fragment, useEffect, useState} from 'react';
import { Comment, Avatar, Form, Button, Input } from 'antd';
import Axios from 'axios';
// import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
 
const {TextArea} = Input;

function CommentEdit(props) {
    
    // const user = useSelector(state => state.user.userData);
    const user = localStorage.getItem('userId');

    const [value, setValue] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const movieId = props.movieId;
  
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        if(!value){
            return;
        }
        setSubmitting(true);

        const values = {
            writer: user,
            content: value,
            movieId: movieId
        }

        submitComment(values);

        setTimeout(() => {
            setSubmitting(false);
            setValue('');
        }, 1000);
    };

    const submitComment = (_values) => {
        Axios.post('/api/comment/submit', _values)
        .then(response => {
            if(response.data.success) {
                props.refreshComment(response.data.result)
            } else{
                alert('comment를 저장하지 못했습니다.')
            }
        })
    }
    
    return (
        <div>
            {props.commentsList && props.commentsList.map((comment, index) => ( 
                (!comment.responseTo &&
                    <Fragment key={index} >
                        <SingleComment
                            refreshComment={props.refreshComment} 
                            refreshDeleteComment={props.refreshDeleteComment}
                            refreshUpdateComment={props.refreshUpdateComment}
                            comment={comment}
                            commentsList={props.commentsList}    
                            movieId={movieId}/>
                        
                        <ReplyComment 
                            refreshComment={props.refreshComment}
                            refreshDeleteComment={props.refreshDeleteComment}
                            refreshUpdateComment={props.refreshUpdateComment}
                            parentCommentId={comment._id}
                            movieId={movieId} 
                            commentsList={props.commentsList}/>
                    </Fragment>

                )
            ))}


        <Comment
         avatar={
             <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="lee"/>
         }
        >
        <Form.Item>
            <TextArea rows={4} onChange={handleChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button
                style={{
                    float: 'right'
                }} 
                htmlType="submit" 
                loading={submitting} 
                onClick={handleSubmit} 
                type="primary">
                    Add Comment
            </Button>
        </Form.Item>
        </Comment>       
        </div>
    );
}

export default CommentEdit;