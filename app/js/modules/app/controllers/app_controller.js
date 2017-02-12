app_module.controller('AppController', ['$rootScope', '$scope', '$state', 'States', 'UserDetailsService', '$window', '$sce', '$http', 'AuthService',
    function($rootScope, $scope, $state, States, UserDetailsService, $window, $sce, $http, AuthService) {
        console.log("app controller");
        var self = this;
        console.log("$state.current.name : " + $state.current.name);
        console.log("States.SLASH.ROOT : " + States.SLASH.ROOT);
        self.isRoot = false;

        self.isLoggedIn = UserDetailsService.isUserLoggedIn();
        console.log($state.current.name);

        self.topTalents = [
            {
                photoUrl: "resources/dummy/images/puppy.jpg",
                name: "Prakash Vadrevu"
            },
            {
                photoUrl: "resources/dummy/images/puppy.jpg",
                name: "Kanaiah Kothalikar"
            },
            {
                photoUrl: "resources/dummy/images/puppy.jpg",
                name: "Nagendra Varma"
            }
        ];

        self.getUserDetails = function(arr) {
            angular.forEach(arr, function(value, key){
                $http.get('/api/users/'+value.uid).then(function(response){
                    console.log("trending posts : " + JSON.stringify(response));
                    value.user = response.data;
                }, function(error){
                    console.log("error : " + JSON.stringify(error));
                }) ;
            });
        };

        self.getTrendingPosts = function() {
            self.posts = [];
            console.log("getTrendingPosts : entered");
            $http.get('/api/posts/trending').then(function(response){
                console.log("trending posts : " + JSON.stringify(response));
                self.posts = response.data;
                self.getUserDetails(response.data);
            }, function(error){
                console.log("error : " + JSON.stringify(error));
            }) ;
        };

        self.getLatestPosts = function(){
            self.posts = [];
            console.log("getLatestPosts : entered");
            $http.get('/api/posts/latest').then(function(response){
                console.log("latest posts : " + JSON.stringify(response));
                self.posts = response.data;
                self.getUserDetails(response.data);
            }, function(error){
                console.log("error : " + JSON.stringify(error));
            });
        };

        self.embeddedUrl = function(url) {
            return $sce.trustAsResourceUrl(url);
        };

        // if (UserDetailsService.isUserLoggedIn()) {
        // 	if (UserDetailsService.isRootSuperAdmin())
        // $state.go(States.CLIENT.ROOT);
        // 	else
        // 			$state.go(States.CLIENT.ROOT);
        // 	} else {
        //		$state.go(States.LOGIN);
        // }

        $scope.loginWithFacebook = function() {
            AuthService.login();
        };


        $scope.$on('onUserAuthChanged', function (event, isLoggedIn) {
            console.log("onUserAuthChanged");
            self.isLoggedIn = isLoggedIn;
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            self.updateStatus(toState);

        });

        self.updateStatus = function(state) {
            if ( state.name === States.SLASH.ONBOARDING) {
                self.isRoot = true;
            } else {
                self.isRoot = false;
            }
        };

        self.updateStatus($state.current);
        self.getTrendingPosts();
    }
]);
