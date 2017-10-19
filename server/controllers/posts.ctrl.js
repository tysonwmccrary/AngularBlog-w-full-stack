//This controls the post procedure.
//This is the get and post routes used to interact with database.

var express = require('express');
var procedures = require('../procedures/posts.proc.js');

var router = express.Router();

//The actual URL to /api/Posts
router.route('/')
    .get(function (request, response) {
        procedures.all()
            .then(function (post) {
                response.send(post);
            }).catch(function (error) {
                console.log(error);
                response.sendStatus(500);
            });
    })
    .post(function (request, response) {
        //procedures.create(request.body.title, request.body.content, request.body.userid, request.body.categoryid)
        //Use short hand
        var p = request.body;
        procedures.create(p.title, p.content, p.userid, p.categoryid)
            .then(function (id) {
                response.status(201).send(id);
            }).catch(function (error) {
                console.log(error);
                response.sendStatus(500);
            });
    });

//The actual route to api/Post/:id
router.route('/:id')
    .get(function (req, res) {
        procedures.read(req.params.id)
            .then(function (post) {
                res.send(post);
            }).catch(function (error) {
                console.log(error);
                res.sendStatus(500);
            });
    })
    .put(function (req, res) {
            var p = request.body;
        procedures.update(req.params.id, p.title, p.content, p.categoryid)
            .then(function () {
                res.sendStatus(204);
            }).catch(function (error) {
                console.log(error);
                res.sendStatus(500);
            });
    })
    .delete(function (req, res) {
        procedures.destroy(req.params.id)
            .then(function () {
                res.sendStatus(204);
            }).catch(function (error) {
                console.log(error);
                res.sendStatus(500);
            });
    });
//Make the router avaiable to all routes 
module.exports = router;  //To use this router refer to api.js