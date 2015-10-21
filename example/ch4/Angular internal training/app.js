angular.module('directive', [])

.controller('MyModalCtrl', function ($scope, $log) {
    $scope.inheriteable = 'parentScope';
    $log.info('inherite data' ,$scope.inheriteable);

    $scope.options = {
        modalName: 'myModal',
        buttonName: 'Simple modal',
        title: 'Simple modal',
        detail: 'Lable from parent',
        messageFromParent: 'waiting for implement'
    };

    $scope.onSubmit = function () {
        alert($scope.twoWay);
    }

    $scope.kittySubmit = function () {
        alert('Hello Kitty');
    }
})

.directive('myModal', function ($log) {
    return {
        restrict: 'A',
        templateUrl: 'modal.html',
        link: function (scope, element, attrs) {
            $log.info('inherite data', scope.inheriteable);
        }
    };
})

.directive('myIsolateModal', function ($log) {
    return {
        restrict: 'A',
        templateUrl: 'modal.html',
        scope: {
            messageFromParent: '@messageFromParent',
            onSubmit: '=onSubmit'
        },
        link: function (scope, element, attrs) {
            $log.info('inherite data', scope.inheriteable);

            scope.options = {
                modalName: 'myIsolateModal',
                buttonName: 'Isolate scope',
                title: 'Isolate modal',
                detail: 'Lable from child',
                messageFromParent: scope.messageFromParent
            };
        }
    };
});