const Blog = require('../models/blog');

// Get shared blog by ID (public access)
exports.getSharedBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ 
            _id: req.params.id,
            shared: true
        });
        
        if (!blog) {
            return res.status(404).json({ message: "Shared blog not found" });
        }
        
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new blog (user-specific)
exports.createBlog = async (req, res) => {
    try {
        const { title, content, shared = false } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }
        
        const newBlog = new Blog({ 
            title, 
            content, 
            author: req.user.name,
            shared
        });
        
        await newBlog.save();
        
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's blogs only
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user.name })
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
            author: req.user.name 
        });
        
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a blog (user's blog only)
exports.updateBlog = async (req, res) => {
    try {
        const { title, content, shared } = req.body;
        
        // Build update object with only provided fields
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (shared !== undefined) updateData.shared = shared;
        
        // If no fields to update, return error
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }
        
        // If updating title or content, both are required
        if ((title !== undefined || content !== undefined) && (!title || !content)) {
            return res.status(400).json({ message: 'Title and content are required when updating either' });
        }
        
        const updatedBlog = await Blog.findOneAndUpdate(
            { 
                _id: req.params.id, 
                author: req.user.name 
            },
            updateData,
            { new: true }
        );
        
        if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a blog (user's blog only)
exports.deleteBlog = async (req, res) => {
    try {
        const deleted = await Blog.findOneAndDelete({ 
            _id: req.params.id, 
            author: req.user.name 
        });
        
        if (!deleted) return res.status(404).json({ message: "Blog not found" });
        res.json({ message: "Blog deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};