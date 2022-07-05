const commentModel = require("../../../DB/model/comment");
const postModel = require("../../../DB/model/post");
const { paginate } = require("../../../services/paginate");



// create post 
const createPost = async (req, res) => {
    const { text } = req.body;
    if (req.fileErr) {
        res.status(400).json({ message: 'in-valid format' });
    }
    else {
        const imageUrl = [];
        req.files.forEach(file => {
            imageUrl.push(`${req.finalDistination}/${file.filename}`);
        })
        const newPost = new postModel({ text, image: imageUrl, createdBy: req.user._id });
        const savedPost = await newPost.save();
        res.status(201).json({ message: 'Done', savedPost });
    }
}

// get all posts
const getAllPost = async (req, res) => {
    // pagination
    const { page, size } = req.query;
    const { limit, skip } = paginate(page, size);

    const post = await postModel.find({}).limit(limit).skip(skip).populate([
        {
            path: 'createdBy',
            select: 'userName email'
        },
        {
            path: 'likes',
            select: 'userName email'
        },
        {
            path: 'comments',
            populate: [
                {
                    path: 'createdBy',
                    select: 'userName email'
                },
                {
                    path: 'likes',
                    select: 'userName email'
                },
                {
                    path: 'reply',
                    populate: [
                        {
                            path: 'createdBy',
                            select: 'userName email'
                        },
                        {
                            path: 'likes',
                            select: 'userName email'
                        },
                        {
                            path: 'reply',
                            populate: [
                                {
                                    path: 'createdBy',
                                    select: 'userName email'
                                },
                                {
                                    path: 'likes',
                                    select: 'userName email'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ])
    res.status(200).json({ message: 'Done', post });
}

// like post
const likePost = async (req, res) => {
    await postModel.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } });
    res.status(200).json({ message: 'Done' });
}
// un like post
const unLikePost = async (req, res) => {
    await postModel.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } });
    res.status(200).json({ message: 'Done' });
}

module.exports = { createPost, getAllPost, likePost, unLikePost };