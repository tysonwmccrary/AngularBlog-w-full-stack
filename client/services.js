angular.moduel('myblog.services', [])

    .service('UserService', ['$http', '$location', function ($http, $location) {
        var currentUser;

        this.isLoggedIn = function () {
            if (currentUser) {
                return true;
            } else {
                return false;
            }
        }

        this.isAdmin = function () {
            if (currentUser && currentUser.role === 'admin') {
                return true;
            } else {
                return false;
            }
        }

        //If current user and is admin give the apporiate credentials.
        this.isAdmin = function() {
            if (currentUser && currentUser.role === 'admin') {
                return true;
            } else {
                return false;
            }
        }

        this.loginRedirect = function () { //This used to direct the user once the correct user information is login in.
            var current = $location.path();
            $location.replace().path('/login').search('dest', current);
        }

        this.login = function (email, password) {
            return $http({
                method: 'POST',
                url: '/api/users/login',
                data: { email: email, password: password }
            }).then(function (response) {
                currentUser = response.data;
                return currentUser;
            });
        }

        this.logout = function () {
            return $http({
                method: 'GET',
                url: '/api/users/logout'
            }).then(function () {
                currentUser = undefined;
            });
        }

        //Create an endpoint in the api.js
        //If the promise is true of the currentuser continue or ask for the user to use its credentials.
        this.me = function () {
            if (currentUser) {
                return Promise.resolve(currentUser);
            } else {
                return $http({
                    method: 'GET',
                    url: '/api/users/me'
                }).then(function (response) {
                    currentUser = response.data;
                    return currentUser;
                });
            }
        }
    }]);