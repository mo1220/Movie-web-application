const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disLikeSchema = mongoose.Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId : {
        type: String
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
}, {timestamps: true})



const DisLike = mongoose.model('DisLike', disLikeSchema);

module.exports = { DisLike }