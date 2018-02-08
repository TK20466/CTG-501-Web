angular.module("ctgapp")
.controller("homePageController", ["$scope", "$timeout", "API", function($scope, $timeout, API) {
   $scope.images = [];
   $timeout(function() {
    $.ajax({ url: 'https://platform.twitter.com/widgets.js', dataType: 'script', cache:true});
}, 1000);

   API.images.featured().then(function(images) {
      $scope.images = images.results;
   });
}]);

function addImage(url, title) {
   return {
      href: "/images/carousel/" + url,
      title: title
   }
}
