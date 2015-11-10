app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

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
      })
	  .state('angularjs', {
          url: "/angularjs",
          templateUrl: "views/partials/angularjs.html",
	  }).state('database', {
	      url: "/database",
	      templateUrl: "views/partials/database.html",
	  }).state('restful', {
	      url: "/restful",
	      templateUrl: "views/partials/restful.html",
	  });
});