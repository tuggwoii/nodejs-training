'use strict';
app.factory('ConnectionService', ['$http', function ($http) {
    return {
        checkConnection: function () {
            return $http.get('/api/connection');
        }
    };
}]);
