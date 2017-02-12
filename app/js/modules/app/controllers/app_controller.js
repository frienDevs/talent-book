app_module.controller('AppController', ['$rootScope', '$scope', '$state', 'States', 'UserDetailsService', '$window', '$sce', '$http', 'AuthService',
    function($rootScope, $scope, $state, States, UserDetailsService, $window, $sce, $http, AuthService) {
        console.log("app controller");
        var self = this;
        console.log("$state.current.name : " + $state.current.name);
        console.log("States.SLASH.ROOT : " + States.SLASH.ROOT);
        self.isRoot = false;

        self.isLoggedIn = UserDetailsService.isUserLoggedIn();
        console.log($state.current.name);

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

        self.leaderboard = function() {
            self.posts = [];
            $http.get('/api/users/suggestions/top').then(function(response){
                console.log("top users : " + JSON.stringify(response));
                self.topTalents = response.data;
            }, function(error){
                console.log("error fetching top users : " + JSON.stringify(error));
            }) ;
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

        self.getDate = function(date) {
            var date = new Date(date);
            return date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
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

        self.like = function(post) {
            $http({
                method: 'POST',
                url: '/api/posts/'+post.id+'/like'
            }).then(function(response) {
                if (response.data.likes)
                    post.likes = response.data.likes;
            }, function(error){
            });
        };

        self.updateStatus = function(state) {
            if ( state.name === States.SLASH.ONBOARDING) {
                self.isRoot = true;
            } else {
                self.isRoot = false;
            }
        };

        self.updateStatus($state.current);
        self.getTrendingPosts();
        self.leaderboard();
    }
]);
