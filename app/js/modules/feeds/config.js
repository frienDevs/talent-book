var feeds = angular.module('app.feeds', []);
feeds.config(['$stateProvider', '$locationProvider', 'States', '$urlRouterProvider',
    function($stateProvider, $locationProvider, States, $urlRouterProvider) {
      console.log("feeds config");
        $stateProvider.state(States.SLASH.FEED, {
            url: 'feed',
            controller: 'FeedsController',
            templateUrl: '/js/modules/feeds/views/feeds.html'
        });
    }
]);
