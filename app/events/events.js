angular.module("ctgapp")
.directive("ctgEvent", [function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      start: "@start",
      end: "@end",
      title: "@title",
      subtitle: "@subtitle",
      src: "@src",
      location: "@location",
      info: "@info",
      offset: "@offset"
    },
    controller: ["$scope", function($scope) {
      if ($scope.start) {
         $scope.startDate = parseDateTime($scope.start);
      }
      if ($scope.end) {
         $scope.endDate = parseDateTime($scope.end);
      }

   }],
    templateUrl: 'app/events/eventArticle.html'
  };
}]);


function parseDateTime(str) {
   var format = "YYYY/MM/DD hh:mma"; //example 2016/12/25 6:30pm
   var mdate = moment(str, format);
   var datetimeobj = {
      year: mdate.year(),
      month: mdate.format("MMM"),
      day: mdate.date(), //.day() returns day of month
      time: mdate.format("hh:mm a")
   };
   if (~str.indexOf("am") || ~str.indexOf("pm"))
      datetimeobj.showTime = true;
   return datetimeobj;
}
