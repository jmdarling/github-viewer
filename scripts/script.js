(function() {
    var app = angular.module('app', []);

    function MainController($scope, $http, $interval) {
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

        function decrementCountdown() {
            $scope.countdown--;
            if($scope.countdown <= 0)
                userSearch();
        }

        function startCountdown() {
            $interval(decrementCountdown, 1000, $scope.countdown);
        }

        $scope.message = "GitHub Viewer";
        $scope.username = "angular";
        $scope.repoSortOrder = "-stargazers_count";
        $scope.countdown = 5;

        $scope.search = userSearch;

        startCountdown();
    }

    app.controller('MainController', ['$scope', '$http', '$interval',MainController]);
})();
