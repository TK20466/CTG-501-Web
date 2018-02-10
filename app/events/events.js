angular.module("ctgapp")
.directive("ctgEvent", [function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      start: "@",
      end: "@",
      title: "@",
      subtitle: "@",
      src: "@",
      location: "@",
      info: "@",
      offset: "@",
      content: "@"
    },
    controller: ["$scope", function($scope) {
      if ($scope.start) {
         $scope.startDate = parseDateTime($scope.start);
      }
      if ($scope.end) {
         $scope.endDate = parseDateTime($scope.end);
      }
      $scope.htmlContent = $scope.content;

   }],
    templateUrl: 'app/events/eventArticle.html'
  };
}]);


function parseDateTime(str) {
   var mdate = moment(str);
   var datetimeobj = {
      year: mdate.year(),
      month: mdate.format("MMM"),
      day: mdate.date(), //.day() returns day of month
      time: mdate.format("hh:mm a")
   };
   //if (~str.indexOf("am") || ~str.indexOf("pm"))
   datetimeobj.showTime = true;
   return datetimeobj;
}
angular.module("ctgapp")
.controller("eventsController", ["$scope", "API", function($scope, $API) {
   $scope.events = [];
   $API.events.get().then(function(events) {
      $scope.events = events;
   });
}]);
