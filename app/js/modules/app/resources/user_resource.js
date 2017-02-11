app_module.factory('Users', ['$resource', function ($resource) {
    return $resource('/api/users', {}, {
        query: {
            method: 'GET',
            isArray: true,
            cancellable: true
        },
        create: {
            method: 'POST'
        },
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE'
        }
    });
}]);
