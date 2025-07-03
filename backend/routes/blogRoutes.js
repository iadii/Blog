const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');

// All blog routes require authentication
router.post('/', auth, blogController.createBlog);
router.get('/', auth, blogController.getAllBlogs);
router.get('/:id', auth, blogController.getBlogById);
router.put('/:id', auth, blogController.updateBlog);
router.delete('/:id', auth, blogController.deleteBlog);

module.exports = router;