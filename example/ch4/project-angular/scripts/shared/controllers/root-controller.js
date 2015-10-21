app.controller('RootController', ['$scope', '$element', '$timeout', function ($scope, $element, $timeout) {
    console.log($element.html());
    console.log($scope);
    $scope.menuView = 'views/partials/nav.html';
    $scope.show = false;

    $scope.user = {
        name: 'test',
        email: 'test@test'
    };

    $timeout(function () {
        $scope.user.name = 'Tak';
    }, 3000);

    $scope.clicked = function () {
        $scope.user.name = 'Pongpang';
        $scope.show = true;
    };

    $scope.changed = function () {
        console.log('a');
    }

    //$scope.b = { arr: ['a', 'b', 'b'] };

    $scope.mylist = [];
    $scope.mylist.push({ name: 'a' });
    $scope.mylist.push({ name: 'b' });
    $scope.mylist.push({ name: 'c' });

    
}]);