//Use from database.

var db = require('../config/db.js');

exports.all = function() {
    return db.rows('GetAllPosts');
}

exports.read = function(id) {
    return db.row('GetPost', [id]);
}

exports.update = function(id, title, content, categoryid) {  //When function is called this must match the order.
    return db.empty('UpdatePost', [id, title, content, categoryid]);  //This must match the parametes of the stored procedures.
}

exports.create = function (title, content, userid, categoryid) {
    return db.row('InsertPost', [title, content, userid, categoryid]);
}

exports.destroy = function(id) {
    return db.empty('DeletePost', [id]);
}