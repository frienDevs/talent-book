var onboarding = angular.module('app.onboarding', []);
onboarding.config(['$stateProvider', '$locationProvider', 'States', '$urlRouterProvider',
    function($stateProvider, $locationProvider, States, $urlRouterProvider) {
      console.log("onboarding config");
        $stateProvider.state(States.SLASH.ONBOARDING, {
            url: 'onboarding',
            controller: 'OnBoardingController',
            controllerAs: 'ctrl',
            templateUrl: '/js/modules/onboarding/views/onboarding.html'
        });
    }
]);
