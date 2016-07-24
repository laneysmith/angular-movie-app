var app = angular.module('routerApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'search.html',
			controller: 'allResultsController'
		})
		.state('home.results', {
			url: '/results',
			templateUrl: 'results.html',
			controller: 'allResultsController'
		})
		.state('detail', {
			url: '/results/:movieId',
			templateUrl: 'detail.html',
			controller: 'movieDetailsController'
		})
}]);

app.controller('movieDetailsController', function($scope, $http, $stateParams) {
	console.log($stateParams.movieId);
	$http.get('http://www.omdbapi.com/?i=' + $stateParams.movieId)
			.then(function(data) {
				console.log(data.data);
				$scope.movieDetails = data.data;
	});
});

app.controller('allResultsController', function($scope, $http, $state) {
	$scope.list;
	$scope.searchMovies = function() {
		return $http.get('http://www.omdbapi.com/?s=' + $scope.searchTerm)
			.then(function(data) {
				console.log(data.data.Search);
				$scope.list = data.data.Search;
			}).then(function() {
				console.log('here');
				console.log('valid?', searchForm.$valid);
				// if (searchForm.$valid) {
					// console.log('in it');
					$state.go(home.results);
				// }
			});
	};
});
