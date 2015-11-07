(function() {
    var app = angular.module('app', []);

    function MainController($scope, github, $interval, $log, $anchorScroll, $location) {


        function onUserSearchSuccess(data) {
            $scope.error = null;

            $scope.user = data;
            github.getRepos($scope.user).then(onRepoSearchSuccess, onSearchFailure);
        }

        function onRepoSearchSuccess(data) {
            $scope.repos = data;
            $location.hash('userDetails');
            $anchorScroll();
        }

        function onSearchFailure(response) {
            $scope.user = null;

            $scope.error = "Sorry, something went terribly wrong.";
        }

        function userSearch() {
            $log.info('Searching for ' + $scope.username);

            github.getUser($scope.username).then(onUserSearchSuccess, onSearchFailure);

            if(countdownInterval) {
                $interval.cancel(countdownInterval);
            }
            $scope.countdown = null;
        }

        function decrementCountdown() {
            $scope.countdown--;
            if($scope.countdown <= 0)
                userSearch();
        }

        var countdownInterval = null;
        function startCountdown() {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        }

        $scope.message = "GitHub Viewer";
        $scope.username = "angular";
        $scope.repoSortOrder = "-stargazers_count";
        $scope.countdown = 5;

        $scope.search = userSearch;

        startCountdown();
    }

    app.controller('MainController', ['$scope', 'github', '$interval', '$log', '$anchorScroll', '$location', MainController]);
})();
