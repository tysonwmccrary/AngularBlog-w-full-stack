//Factories create the variables of post, user, and category.
angular.module('myblog.factories', [])

    .factory('Post', ['$resource', function ($resource) {
        return $resource('/api/posts/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }])

    .factory('User', ['$resource', function ($resource) {
        return $resource('api/users/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }])

    .factory('Category', ['$resource', function ($resource) {
        return $resource('api/categories/', { id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    }])