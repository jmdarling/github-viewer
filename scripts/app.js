(function() {
    var app = angular.module('app', ['ngRoute']);

    app.config(['$routeProvider'] ,function($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: "main.html",
                controller: "MainController"
            })
            .otherwise({
                redirectTo: '/main'
            });
    });
})();