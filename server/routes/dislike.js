const express = require('express');
const router = express.Router();
const {DisLike} = require('../models/DisLike');

router.post('/saveDislike', (req, res) => {

    const dislike = new DisLike(req.body)

    dislike.save((err, like) => {
        if(err) return res.status(400).send(err)
        
        DisLike.find({'_id': like._id})
        .populate('userId')
        .populate('commentId')
        .exec((err, result) => {
            if(err) return res.status(400).send(err)
            
            return res.status(200).json({success: true, data: result})
        })
    })
    
})

router.post('/removeDislike', (req, res) => {

    DisLike.findOneAndDelete({userId: req.body.userId, movieId: req.body.movieId, commentId: req.body.commentId})
    .exec((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success: true, doc})
    })
})

router.post('/getDislikes', (req, res) => {

    DisLike.find({'commentId': req.body.commentId})
    .populate('userId')
    .exec((err, dislikes) => {
         if(err) return res.status(400).send(err)
 
         res.status(200).json({success: true, dislikes})
    })
     
 })
 
module.exports = router;
