angular.module('app.feeds').controller('CreatePostController', ['$scope', '$state',
    'States', '$http', 'UserDetailsService', 'notificationService',
    function($scope, $state, States, $http, UserDetailsService, notificationService) {
        console.log("create post controller");
        var self = this;

        self.reset = function() {
            self.post = {};
            self.post.tags = [];
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

        self.setType = function(type){
            self.post.type = type;
            self.expand = true;
        };

        function getParameterByName(name, url) {
            if (!url) {
              url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        self.submitPost = function() {
            self.post.uid = UserDetailsService.getUId();

            if (self.post.type === "VIDEO") {
                if (self.post.url.indexOf("youtube.com") !== -1) {
                    var url = "https://www.youtube.com/embed/";
                    var video_id = getParameterByName("v", self.post.url);
                    self.post.url = url+video_id;
                }
            }

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
