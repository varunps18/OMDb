var OMDbAPISearch = angular.module('OMDbAPISearch', []);
angular.module("OMDbAPISearch")
    .controller('searchMovies', [])



'use strict';


angular.module('OMDbAPISearch', [])
    .controller('searchMovies', ['$scope', '$http',
        function($scope, $http) {
            $scope.method = 'GET';
            $scope.fetch = function() {
                if ($scope.searchparam) {
                    $scope.url = 'https://www.omdbapi.com/?apikey=c2525ed1&s=' + $scope.searchparam + '&type=movie&r=json';
                    $http({
                        method: $scope.method,
                        url: $scope.url
                    }).
                    then(function(response) {
                        if (response.data.Response) {
                            // got result then
                            $('.results').css('display', 'block');
                            $('.noResults').css('display', 'none');
                            var theSrchResults = response.data["Search"];
                            angular.forEach(theSrchResults, function(obj) {
                                // each movie using title.
                                $http({
                                    method: $scope.method,
                                    url: 'https://www.omdbapi.com/?apikey=c2525ed1&t=' + obj.Title + '&plot=full&r=json&tomatoes=true'
                                }).
                                then(function(response) {
                                    // data to details
                                    obj.details = response.data;
                                });
                            });
                            $scope.movieResults = theSrchResults;
                        } else {
                            //nomovie
                            console.log("not found");
                            $('.results').css('display', 'none');
                            $('.noResults').css('display', 'block');
                            $('.noResults').html("<strong>No results found.</strong>");
                        }
                    }, function(response) {
                        console.log("failure");
                        $('.results').css('display', 'block');
                        $('.noResults').css('display', 'block');
                        $('.noResults').html("<p><strong>Network or data error, please try again{{obj.Error}}.</strong></p>");
                    });
                } else {
                    //noinput
                    $('.results').css('display', 'none');
                    $('.noResults').css('display', 'block');
                    $('#theSearch').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                }
            };
        }
    ])
    .directive('movieSrchResults', function() {
        return {
            templateUrl: 'movieResults.html'
        };
    });