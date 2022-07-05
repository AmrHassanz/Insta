const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');

// 01
const commentSchema = new mongoose.Schema({
    text: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isDeleted: { type: Boolean, default: false },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    reply: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    // created at , updated at
    timestamps: true
})

// 02
const commentModel = mongoose.model('Comment', commentSchema);

module.exports = commentModel;
