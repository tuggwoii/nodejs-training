app.controller('RootController', function ($scope, MenuService) {

    $scope.menu = [];

    $scope.startUp = function () {
        $scope.menu = MenuService.getMenu();
        $scope.activeMenu();
    }
    
    $scope.activeMenu = function () {
        $scope.menu.filter(function(m) {
            if(m.url === window.location.hash) {
                m.active = true;
            }
            if(!window.location.hash) {
                $scope.menu[0].active = true;
            }
        });
    }
    
    $scope.menuClick = function (menu) {
        $scope.menu.filter(function(m) {
            m.active = false;
        });
        menu.active = true;
    }
    
    $scope.startUp();
});
