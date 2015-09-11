
var contactsApp = angular.module('contactsApp', []);

contactsApp.controller('ContactsController', function ($scope, Contact) {
    $scope.message = '';
    $scope.user = {};

    // todo: Use a form with validations for email ... etc | userform.email.$error

    $scope.save = function () {
        console.log($scope.user);
        $scope.message = '';

        Contact.save($scope.user).success(function (data) {
            console.log(data);
            $scope.message = 'User saved.';
            $scope.user = {};
        }).error(function (data) {
            console.log(data);
        });


    };

    $scope.list = function () {
        Contact.getAll().success(function (data) {
            $scope.contacts = data.results;
        });
    };
});

contactsApp.factory('Contact', function ($http) {
    return {
        // Behaves as the Contact Service
        save: function (user) {
            return $http.post('/contacts', user); // $http.post returns a promise
        },
        getAll: function () {
            return $http.get('/contacts');
        }
    };
});
