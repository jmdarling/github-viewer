(function() {
    function mainController($scope) {
        $scope.message = 'Hello world';
    }

    var app = angular.module('app', []);
    app.controller('mainController', ['$scope', mainController]);
})();