angular.module('app.feeds').controller('CreatePostController', ['$scope', '$state',
    'States', '$http', 'UserDetailsService', 'notificationService',
    function($scope, $state, States, $http, UserDetailsService, notificationService) {
        console.log("create post controller");
        var self = this;

        self.reset = function() {
            self.post = {};
            self.post.type = "";
            self.expand = false;
        };

        self.createPost = function() {
            console.log("create post");
            self.reset();
            self.expand = !self.expand;
        };

        self.reset();

        self.isTypeDefined = function() {
            return self.type !== "";
        };

        self.submitPost = function() {
            self.post.uid = UserDetailsService.getUId();
            $http({
                url: '/api/posts',
                method: "POST",
                data: self.post
            }).then(function(response) {
                notificationService.showToast("Post created successfully!!");
                self.reset();
            }, function(response) {
                notificationService.showToast("Error while creating post. Try again.");
            });
        };
    }
]);
