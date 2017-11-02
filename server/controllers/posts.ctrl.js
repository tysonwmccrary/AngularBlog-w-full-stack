//This post control file will control the post procedure.
//This is the get and post routes used to interact with database.

var express = require('express');
var procedures = require('../procedures/posts.proc.js');

var router = express.Router();

//The actual URL to /api/Posts
router.route('/')
    .get(function (request, response) { //This is the initial get request into the server.
        procedures.all()
            .then(function (post) { //Passes in the post as an array.
                response.send(post); //Sends to server in json format. 
            }).catch(function (error) {
                console.log(error);
                response.sendStatus(500); //500 is used if the information in server in not avaialble.
            });
    })
    .post(function (request, response) {
        //procedures.create(request.body.title, request.body.content, request.body.userid, request.body.categoryid)
        //Use short hand
        var p = request.body;
        procedures.create(p.title, p.content, p.userid, p.categoryid)
            .then(function (id) {
                response.status(201).send(id); //201 is used to create in server.
            }).catch(function (error) {
                console.log(error);
                response.sendStatus(500); //500 is used if the information in server in not avaialble.
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
                res.sendStatus(500); //500 is used if the information in server in not avaialble.
            });
    })
    .put(function (req, res) {
            var p = req.body;
        procedures.update(req.params.id, p.title, p.content, p.categoryid)
            .then(function () {
                res.sendStatus(204); //204 is used to change information in the server, in this case to update information.
            }).catch(function (error) {
                console.log(error);
                res.sendStatus(500); //500 is used if the information in server in not avaialble.
            });
    })
    .delete(function (req, res) {
        procedures.destroy(req.params.id)
            .then(function () {
                res.sendStatus(204); //204 is used to change information in the server in this case to delete information.
            }).catch(function (error) {
                console.log(error);
                res.sendStatus(500); //500 is used if the information in server in not avaialble.
            });
    });
//Make the router avaiable to all routes 
module.exports = router;  //To use this router refer to api.js