'use strict';
app.factory('ProfileService', ['$rootScope', '$http', function ($rootScope, $http) {

    return {
        getProfile: function () {
            return $http.get('api/getProfile/1');
        },
        saveProfile: function (data) {
            return $http.post('api/saveProfile/1', data);
        },
        triggerEdit: function () {
            $rootScope.$broadcast('onEdit');
        }
    };
}]);
