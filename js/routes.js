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
      .state('webserver', {
          url: "/webserver",
          templateUrl: "/views/partials/web-server.html"
      })
      .state('webproject', {
          url: "/webproject",
          templateUrl: "views/partials/web-project.html",
      });
});