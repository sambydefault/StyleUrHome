var suh = angular.module('suh', [ 'ngRoute', 'ngResource', 'ngCookies' ]);
// .config(config).run(run);

suh.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : "index.html",
		controller : "homeController"
	}).when('/', {
		templateUrl : "views/home.html",
		controller : "homeController"
	}).when('/suh', {
		templateUrl : "views/home.html",
		controller : "homeController"
	}).when('/home', {
		templateUrl : "views/home.html",
		controller : "homeController"
	}).when('/consumerHome', {
		templateUrl : "views/consumerHome.html",
		controller : "consumerController"
	}).when('/consumerHomeDesign', {
		templateUrl : "views/consumerHomeDesign.html",
		controller : "consumerController"
	}).when('/consumerHomeDimensions', {
		templateUrl : "views/consumerHomeDimensions.html",
		controller : "consumerController"
	}).when('/consumerDesigner', {
		templateUrl : "views/consumerDesigner.html",
		controller : "consumerController"
	}).otherwise({
		redirectTo : '/home'
	});
})

// run.$inject = [ '$rootScope', '$location', '$cookieStore', '$http' ];
// function run($rootScope, $location, $cookieStore, $http) {
// // keep user logged in after page refresh
// $rootScope.globals = $cookieStore.get('globals') || {};
// if ($rootScope.globals.currentUser) {
// $http.defaults.headers.common['Authorization'] = 'Basic '
// + $rootScope.globals.currentUser.authdata; // jshint
// // ignore:line
// }
//
// $rootScope.$on('$locationChangeStart', function(event, next, current) {
// // redirect to login page if not logged in and trying to access a
// // restricted page
// var restrictedPage = $.inArray($location.path(), [ '/login',
// '/register' ]) === -1;
// var loggedIn = $rootScope.globals.currentUser;
// if (restrictedPage && !loggedIn) {
// $location.path('/home');
// }
// });
// }

suh.service('sharedLoginCheck', function() {
	return {};
})