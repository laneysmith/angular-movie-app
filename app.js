var routerApp = angular.module('routerApp', ['ui.router']);
routerApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
			url: '/home',
			views: {
				'': {
					templateUrl: 'search.html',
					controller: 'movieList'
				},
				'results@home': {
					templateUrl: 'results.html',
					controller: 'movieList'
				}
			}
		})
}]);
routerApp.controller('movieList', function($scope, $http) {
	$scope.showResults = false;
	$scope.list;
	$scope.searchMovies = function() {
		$http.get('http://www.omdbapi.com/?s=' + $scope.searchTerm).then(function(data){
			console.log(data.data.Search);
			$scope.list = data.data.Search;
		});
	};

});
