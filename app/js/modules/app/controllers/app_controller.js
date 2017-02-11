app_module.controller('AppController', ['$scope', '$state', 'States',
    function($scope, $state, States) {
        console.log("app controller");

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
