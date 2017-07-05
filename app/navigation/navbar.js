angular.module('ctgapp')
.directive('navbar', [function() {
  return {
    restrict: 'E',
    controller: ["$location", "$scope", "$timeout", function($location, $scope, $timeout) {
      $scope.isActive = function(path) {
         return ($location.path() == path);
      }
      $scope.toggleMenu = function() {
         $("body").toggleClass("navbar-open");
      }

      $scope.navigate = function(path) {
         $timeout(function() {
            $("body").removeClass("navbar-open");
         }, 100);
         $location.path(path);
      }
   }],
    templateUrl: 'app/navigation/navbar.html'
  };
}]);
