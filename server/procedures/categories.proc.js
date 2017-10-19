var db = require('../config/db.js');

exports.all = function () {
    return db.rows('GetAllCategories');
}