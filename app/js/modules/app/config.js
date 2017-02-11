var app_module = angular.module('app.module', ['app.common']);
app_module.config(['$stateProvider', '$locationProvider', 'States', '$urlRouterProvider',
    function($stateProvider, $locationProvider, States, $urlRouterProvider) {
        $stateProvider.state(States.SLASH.ROOT, {
            url: '/',
            controller: 'AppController',
            templateUrl: '/js/modules/app/views/app.html'
        });
    }
]);
