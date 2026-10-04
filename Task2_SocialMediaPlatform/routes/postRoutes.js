const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "name email")
            .populate("comments.user", "name")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch posts",
            error: error.message
        });
    }
});

// Create a post
router.post("/", async (req, res) => {
    try {
        const { user, content } = req.body;

        const post = await Post.create({
            user,
            content
        });

        const populatedPost = await Post.findById(post._id)
            .populate("user", "name email");

        res.status(201).json(populatedPost);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
});

// Like a post
router.post("/:id/like", async (req, res) => {
    try {
        const { userId } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter(
                id => id.toString() !== userId
            );
        } else {
            post.likes.push(userId);
        }

        await post.save();

        res.json({
            message: alreadyLiked ? "Post unliked" : "Post liked",
            likes: post.likes.length
        });
    } catch (error) {
        res.status(500).json({
            message: "Like action failed",
            error: error.message
        });
    }
});

// Add a comment
router.post("/:id/comment", async (req, res) => {
    try {
        const { user, text } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        post.comments.push({
            user,
            text
        });

        await post.save();

        const updatedPost = await Post.findById(post._id)
            .populate("user", "name email")
            .populate("comments.user", "name");

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({
            message: "Comment failed",
            error: error.message
        });
    }
});

module.exports = router;