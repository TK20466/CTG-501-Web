(function () {
    'use strict';
    angular
        .module('ui.blueimp.gallery', ['ui.blueimp.gallery.templates'])
        .directive('uiGallery', uiGallery)
        .directive('uiCarousel', uiCarousel);

    uiGallery.$inject = ['$window'];

    function uiGallery($window, $sce){

        var directive = {
            templateUrl: '/app/gallery/ngGallery.html',
            scope: {
                options: '=',
                list: '='
            },
            link: link
        };
        return directive;


        function link(scope, element, attr) {
            scope.slides = scope.list;

            // Dynamically update list value.
            scope.$watch('list', function(newVal, oldVal){
                scope.slides = newVal;
            });

            angular.element("#links").on('click', function(event){
                event = event || $window.event;
                var target = event.target || event.srcElement,
                    link = target.src ? target.parentNode : target,
                    options = {index: link, event: event},
                    links = this.getElementsByTagName('a');

                angular.extend(options, scope.options);

                if(blueimp){
                    blueimp.Gallery(links, options);
                }else{
                    console.log('Make sure you added blueimp-gallery.js file');
                }

            });
        }
    }



    function uiCarousel($window, $sce, $timeout){

        var directive = {
            templateUrl: '/app/carousel/carousel.html',
            scope: {
                options: '=',
                list: '='
            },
            link: link
        };
        return directive;


        function link(scope, element, attr) {
            scope.slides = scope.list;

            // Dynamically update list value.
            scope.$watch('list', function(newVal, oldVal){
                scope.slides = newVal;
            });

            var options = {
                container: '#blueimp-gallery-carousel',
                carousel: true
            };
            angular.extend(options, scope.options);
            $timeout(function() {
               blueimp.Gallery(
                   document.getElementById('links').getElementsByTagName('a'),
                   options
               );
            }, 0);
        }
    }

    angular
        .module("ui.blueimp.gallery.templates", []);

})();
