app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
      .state('home', {
          url: "/",
          templateUrl: "/views/partials/main.html"
      })
      .state('getstarted', {
          url: "/getstarted",
          templateUrl: "/views/partials/get-started.html",
      })
      .state('state2', {
          url: "/state2",
          templateUrl: "/views/partials/state2.html"
      })
      .state('state2.list', {
          url: "/list",
          templateUrl: "views/partials/state2.list.html",
          controller: function ($scope) {
              $scope.things = ["A", "Set", "Of", "Things"];
          }
      });
});