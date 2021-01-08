import React, {useState} from 'react';
import { Form, Comment, Avatar, Button, Input, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EditTwoTone } from '@ant-design/icons';
import './coment.css';
import Axios from 'axios';
import LikeDislikePage from './LikeDislikePage';
import { useSelector } from 'react-redux';
import UpdateCommentPage from './UpdateCommentPage';

const {TextArea} = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user.userData)
    const movieId = props.movieId;

    const [submitting, setSubmitting] = useState(false);
    const [openReply, setOpenReply] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const [openEditComment, setOpenEditComment] = useState(false);

    const onClickReplyOpen = () => {
        setOpenReply(!openReply )
    }


    //댓글 삭제
    const clickDelete = () => {
        const deleteValues = {
            commentId: props.comment._id,
            writer: user._id
        }

         Axios.post('/api/comment/deleteComment', deleteValues)
        .then(response => {
            if(response.data.success){
                props.refreshDeleteComment(deleteValues);
            }else{
                alert('댓글을 삭제하는데 실패했습니다.')
            }
        })
        
    }

    const clickUpdate = () => {
        console.log(props.comment._id)
        setOpenEditComment(!openEditComment)
    }
    
    const closeCommentForm = (closeEditComment) =>{
        setOpenEditComment(closeEditComment)
    }

    const onChangeHandle = (e) => {
        setCommentValue(e.target.value);
    }

    const onSubmitHandle = () => {
        if(!commentValue){
            return;
        }
        setSubmitting(true);

        const submitValues = {
            writer: user,
            content: commentValue,
            movieId: movieId,
            responseTo: props.comment._id 
        }

        submitComment(submitValues);

        setTimeout(() => {
            setSubmitting(false);
            setCommentValue('');
            setOpenReply(false)
        }, 1000);
    }

    //comment 저장
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

    
    const actions = [
        <Tooltip  key="comment-basic-reply-to">
            <span onClick={onClickReplyOpen} className="comment-action" >Reply to</span>
        </Tooltip>
    ]

    const deleteAction = [                
        <span key="" className="comment-action" onClick={clickDelete}>
            <DeleteOutlined/>
        </span>
    ]

    const editAction = [
        <span key="" className="comment-action" onClick={clickUpdate} >
            {
                openEditComment ? <EditTwoTone/> : <EditOutlined/>

            }
        </span>
        
    ]

    return (
        <div>
              <Comment
                    actions={[<LikeDislikePage userId={user} movieId={movieId} commentId={props.comment._id}/>, actions, deleteAction, editAction]}
                    author={props.comment.writer.name !== null ? props.comment.writer.name : '' }
                    avatar={<Avatar
                        src={props.comment.writer.image}
                        alt="author"/>}
                    content={props.comment.content}
                    datetime/>

                { openReply &&
                       <Form.Item>
                       <TextArea rows={4} onChange={onChangeHandle} value={commentValue}/>
           
                       <Button 
                       style={{
                           marginTop: '1rem',
                           float: 'right'
                       }} 
                       htmlType="submit" 
                       loading={submitting} 
                       onClick={onSubmitHandle}
                       type="primary">
                           Add Comment
                       </Button>
                   </Form.Item>
                }
                {
                    openEditComment&&
                    <UpdateCommentPage
                        comment={props.comment}
                        closeCommentForm={closeCommentForm}
                        refreshUpdateComment={props.refreshUpdateComment}/>
                }
        </div>
    );
}

export default SingleComment;