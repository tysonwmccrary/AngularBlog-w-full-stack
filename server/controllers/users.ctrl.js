var express = require('express');
var procedures = require('../procedures/users.proc.js');

var router = express.Router();

//The actual route to api/users.
router.route('/')
    .get(function (request, response) {
        procedures.all()
            .then(function (users) {
                response.send(users);
            }).catch(function (error) {
                console.log(error);
                response.sendStatus(500);
            });
    });

module.exports = router;