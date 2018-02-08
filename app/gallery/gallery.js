angular.module("ctgapp")
   .controller("galleryController", ["$scope", "API", "$interval", function($scope, $API, $interval) {
      $scope.images = [];
      var imgQueue = [];
      var repeatQueue = null;
      getImages(1);

      function getImages(page) {
         $API.images.get(page).then(function(images) {
            addImages(images.results);
            if (images.more) getImages(page+1);
         })
      }

      function addImages(imgs) {
         for (var i = 0; i < imgs.length; i++) {
            imgQueue.push(imgs[i]);
         }
         if (repeatQueue == null) repeatQueue = $interval(handleQueue, 50);
      }

      function handleQueue() {
         var shift = imgQueue.shift();
         $scope.images.push(shift);
         console.log(shift, imgQueue.length, $scope.images.length);
         if (imgQueue.length == 0) {
            $interval.cancel(repeatQueue);
            repeatQueue = null;
         }
      }
   }]);
