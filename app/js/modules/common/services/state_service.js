app_module
    .service("StateService", ['$state', 'States', function ($state, States) {

        this.toOnBoardingPage = function () {
            $state.go(States.SLASH.ONBOARDING);
        };

    }
    ]);
