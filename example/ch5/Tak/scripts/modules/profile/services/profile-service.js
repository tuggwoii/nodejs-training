'use strict';
app.factory('ProfileService', ['$rootScope', '$http', function ($rootScope, $http) {

    return {
        getProfile: function () {
            return $http.get('api/getProfile/1');
        },
        triggerEdit: function () {
            $rootScope.$broadcast('onEdit');
        }
    };
}]);
