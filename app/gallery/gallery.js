function buildItem(i) {
   return {
      href: "/images/fullsize/ctg_" + zeroFill(i, 4) + ".jpg",
      thumb: "/images/thumbs/ctg_" + zeroFill(i, 4) + ".jpg",
      //title: "image: " + i
   }
}

function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

angular.module("ctgapp")
   .controller("galleryController", ["$scope", function($scope) {
      $scope.images = [];
      for (var i = 0; i < 86; i++)
         $scope.images.push(buildItem(i));
   }]);
