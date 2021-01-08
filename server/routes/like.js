const express = require('express');
const router = express.Router();
const {Like} = require('../models/Like');

router.post('/saveLike', (req, res) => {

    const like = new Like(req.body)

    like.save((err, like) => {
        if(err) return res.status(400).send(err).json({success: false})

        Like.find({'_id': like._id})
        .populate('userId')
        .populate('commentId')
        .exec((err, result) => {
            if(err) return res.status(400).send(err)
            
            return res.status(200).json({success: true})
        })
    })
    
})

router.post('/removeLike', (req, res) => {

    Like.findOneAndDelete({userId: req.body.userId, movieId: req.body.movieId, commentId: req.body.commentId})
    .exec((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success: true, doc})
    })
})

router.post('/getLikes', (req, res) => {

    Like.find({"commentId": req.body.commentId})
    .populate('userId')
    .exec((err, likes) => {
         if(err) return res.status(400).send(err)
 
         res.status(200).json({success: true, likes})
    })
     
 })
 
module.exports = router;
