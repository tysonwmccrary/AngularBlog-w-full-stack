angular.module('myblog.controllers', [])
    .controller('PostListController', ['$scope', 'Post', function ($scope, Post) {
        $scope.posts = Post.query();
    }])
    .controller('SinglePostController', ['$scope', '$routeParams', '$location', 'Post', function ($scope, $routeParams, $location, Post) {
        $scope.post = Post.get({ id: $routeParams.id });

        $scope.edit = function () {
            $location.path('/' + $routeParams.id + '/update');
        }

        $scope.delete = function () {
            if (confirm('Are you sure you want to delete?')) {
                $scope.post.$delete(function () {
                    $location.replace().path('/'); //When successful send back to home page.
                });                              //This is replaced so it can not go back in histroy.
            }
        }
    }])
    //use resouse to get data to be used in select boxes
    .controller('ComposePostController', ['$scope', 'Post', 'Category', 'User', '$location', function ($scope, Post, Category, User, $location) {
        $scope.users = User.query();  //Uses the factories to recieve information from database.
        $scope.categories = Category.query();

        //The object is post from the ng-model, which is the data sending to the database.
        //This object is made a variable to contain all columns in the Post tables.
        $scope.save = function () {
            var p = new Post($scope.post);
            alert('Content is posted!');
            p.$save(function () {
                $location.path('/');
            }, function (error) {
                console.log(error);
            });
        }
    }])
    .controller('UpdatePostController', ['$scope', 'Post', 'Category', '$location', '$routeParams', function ($scope, Post, Category, $location, $routeParams) {
        $scope.categories = Category.query();
        $scope.post = Post.get({ id: $routeParams.id }, function () {
            $scope.post.categoryid = String($scope.post.categoryid);  //This code is used to make the categoryid number equal a string for the value in select box for the ng-model.
        });

        $scope.save = function () {
            $scope.post.$update(function () {
                $location.replace().path('/' + $routeParams.id);
            });
        }
    }])
//This used for frontend login.
.controller('LoginController', ['$scope', 'UserService', '$location', function ($scope, UserService, $location) {
    UserService.me().then(function () {
        redirect();
    });

    $scope.login = function () {
        UserService.login($scope.email, $scope.password)
            .then(function () {
                redirect();
            }, function (err) {
                console.log(err);
            });
    }

    function redirect() {
        var dest = $location.search().dest;
        if (!dest) { dest = '/'; }
        $location.replace().path(dest).search('dest', null);
    }
}])
    .controller('UserListController', ['$scope', 'User', function ($scope, User) {
        $scope.users = User.query();

        $scope.createUser = function () {
            var u = new User($scope.newUser);
            u.$save(function () {
                $scope.newUser = {};  //Clear out the fields once its created.
                $scope.users = User.query();  //Returns the list of the user once account is created.
            });
        }
    }])