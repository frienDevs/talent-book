common.factory('AuthService', AuthService);

AuthService.$inject = ['$firebaseAuth', '$window'];

function AuthService($firebaseAuth, $window) {
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
        return firebaseAuthObject.$signInWithPopup('facebook');
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