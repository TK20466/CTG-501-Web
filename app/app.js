var app = angular.module('ctgapp', ['ngRoute', 'ngAnimate', 'ui.blueimp.gallery', 'ngSanitize'])
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html",
        controller : "homePageController"
    })
    .when("/events", {
        templateUrl : "events.html",
        controller: "eventsController"
    })
    .when("/about", {
        templateUrl : "about.html"
    })
    .when("/gallery", {
        templateUrl : "gallery.html",
        controller: "galleryController"
    })
    .when("/test", {
        templateUrl : "test.html"
    })
    .when("/newsletter", {
        templateUrl : "newsletter-06-2018.html"
    })
    .when("/newsletter-06-2018", {
        templateUrl : "newsletter-06-2018.html"
    })
    .when("/notfound", {
        templateUrl : "404.html"
    })
    .otherwise({
      redirectTo: '/notfound'
   });
    $locationProvider.html5Mode(true);
});
app.run(function($rootScope, $location, $anchorScroll, $timeout) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
     $timeout(function() {
        $anchorScroll.yOffset = 150;
       if($location.hash()) $anchorScroll();
     }, 100)
  });
});
