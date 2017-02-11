common.controller('ToolbarController', ['$rootScope', '$scope', '$state', 'States', 'AuthService', '$http', '$window',
    'Users', 'StateService',
    function($rootScope, $scope, $state, States, AuthService, $http , $window, Users, StateService) {
        console.log("header controller");
        var self = this;
        self.hideAccountPopOver = true;

        self.init = function() {
            self.changeIconsOnStateChange();
            $scope.isLoggedIn = ($window.localStorage.getItem('token') !== null);
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

                AuthService.isLoggedIn().getToken().then(function(token) {
                    console.log("token : " + token);
                    $window.localStorage.setItem('token' , token);
                    $scope.$apply( function() {
                        $scope.isLoggedIn = true;
                    });

                    new Users().$create().then(function(response) {

                        var data = response.data;
                        console.log("User post response " + JSON.stringify(data));
                        AuthService.setUser(data);

                        if(response.status === 201) {
                            StateService.toOnBoardingPage();
                        }

                    }, function(error) {
                        console.log("Failed to post user data" + JSON.stringify(error));
                        if(error.status === 409) {
                            //load feeds
                            console.log("load feeds");
                        }
                    });
                    console.log("isLoggedIn " + $scope.isLoggedIn);
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
            $window.localStorage.removeItem('token');
            AuthService.logout();
            $scope.isLoggedIn = false;
        };

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            self.changeIconsOnStateChange();
        });

        self.init();
    }
]);
