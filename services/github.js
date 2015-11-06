(function() {
    function github($http) {
        var userBaseUrl = "https://api.github.com/users/";

        function getUser(username) {
            return $http.get(userBaseUrl + username)
                .then(function(response) {
                    return response.data;
                });
        }

        function getRepos(user) {
            return $http.get(user.repos_url)
                .then(function(response) {
                    return response.data;
                });
        }

        return {
            getUser: getUser,
            getRepos: getRepos
        };
    }

    var module = angular.module("app");
    module.factory('github', github);
})();
