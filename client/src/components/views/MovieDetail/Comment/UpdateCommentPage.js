import React, {useEffect, useState} from 'react';
import { Form, Button, Input } from 'antd';
import Axios from 'axios';

const {TextArea} = Input;

function UpdateCommentPage(props) {
    const [commentValue, setCommentValue] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [parentCommentId, setParentCommentId] = useState('');
    const [childCommentId, setChildCommentId] = useState('');

    useEffect( () => {
        setCommentValue(props.comment.content)
        console.log(props.comment.writer)

        // props.commentsList.filter(comment => {
        //     if(!comment.responseTo)
        //         return setParentCommentId(comment._id)
            
        //     else return setChildCommentId(comment._id)
        // }) 
    }, [])

    const onChangeHandle = (e) => {
        setCommentValue(e.target.value);
    }

    const onSubmitHandle = () => {
        if(!commentValue){
            return;
        }
        setSubmitting(true);

        const updateComment = {
            commentId: props.comment._id,
            content: commentValue,
            writer: props.comment.writer
        }

        Axios.post('/api/comment/updateComment', updateComment)
        .then(response => {
           if(response.data.success){
                props.refreshUpdateComment()
           } else{
               alert('댓글을 수정하는데 실패했습니다.')
           }
        })

        setTimeout(() => {
            setSubmitting(false);
            setCommentValue('');
            props.closeCommentForm(false)
        }, 1000);    
    }

    return (
        <div>
            <Form.Item>
                <TextArea 
                    rows={4} 
                    onChange={onChangeHandle} 
                    value={commentValue}
                    ></TextArea>
           
                    <Button 
                       style={{
                           marginTop: '1rem',
                           float: 'right'
                       }} 
                       htmlType="submit" 
                       loading={submitting} 
                       onClick={onSubmitHandle}
                       type="default">
                           Update Comment
                    </Button>
            </Form.Item>
        </div>
    );
}

export default UpdateCommentPage;