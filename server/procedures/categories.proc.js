var db = require('../config/db.js');

exports.all = function () {
    return db.rows('GetAllCategories');
}

exports.create = function (name) {
    return db.row('InsertCategory', [name]);
}