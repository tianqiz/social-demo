const express = require('express'),
      router = express.Router(),
      { createPostValidator } = require('../validator')
      
const { getPosts, createPosts, postsByUser, 
        postById, isPoster, deletePost,
        updatePost, photo, singlePost,like,
        unlike, comment, uncomment, getRandomPosts } = require('../controllers/posts')
const { requireSignin } = require('../controllers/auth')
const { userById } = require('../controllers/user')
router.get('/posts', getPosts);
router.get('/allrandomposts', getRandomPosts);
// like unlike
router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);
// comments
router.put('/post/comment', requireSignin, comment);
router.put('/post/uncomment', requireSignin, uncomment);

router.post('/post/new/:userId', requireSignin, createPosts, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.get('/post/:postId',  singlePost);

router.get('/post/photo/:postId', photo)

router.put('/post/:postId', requireSignin, isPoster, updatePost)
router.delete('/post/:postId', requireSignin, isPoster, deletePost)




router.param('userId', userById);
router.param('postId', postById);

module.exports = router;