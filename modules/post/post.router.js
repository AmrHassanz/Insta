const router = require('express').Router();
const { myMulter, multerValidators, multerPath, HME } = require('../../services/multer');
const { auth } = require('../../middlewear/auth');
const endPoint = require('./post.endPoint');
const postController = require('./controller/post');
const commentController = require('./controller/comment');
const validation = require('../../middlewear/validation');
const validators = require('./post.validation');


// create post
router.post('/',
    auth(endPoint.createPost),
    myMulter(multerPath.post, multerValidators.image).array('image', 5),
    validation(validators.createPost),
    postController.createPost);

// create comment
router.patch('/:id/comment',
    auth(endPoint.createPost),
    validation(validators.createComment),
    commentController.createComment);

// get post
router.get('/', postController.getAllPost)

// like post
router.patch('/:id/like',
    auth(endPoint.createPost),
    validation(validators.likePost),
    postController.likePost);

// un like post
router.patch('/:id/unLike',
    auth(endPoint.createPost),
    validation(validators.likePost),
    postController.unLikePost);

// reply on comment & reply on reply on comment
router.patch('/:id/comment/:commentId/reply',
    auth(endPoint.createPost),
    validation(validators.replyOnComment),
    commentController.replyOnComment);

// like comment
router.patch('/comment/:id/like',
    auth(endPoint.createPost),
    validation(validators.likePost),
    commentController.likeComment);

// un like comment
router.patch('/comment/:id/unLike',
    auth(endPoint.createPost),
    validation(validators.likePost),
    commentController.unLikeComment);


module.exports = router;