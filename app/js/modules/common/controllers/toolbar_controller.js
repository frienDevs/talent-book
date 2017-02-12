common.controller('ToolbarController', ['$rootScope', '$scope', '$state', 'States', 'AuthService', '$http', '$window',
    'Users', 'StateService', 'UserDetailsService', '$cookies',
    function($rootScope, $scope, $state, States, AuthService, $http , $window, Users, StateService, UserDetailsService, $cookies) {
        console.log("header controller");
//        console.log(UserDetailsService.getUserEmail());
        var self = this;
        self.hideAccountPopOver = true;

        self.init = function() {
            self.changeIconsOnStateChange();
            self.isLoggedIn = UserDetailsService.isUserLoggedIn();
            self.user = UserDetailsService.getUser();
        };

        self.changeIconsOnStateChange = function() {
            console.log($state.current.name);
            var state = $state.current.name;
            if (state === States.LOGIN) {
                self.hideAccountPopOver = true;
            } else {
                self.hideAccountPopOver = false;
            }
        };

        self.logout = function() {
            console.log("logging out");
            //localStorage.removeItem('token');
            self.hideAccountPopOver = true;
            localStorage.removeItem('user');
            UserDetailsService.removeUser();
            AuthService.logout();
            StateService.toRootPage();
            $rootScope.$broadcast("onUserAuthChanged", false);
        };

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            self.changeIconsOnStateChange();
        });

        $scope.$on('onUserAuthChanged', function (event, isLoggedIn) {
            console.log("onUserAuthChanged");
            self.isLoggedIn = isLoggedIn;
        });

        self.init();
    }
]);
