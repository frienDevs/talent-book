app_module.controller('AppController', ['$scope', '$state', 'States', 'UserDetailsService', '$window',
    function($scope, $state, States, UserDetailsService, $window) {
        console.log("app controller");
        var self = this;
        console.log("$state.current.name : " + $state.current.name);
        console.log("States.SLASH.ROOT : " + States.SLASH.ROOT);
        if ($state.current.name === States.SLASH.ROOT) {
            self.isRoot = true;
        } else {
            self.isRoot = false;
        }
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

        // if (UserDetailsService.isUserLoggedIn()) {
        // 	if (UserDetailsService.isRootSuperAdmin())
        // $state.go(States.CLIENT.ROOT);
        // 	else
        // 			$state.go(States.CLIENT.ROOT);
        // 	} else {
        //		$state.go(States.LOGIN);
        // }

        $scope.$on('onUserAuthChanged', function (event, isLoggedIn) {
            console.log("onUserAuthChanged");
            self.isLoggedIn = isLoggedIn;
        });
    }
]);
