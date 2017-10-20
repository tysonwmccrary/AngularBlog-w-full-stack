angular.module('myblog', ['ngRoute', 'ngResource', 'myblog.controllers', 'myblog.factories'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'views/list.html',
                controller: 'PostListController'
            })
            .when('/compose', {
                templateUrl: 'views/compose_view.html',
                controller: 'ComposePostController'
            })
            .when('/:id/update', {
                templateUrl: 'views/update_view.html',
                controller: 'UpdatePostController'
            })
            .when('/:id', {
                templateUrl: 'views/single_view.html',
                controller: 'SinglePostController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);