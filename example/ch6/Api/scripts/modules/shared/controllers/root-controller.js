'use strict';
app.controller('RootController', ['$scope', 'ProfileService', function ($scope, ProfileService) {

    $scope.onEditClick = function () {
        ProfileService.triggerEdit();
    };

}]);
