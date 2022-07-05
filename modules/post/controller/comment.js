const postModel = require("../../../DB/model/post");
const commentModel = require("../../../DB/model/comment");

// create comment
const createComment = async (req, res) => {
    const { text } = req.body;
    const { id } = req.params; // post id
    const { _id } = req.user;  // user id

    const post = await postModel.findOne({ _id: id });
    if (!post) {
        res.status(404).json({ message: 'in-valid post id' });
    }
    else {
        const createComment = new commentModel({ text, createdBy: _id, postId: post._id });
        const savedComment = await createComment.save();

        await postModel.findByIdAndUpdate(post._id, { $push: { comments: savedComment._id } }, { new: true });

        res.status(201).json({ message: 'Done', savedComment });
    }
}

// reply
const replyOnComment = async (req, res) => {
    const { text } = req.body;
    const { id, commentId } = req.params;
    const { _id } = req.user;

    const post = await postModel.findOne({ _id: id });
    if (!post) {
        res.status(404).json({ message: 'in-valid post id' });
    }
    else {
        const comment = await commentModel.findOne({ _id: commentId, postId: post._id });
        if (!comment) {
            res.status(404).json({ message: 'in-valid comment id' });
        }
        else {
            const createComment = new commentModel({ text, createdBy: _id, postId: post._id });
            const savedComment = await createComment.save();

            await commentModel.findByIdAndUpdate(commentId, { $push: { reply: savedComment._id } });

            res.status(201).json({ message: 'Done', savedComment });
        }
    }
}

// like comment
const likeComment = async (req, res) => {
    await commentModel.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } });
    res.status(200).json({ message: 'Done' });
}

// un like comment
const unLikeComment = async (req, res) => {
    await commentModel.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } });
    res.status(200).json({ message: 'Done' });
}

module.exports = { createComment, replyOnComment, likeComment, unLikeComment }