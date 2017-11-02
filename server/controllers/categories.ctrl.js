var express = require('express');
var procedures = require('../procedures/categories.proc.js');

var router = express.Router();

//The actual route to api/categories.
router.route('/')
    .get(function (request, response) {
        procedures.all()
            .then(function (categories) {
                response.send(categories);
            }).catch(function (error) {
                console.log(error);
                response.sendStatus(500);
            });
    })
    .post(function (request, response) {
        var p = request.body;
        procedures.create(p.name)
            .then(function (id) {
                response.status(201).send(id);
            }).catch(function (error) {
                console.log(error);
                response.sendStatus(500);
            });
    });

module.exports = router;