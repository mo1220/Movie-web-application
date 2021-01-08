import React, {Fragment, useEffect, useState} from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const [childCommentNumber, setChildCommentNumber] = useState(0);
    const [openReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;
        props.commentsList.map((comment) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber ++;
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.commentsList])

    const renderReplyComment = (parentCommentId) => {
    
        return props.commentsList.map((comment, index) => (
            <Fragment key={index}>
                {
                    comment.responseTo === parentCommentId &&
                    <div style={{width: '80%', marginLeft:'40px'}}>
                        <SingleComment 
                            comment={comment}   
                            movieId={props.movieId}
                            refreshComment={props.refreshComment}
                            refreshDeleteComment={props.refreshDeleteComment}
                            refreshUpdateComment={props.refreshUpdateComment}/>

                        <ReplyComment 
                            refreshComment={props.refreshComment}
                            refreshDeleteComment={props.refreshDeleteComment}
                            refreshUpdateComment={props.refreshUpdateComment}
                            movieId={props.movieId} 
                            commentsList={props.commentsList}
                            parentCommentId={comment._id}/>

                    </div>
                }
            </Fragment>

        ))
    }

    const onHandleChange = () => {
        setOpenReplyComments(!openReplyComments);
    }

    return (
        <div>
            {
                childCommentNumber > 0 &&
                <p 
                style={{ cursor: 'pointer', fontSize: '14px', margin: '0', color: 'gray'}}
                onClick={onHandleChange}>
                   View {childCommentNumber} more comment(s)
                </p>
            }
            {
                openReplyComments &&
                (renderReplyComment(props.parentCommentId))
            }

        </div>
    );
}

export default ReplyComment;