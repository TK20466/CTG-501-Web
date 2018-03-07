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
            get: GetConfirmedEvents
         }
      }

      function GetConfirmedEvents() {
            var parameters = {
               sortDir: 'desc',
               calendars: 2,
               hidden: 0,
               sortBy: 'date',
            }
            var url = buildUrl("/calendar/events", parameters);

            return $http({ url: url }).then(parseEvents).then(removeBlankEvents).then(removePastEvents);
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

      function parseEvents(response) {
         var results = response.data.results;
         return results.map(parseEvent).sort(sortEvents);
      }

      function sortEvents(a, b) {
         if (a.start < b.start) return -1;
         else if (a.start > b.start) return 1;
         return 0;
      }

      function parseEvent(obj) {
         return {
            start: obj.start,
            end: obj.end,
            title: obj.title,
            description: obj.secondary_description,
            location: parseGoogleMap(obj.location),
            subtitle: parseLocation(obj.location).join(", ")
         }
      }

      function removePastEvents(events) {
         var filtered = [];
         for (var i = 0; i < events.length; i++) {
            if (moment(events[i].start) > moment())
               filtered.push(events[i]);
         }
         return filtered;
      }

      function removeBlankEvents(events) {
         var filtered = [];
         for (var i = 0; i < events.length; i++) {
            if (events[i].description != null && events[i].description != "")
               filtered.push(events[i]);
         }
         return filtered;
      }

      function parseLocation(addr) {
         var locationParts = [];
         if (addr.addressLines && addr.addressLines.length > 0 && addr.addressLines[0] != null) {
            for (var i = 0; i < addr.addressLines.length; i++) {
               locationParts.push(addr.addressLines[i]);
            }
         }
         if (addr.city) locationParts.push(addr.city);
         if (addr.region) locationParts.push(addr.region);
         if (addr.postalCode) locationParts.push(addr.postalCode);

         return locationParts;
      }

      function parseGoogleMap(addr) {
         var base = "https://www.google.com/maps/place/";
         var locationParts = parseLocation(addr);
         return base + locationParts.join("+") + "/" + addr.lat + "," + addr.long;
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
