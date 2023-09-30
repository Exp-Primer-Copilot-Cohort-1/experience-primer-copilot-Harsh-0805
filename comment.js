// Create web server

// Import modules

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Create routes

router.get('/', commentController.comment_list);
router.get('/:id', commentController.comment_detail);
router.post('/', commentController.comment_create);
router.put('/:id', commentController.comment_update);
router.delete('/:id', commentController.comment_delete);

// Export module

module.exports = router;

// End

// Path: commentController.js
// Create controller

// Import modules

const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

// Create controller functions

// Display list of all comments
exports.comment_list = (req, res, next) => {
    Comment.find()
        .sort([['createdAt', 'descending']])
        .exec((err, list_comments) => {
            if (err) return next(err);
            res.json(list_comments);
        });
};

// Display detail page for a specific comment
exports.comment_detail = (req, res, next) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) return next(err);
        res.json(comment);
    });
};

// Handle comment create on POST

exports.comment_create = [
    // Validate and sanitize fields
    body('text', 'Comment text must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('post', 'Post must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('author', 'Author must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract validation errors from request
        const errors = validationResult(req);
        // Create a comment object with escaped and trimmed data
        const comment = new Comment({
            text: req.body.text,
            post: req.body.post,       
    })}];

// Check for errors

if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values/error messages
    res.json({ errors: errors.array() });
    return;
} else {
    // Data from form is valid. Save comment
    comment.save((err) => {
        if (err) return next(err);
        res.json(comment);
    });
}

