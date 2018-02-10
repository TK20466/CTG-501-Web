angular.module("ctgapp")
.controller("homePageController", ["$scope", "$timeout", "API", function($scope, $timeout, API) {
   $scope.images = [];
   $scope.events = [];
   $timeout(function() {
    $.ajax({ url: 'https://platform.twitter.com/widgets.js', dataType: 'script', cache:true});
}, 1000);

   API.images.featured().then(function(images) {
      $scope.images = images.results;
   });

   API.events.get().then(function(events) {
      for (var i = 0; i < events.length; i++) {
         var dt = moment(events[i].start);
         events[i].dateStr = dt.format("MMMM")+ " " + dt.date() + ", " + dt.year();
      }
      $scope.events = events;
   });

}]);

function addImage(url, title) {
   return {
      href: "/images/carousel/" + url,
      title: title
   }
}
