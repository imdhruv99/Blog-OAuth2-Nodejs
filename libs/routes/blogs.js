// Require Packages
var express = require('express');
var passport = require('passport');
var router = express.Router();

// Importing Logging file and DB Connection
var log = require('../log')(module);
var db = require('../db/mongoose');

// Importing Blog Model
var Blog = require('../models/blog');

// List all Blog 
// This will find Blogs and return in json, if any error occured it will through 500
router.get('/', passport.authenticate('bearer', { session: false }), function (req, res) {

    Blog.find(function (err, blogs) {
        if (!err) {
            return res.json(blogs);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.json({
                error: 'Server error'
            });
        }
    });
});

// Create Blog
// This will create Blog, 
// if validation error occure than 400 error will through,
// and if any server error occured than through 500
router.post('/', passport.authenticate('bearer', { session: false }), function (req, res) {

    var blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        images: req.body.images
    });

    blog.save(function (err) {
        if (!err) {
            log.info('New Blog created with id: %s', blog.id);
            return res.json({
                status: 'OK',
                blog: blog
            });
        } else {
            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;

                log.error('Internal error(%d): %s', res.statusCode, err.message);

                res.json({
                    error: 'Server error'
                });
            }
        }
    });
});


// Get Blog using ID
// If Blog not found = 404
// and if any server error occured than through 500
router.get('/:id', passport.authenticate('bearer', { session: false }), function (req, res) {

    Blog.findById(req.params.id, function (err, blog) {

        if (!blog) {
            res.statusCode = 404;

            return res.json({
                error: 'Not found'
            });
        }

        if (!err) {
            return res.json({
                status: 'OK',
                blog: blog
            });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });
});

// Update Blog
// FindById method find the Blog in DB if exist than it will show to update the Blog else through error
// After updating if validation won't be successful than through 404 
// and if any server error occured than through 500
router.put('/:id', passport.authenticate('bearer', { session: false }), function (req, res) {
    var blogId = req.params.id;

    Blog.findById(blogId, function (err, blog) {
        if (!blog) {
            res.statusCode = 404;
            log.error('Blog with id: %s Not Found', articleId);
            return res.json({
                error: 'Not found'
            });
        }

        blog.title = req.body.title;
        blog.description = req.body.description;
        blog.author = req.body.author;
        blog.images = req.body.images;

        blog.save(function (err) {
            if (!err) {
                log.info('Blog with id: %s updated', blog.id);
                return res.json({
                    status: 'OK',
                    blog: blog
                });
            } else {
                if (err.name === 'ValidationError') {
                    res.statusCode = 400;
                    return res.json({
                        error: 'Validation error'
                    });
                } else {
                    res.statusCode = 500;

                    return res.json({
                        error: 'Server error'
                    });
                }
                log.error('Internal error (%d): %s', res.statusCode, err.message);
            }
        });
    });
});

module.exports = router;