(function() {
    var app = angular.module('app', []);

    function MainController($scope, $http) {
        var userBaseUrl = "https://api.github.com/users/";

        function onUserSearchSuccess(response) {
            $scope.error = null;

            $scope.user = response.data;
            repoSearch(response.data.repos_url)
        }

        function onRepoSearchSuccess(response) {
            $scope.repos = response.data;
        }

        function onSearchFailure(response) {
            $scope.user = null;

            $scope.error = "Sorry, something went terribly wrong.";
        }

        function userSearch() {
            var promise = $http.get(userBaseUrl + $scope.username);

            promise.then(onUserSearchSuccess, onSearchFailure);
        }

        function repoSearch(url) {
            var promise = $http.get(url);

            promise.then(onRepoSearchSuccess, onSearchFailure);
        }

        $scope.message = "GitHub Viewer";
        $scope.username = "angular";
        $scope.repoSortOrder = "-stargazers_count";
        $scope.search = userSearch;
    }

    app.controller('MainController', ['$scope', '$http', MainController]);
})();
