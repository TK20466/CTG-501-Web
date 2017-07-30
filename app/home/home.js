angular.module("ctgapp")
.controller("homePageController", ["$scope", "$timeout", function($scope, $timeout) {
   $scope.images = [];
   $scope.images.push(
      addImage("emt.jpg", "Stratford EMS Open House")
   );
   $scope.images.push(
      addImage("prospect1.jpg", "Prospect Theatre Rogue One Premiere")
   );
   $scope.images.push(
      addImage("ctconn.jpg", "ComiConn 2017")
   );
   $scope.images.push(
      addImage("airmuseum.jpg", "New England Air Museum")
   );
   $timeout(function() {
    $.ajax({ url: 'http://platform.twitter.com/widgets.js', dataType: 'script', cache:true});
}, 1000);
}]);

function addImage(url, title) {
   return {
      href: "/images/carousel/" + url,
      title: title
   }
}
