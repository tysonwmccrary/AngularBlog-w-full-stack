var express = require('express');
var posts = require('./controllers/posts.ctrl.js');
var users = require('./controllers/users.ctrl.js');
var categories = require('./controllers/categories.ctrl.js');

var router = express.Router();


router.use('/posts', Posts);
router.use('/users', users);
router.use('/categories', categories);

module.exports = router;