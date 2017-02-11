app_module.controller('AppController', ['$scope', '$state', 'States', 'UserDetailsService',
    function($scope, $state, States, UserDetailsService) {
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

        // if (UserDetailsService.isUserLoggedIn()) {
        // 	if (UserDetailsService.isRootSuperAdmin())
        // $state.go(States.CLIENT.ROOT);
        // 	else
        // 			$state.go(States.CLIENT.ROOT);
        // 	} else {
        //		$state.go(States.LOGIN);
        // }
    }
]);
