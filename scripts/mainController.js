(function() {
    function mainController($scope, githubDataService) {

        $scope.inputChange = function() {
            githubDataService.getUser($scope.userNameSearch).then(function(response){$scope.user = response.data;});
        }
    }

    var app = angular.module('app');
    app.controller('mainController', ['$scope', 'githubDataService', mainController]);
})();