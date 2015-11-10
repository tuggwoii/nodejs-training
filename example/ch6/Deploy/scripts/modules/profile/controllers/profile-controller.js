'use strict';
app.controller('ProfileController', ['$scope', 'ProfileService', 'ConnectionService', function ($scope, ProfileService, ConnectionService) {

    $scope.startUp = function () {
        $scope.isEdit = false;
        $scope.isConnec = false;
        $scope.isNotConnect = false;
        $scope.isError = false;
        $scope.newSkill = {};
        $scope.validate = {};

        ProfileService.getProfile().success(function (response) {
            console.log(response);
            $scope.model = response;
        }).error(function () {
            $scope.model = { };
        });
    };

    $scope.edit = function () {
        $scope.isEdit = true;
        $scope.validate = {};
        $scope.cloneModel = angular.copy($scope.model);
    };

    $scope.cancel = function () {
        $scope.model = angular.copy($scope.cloneModel);
        $scope.isEdit = false;
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

    $scope.addSkill = function (e) {
        if (e.keyCode === 13) {
            if ($scope.newSkill.value) {
                $scope.model.Skills.push({ Skill: $scope.newSkill.value, Id: 0 });
                $scope.newSkill.value = '';
            }
        }
    };

    $scope.removeSkill = function (index) {
        $scope.model.Skills.splice(index, 1);
    };

    $scope.removeConnectionMessage = function () {
        $scope.isConnection = false;
    };

    $scope.save = function () {
        if ($scope.validateModel()) {
            ProfileService.saveProfile($scope.model).success(function () {
                $scope.isEdit = false;
            }).error(function () {
                $scope.isError = true;
            });
        }
    };

    $scope.removeErrorMessage = function () {
        $scope.isError = false;
    };

    $scope.validateModel = function () {
        var isValid = true;
        if (!$scope.model.Name) {
            $scope.validate.name = 'invalid';
            isValid = false;
        }
        else {
            $scope.validate.name = '';
        }
        if (!$scope.model.Email) {
            $scope.validate.email = 'invalid';
            isValid = false;
        }
        else {
            $scope.validate.email = '';
        }
        if (!$scope.model.Telephone) {
            $scope.validate.telephone = 'invalid';
            isValid = false;
        }
        else {
            $scope.validate.telephone = '';
        }
        return isValid;
    };

    $scope.$on('onEdit', $scope.edit);

    $scope.startUp();
}]);
