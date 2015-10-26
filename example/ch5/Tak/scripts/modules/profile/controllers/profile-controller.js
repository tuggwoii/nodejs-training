'use strict';
app.controller('ProfileController', ['$scope', 'ProfileService', 'ConnectionService', function ($scope, ProfileService, ConnectionService) {


    $scope.startUp = function () {
        $scope.isEdit = false;
        $scope.isConnec = false;
        $scope.isNotConnect = false;
        ProfileService.getProfile().success(function (response) {
            $scope.model = response;
        }).error(function () {
            $scope.model = { };
        });
    };

    $scope.edit = function () {
        $scope.isEdit = true;
    };

    $scope.checkConnection = function () {
        ConnectionService.checkConnection().success(function (response) {
            if (response.isSuccess) {
                $scope.isConnection = true;
            }
            else {
                $scope.isNotConnect = true;
            }
        }).error(function () {
            $scope.isNotConnect = true;
        });
    };

    $scope.removeConnectionMessage = function () {
        $scope.isConnection = false;
    };

    $scope.$on('onEdit', $scope.edit);

    $scope.startUp();
}]);
