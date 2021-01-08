const express = require('express');
const router = express.Router();
const {Comment} = require('../models/Comment');

router.post('/submit', (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if(err) return res.status(400).send(err)
        
        Comment.find({'_id': comment._id})
        .populate('writer')
        .exec((err, result) => {
            if(err) return res.status(400).send(err)
            
            return res.status(200).json({success: true, result})
        })
    })
    
})

router.post('/getComments', (req, res) => {

    Comment.find({'movieId': req.body.movieId})
    .populate('writer')
    .exec((err, comments) => {
         if(err) return res.status(400).send(err)
 
         res.status(200).json({success: true, comments})
    })
     
 })

 router.post('/deleteComment', (req, res) => {
    Comment.findOne({"_id": req.body.commentId}, (err, comment) => {
        if(err) return res.status(400).send("일치하는 commentId가 없습니다.")       

        if(comment.writer != req.body.writer) 
            return res.status(400).json({ findUser : false, message: "Writer is different", writer: comment.writer, req: req.body.writer})

        
        Comment.deleteMany({$or: [{"_id": req.body.commentId}, {"responseTo": req.body.commentId}]})
        .exec((err, result) => {
            if(err) return res.status(400).send(err)

            return res.status(200).json({success: true, result});
        })
    
    })
 })

 router.post('/updateComment', (req, res) => {
     Comment.findOne({"_id": req.body.commentId}, (err, comment) => {
         if(err) return res.status(400).send("일치하는 commentId가 없습니다.")
         
         if(comment.writer != req.body.writer._id) 
            return res.status(401).json({ findUser : false, message: "Writer is different", writer: comment.writer, req: req.body.writer})

        comment.updateOne({'content': req.body.content})
        .exec((err, result) => {
            if(err) return res.state(402).send(err)

            return res.status(200).json({success: true})
        })
     })
 })
 
module.exports = router;
