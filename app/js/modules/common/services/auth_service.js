common.factory('AuthService', AuthService);

AuthService.$inject = ['$firebaseAuth', '$window', 'UserDetailsService', '$cookies', '$rootScope', '$http', 'StateService'];

function AuthService($firebaseAuth, $window, UserDetailsService, $cookies, $rootScope, $http, StateService) {
    var firebaseAuthObject = $firebaseAuth();

    var service = {
        firebaseAuthObject: firebaseAuthObject,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        getCurrentUser: getCurrentUser,
        getToken: getToken
    };

    return service;


    function login() {

        console.log("login with facebook");
        firebaseAuthObject.$signInWithPopup('facebook').then(function(result) {
            console.log("Signed in as:", result.user.uid);
            //console.log("Signed in as:", JSON.stringify(result.user));

            isLoggedIn().getToken().then(function(token) {
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
                    $rootScope.$broadcast("onUserAuthChanged", true);
                    UserDetailsService.setUser(data);

                    if(response.status === 201) {
                        StateService.toOnBoardingPage();
                    } else {
                        StateService.toFeedsPage();
                    }
                }, function errorCallback(response) {

                });
            });

        }).catch(function(error) {
            console.error("Authentication failed:", error);
        });
    }

    function logout() {
        //partyService.reset();
        firebaseAuthObject.$signOut();
    }

    function isLoggedIn() {
        return firebaseAuthObject.$getAuth();
    }


    function getCurrentUser() {
        return firebaseAuthObject.user;
    }

    function getToken() {
        return isLoggedIn().getToken();
    }

}
