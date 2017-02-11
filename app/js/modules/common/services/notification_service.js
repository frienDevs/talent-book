common.service('notificationService', ['$mdToast',
    function($mdToast) {
        this.showToast = function(message) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(message)
                .position("bottom right")
                .hideDelay(2000)
            );
        };

    }
]);
