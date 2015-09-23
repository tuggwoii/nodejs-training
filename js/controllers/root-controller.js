app.controller('RootController', function($scope) {
    
    $scope.menu = [
        { title: 'Home', url:'#/', active: false },
        { title: 'CH 1: Get started', url:'#/getstarted', active: false },
        { title: 'CH 2: -', url:'/', active: false },
        { title: 'CH 3: -', url:'/', active: false },
        { title: 'CH 4: -', url:'/', active: false }
    ];
    
    $scope.startUp = function () {
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
