angular.module('myblog', ['ngRoute', 'ngResource', 'myblog.controllers', 'myblog.factories', 'myblog.services'])

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
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/users', {
                templateUrl: 'views/user_list.html',
                controller: 'UseListController',
                requiresLogin: true,
                requiresAdmin: true
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
    }])

    //This is used to use events of the log in and log out functions.
    .run(['$rootScope', '$location', 'UserService', function ($rootScope, $location, UserService) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, previousRoute) {
        if (nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()) {  //If on log in page and and not logged in, redirect to login page/same page until logged in.
            event.preventDefault();
            UserService.loginRedirect();
        } else if (nextRoute.$$route.requiresAdmin && !UserService.isAdmin()) {  //If required to be admin but dont have access, send back to home page.  Only admin proceed.
            event.preventDefault();
            $location.replace().path('/');
        }
    });
}]);