const Blog = require('../models/blog');

// Create a new blog (user-specific)
exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }
        
        const newBlog = new Blog({ 
            title, 
            content, 
            author: req.user._id 
        });
        
        await newBlog.save();
        await newBlog.populate('author', 'name email picture');
        
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's blogs only
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id })
            .populate('author', 'name email picture')
            .sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single blog by ID (user's blog only)
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findOne({ 
            _id: req.params.id, 
            author: req.user._id 
        }).populate('author', 'name email picture');
        
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a blog (user's blog only)
exports.deleteBlog = async (req, res) => {
    try {
        const deleted = await Blog.findOneAndDelete({ 
            _id: req.params.id, 
            author: req.user._id 
        });
        
        if (!deleted) return res.status(404).json({ message: "Blog not found" });
        res.json({ message: "Blog deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};