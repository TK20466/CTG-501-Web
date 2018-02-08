angular.module("ctgapp")
   .factory("API", ['$http', function($http) {
      var APIKey = "60ed3471b2b6a416b23850d51aea2cf6";
      var APIBaseUrl = "https://ctg501.com/community/api/index.php?";
      var eventCategory = 2;

      return {
         images: {
            get: GetEventImages,
            featured: GetFeaturedEventImages
         },
         events: {
            upcoming: GetUpcomingEvents,
            get: GetConfirmedEvents
         }
      }

      function GetUpcomingEvents() {
            var parameters = {
               sortDir: 'desc',
               calendars: 2
            }
            var url = buildUrl("/forums/topics", parameters);

            return $http({ url: url }).then(parseTopics);
      }

      function GetPublicInfoForEvents() {
         var parameters = {
            sortDir: 'desc',
            forums: 20
         }
         var url = buildUrl("/forums/topics", parameters);

         return $http({ url: url }).then(parseTopics);
      }

      function GetEventImages(page) {
         var parameters = {
            categories: eventCategory,
            page: page || 1,
            sortDir: 'desc'
         }

         var url = buildUrl("/gallery/images", parameters);

         var promise = $http({
                url: url
            }).then(parseImages);

         return promise;
      }

      function GetFeaturedEventImages() {

         var parameters = {
            categories: eventCategory,
            featured: 1,
            page: 1,
            sortDir: 'desc'
         }

         var url = buildUrl("/gallery/images", parameters);

         var promise = $http({
                url: url
            }).then(parseImages);

         return promise;
      }

      function buildUrl(path, parameters) {
         var url = APIBaseUrl + path;
         for (key in parameters) {
            url += "&" + key + "=" + parameters[key];
         }

         return url += "&key=" + APIKey;
      }

      function parseImages(response) {
         var results = response.data.results;
         return {
            results: results.map(parseImage),
            more: response.data.page < response.data.totalPages
         }
         return results.map(parseImage);
      }

      function parseImage(image) {
         return {
            title: image.caption,
            href: image.images.large,
            thumb: image.images.thumb,
            description: image.description,
            date: new Date(image.date)
         }
      }

      function parseTopics(response) {
         var topics = response.data.results;
         return topics.map(parseTopic);
      }

      function parseTopic(topic) {
         return {
            title: topic.title,
            description: topic.firstPost.content
         }
      }
   }]);
