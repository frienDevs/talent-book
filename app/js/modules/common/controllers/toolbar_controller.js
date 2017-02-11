common.controller('ToolbarController', ['$rootScope', '$scope', '$state', 'States', 'AuthService', '$http', '$window',
    'Users', 'StateService', 'UserDetailsService', '$cookies',
    function($rootScope, $scope, $state, States, AuthService, $http , $window, Users, StateService, UserDetailsService, $cookies) {
        console.log("header controller");
//        console.log(UserDetailsService.getUserEmail());
        var self = this;
        self.hideAccountPopOver = true;

        self.init = function() {
            self.changeIconsOnStateChange();
            $scope.isLoggedIn = UserDetailsService.isUserLoggedIn();
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

        $scope.loginWithFacebook = function() {
            console.log("login with facebook");
            AuthService.login().then(function(result) {
                console.log("Signed in as:", result.user.uid);
                //console.log("Signed in as:", JSON.stringify(result.user));
                $rootScope.$broadcast("onUserAuthChanged", true);

                AuthService.isLoggedIn().getToken().then(function(token) {
                    $cookies.put('auth-token', token);
                    localStorage.setItem('token' , token);
                    //console.log("token : " + token);

                    $http({
                         method: 'POST',
                         url: '/api/users'
                         }).then(function successCallback(response) {
                            var data = response.data;
                            //console.log("User post response " + JSON.stringify(data));
                            localStorage.setItem("user", JSON.stringify(data));
                            UserDetailsService.setUser(data);

                            if(response.status === 201) {
                                StateService.toOnBoardingPage();
                            } else {
                                StateService.toFeedsPage();
                            }
                         }, function errorCallback(response) {
                            /*if(response.status === 409) {
                                //load feeds
                                console.log("load feeds");
                                StateService.toFeedsPage();
                            }*/

                    });
                });

            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });



        };

        $scope.ping = function() {
            /*$http({
                method: 'POST',
                url: 'http://192.171.3.1:3000/api/users'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log("ping response " + JSON.stringify(response));
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("ping response " + JSON.stringify(error));
            });*/

           /* $http({
                method: 'POST',
                url: '/api/users'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log("ping response " + JSON.stringify(response));
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("ping response " + JSON.stringify(response));
            });*/
        };


        $scope.logout = function() {
            console.log("logging out");
            //localStorage.removeItem('token');
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
            $scope.isLoggedIn = isLoggedIn;
        });

        self.init();
    }
]);
