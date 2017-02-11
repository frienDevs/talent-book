var app = angular.module('appModule', ['ngMaterial', 'ngCookies', 'ui.router',
    'app.module', 'app.common', 'app.feeds', 'app.posts', 'app.onboarding', 'md.data.table', 'nsPopover',
    'angular-loading-bar', 'ngAnimate', 'firebase', 'ngResource'
]);

app.config(['$stateProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', 'States',
    'cfpLoadingBarProvider',
    function($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider, States,
        cfpLoadingBarProvider) {
        // Ignores trialing slashes, for example treats both /cli and /cli/ as same
        $urlMatcherFactoryProvider.strictMode(false);

        $locationProvider.html5Mode(true);
        cfpLoadingBarProvider.includeSpinner = false;
    }
]);

//Google chart settings
app.value('googleChartApiConfig', {
    version: '1.1',
});

app.constant('_',
    window._
);

app.config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('appDark')
        .primaryPalette('blue', {
            'default': '500',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        }).accentPalette('deep-orange', {
            'default': '500',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        }).warnPalette('red', {
            'default': '500',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        });

    $mdThemingProvider.theme('appLight')
        .primaryPalette('green', {
            'default': '600',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        }).accentPalette('light-blue', {
            'default': '600',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        }).warnPalette('red', {
            'default': '500',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        });


    var neonRedMap = $mdThemingProvider.extendPalette('orange', {
        '500': '#FF9800',
        'contrastDefaultColor': 'light'
    });

    // Register the new color palette map with the name <code>neonRed</code>
    $mdThemingProvider.definePalette('neonRed', neonRedMap);

    $mdThemingProvider.theme('talent')
        .primaryPalette('neonRed')
        .accentPalette('indigo', {
            'default': '600',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        }).warnPalette('red', {
            'default': '500',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        }).backgroundPalette('grey');

    $mdThemingProvider.setDefaultTheme('talent');
}]);

app.config(['$httpProvider', function ($httpProvider) {

    /*var initInjector = angular.injector(["ng"]);
    var $window = initInjector.get("$window");*/

    var token = localStorage.token;
    console.log("Adding token header " + token);
    $httpProvider.defaults.headers.common['auth-token'] = token;

}]);
