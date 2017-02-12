app_module
    .service("StateService", ['$state', 'States', function ($state, States) {

        this.toOnBoardingPage = function () {
            $state.go(States.SLASH.ONBOARDING);
        };

        this.toFeedsPage = function () {
            $state.go(States.SLASH.ROOT);
        };

        this.toRootPage = function () {
            $state.go(States.SLASH.ROOT);
        };

        this.getCurrentState = function () {
            return $state.$current.name;
        };

        this.reload = function(params) {
            $state.go(this.getCurrentState(), params);
        };

    }
    ]);
