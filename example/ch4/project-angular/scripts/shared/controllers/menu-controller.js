app.controller('MenuController', ['$scope', 'MenuService', function ($scope, MenuService) {
	
	$scope.onStartup = function () {
		$scope.menu = MenuService.getMenu();
		console.log($scope.menu);
	}
	
	$scope.onStartup();

}]);