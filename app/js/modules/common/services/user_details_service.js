common.service('UserDetailsService', ['UserDetails', 'UserRoles', '$cookies',
    function(UserDetails, UserRoles, $cookies) {

        this.UserDetails = UserDetails;

        this.setUser = function(details) {
            this.UserDetails = details;
        };

        this.getUser = function() {
            return this.UserDetails;
        };


        this.setUserDetails = function(details) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $cookies.put("user", JSON.stringify(details), {
                'expires': expireDate
            });
            this.UserDetails = details;
        };

        this.isRootUser = function() {
            return this.UserDetails.isRootUser;
        };

        this.isRootSuperAdmin = function() {
            var isRootUser = this.isRootUser();
            var isSuperAdmin = this.UserDetails.user.role === UserRoles.SUPER_ADMIN;
            return isRootUser && isSuperAdmin;
        };

        this.getScopeId = function() {
            return this.UserDetails.user.scopeId;
        };

        this.getUId = function(){
            return this.UserDetails.uid;
        };

        this.getUserName = function() {
            var name = "";
            if (this.UserDetails.user.firstName) {
                name += this.UserDetails.user.firstName;
            }

            if (this.UserDetails.user.lastName) {
                name += " " + this.UserDetails.user.lastName;
            }
            return name;
        };

        this.getUserEmail = function() {
            return this.UserDetails.user.email;
        };

        this.isUserLoggedIn = function () {
            var data = $cookies.get("auth-token");
            if (data) {
                return true;
            } else {
                return false;
            }
            return false;
        };

        this.removeUser = function () {
            $cookies.remove("auth-token");
        };
    }
]);

/*function userDetailsService(UserRoles, data) {
	this.UserDetails = data;
	this.UserRoles = UserRoles;
}

userDetailsService.prototype.setUser = function(details) {
	this.UserDetails = details;
};

userDetailsService.prototype.isRootUser = function() {
	return this.UserDetails.isRootUser;
};

userDetailsService.prototype.isRootSuperAdmin = function() {
	var isRootUser = this.isRootUser();
	var isSuperAdmin = this.UserDetails.user.role === this.UserRoles.SUPER_ADMIN;
	return isRootUser && isSuperAdmin;
};

userDetailsService.prototype.getScopeId = function() {
	return this.UserDetails.user.scopeId;
};

userDetailsService.prototype.getUserName = function() {
	var name = "";
	if (this.UserDetails.user.firstName) {
		name += this.UserDetails.user.firstName;
	}

	if (this.UserDetails.user.lastName) {
		name += " "+this.UserDetails.user.lastName;
	}
	return name;
};

userDetailsService.prototype.getUserEmail = function() {
	return this.UserDetails.user.email;
};

userDetailsService.prototype.isUserLoggedIn = function() {
	if (this.UserDetails.user && this.UserDetails.user.id)
		return true;
	return false;
};*/
