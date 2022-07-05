const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');


// 01
const postSchema = new mongoose.Schema({
    text: String,
    image: { type: Array, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // not required because no post is created with likes and shares
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    share: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // soft delete
    isDeleted: { type: Boolean, default: false },
    // deleted by user or admin
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // add this for parent child relation
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    // created at , updated at
    timestamps: true
})


// 02
const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;
