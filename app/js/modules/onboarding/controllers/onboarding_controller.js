onboarding.controller('OnBoardingController', ['$scope', '$state', 'States', 'UserDetailsService', '$http', 'StateService',
    'notificationService',
    function($scope, $state, States, UserDetailsService, $http, StateService, notificationService) {
        console.log("onboarding controller");
        var self = this;

        self.update = function() {
          console.log("user data " + JSON.stringify(self.user));

            $http({
                method: 'PUT',
                url: '/api/users/' + self.user.uid,
                data: JSON.stringify(self.user)
            }).then(function successCallback(response) {
                console.log("successfully updated user details");
                StateService.toFeedsPage();
            }, function errorCallback(response) {
                notificationService.showToast("Failed updated user details");
            });
        };

        self.init = function() {
            self.user = UserDetailsService.getUser();
            self.user.interests = [];
        };

        self.init();
    }
]);
