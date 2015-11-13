(function() {
    function githubDataService($http) {
        var baseUrl = 'api.github.com/';

        this.getUser = function(userName) {
            return $http.get(baseUrl + 'users/' + userName);
        }
    }

    angular.module('app').service('githubDataService', ['$http', githubDataService]);
})();