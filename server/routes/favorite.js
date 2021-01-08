const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {

    Favorite.find({"movieId": req.body.movieId})
    .exec((err, info)=> { //query 탐색
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true, favoriteNumber: info.length})
        
    })
})


router.post('/favorited', (req, res) => {
    //내가 이 영화를 favorite 리스트에 넣었는지 정보를 DB에서 가져오기
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
    .exec((err, info)=> { //query 탐색
        if(err) return res.status(400).send(err)

        let result = false;
        if(info.length !== 0){
            result = true;
        }

        res.status(200).json({ success: true, result: result})
        
    })
})

router.post('/removeFromFavorite', (req, res) => {
    //영화를 favorite 리스트에서 삭제하기
   Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
   .exec((err, doc) => {
       if(err) return res.status(400).send(err)
       return res.status(200).json({success: true, doc})
   })
})

router.post('/addToFavorite', (req, res) => {
    //영화를 favorite 리스트에서 추가하기
    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        
        return res.status(200).json({success: true})
    })
    
})

router.post('/getFavoriteMovie', (req, res) => {
   Favorite.find({'userFrom': req.body.userFrom})
   .exec((err, favorite) => {
        if(err) return res.status(400).send(err)

        return res.status(200).json({success: true, favorite})
   })
    
})


module.exports = router;
