suh.controller('headerController', function($scope, sharedLoginCheck, $location) {
	$scope.login = sharedLoginCheck;
	$scope.login.loginCheck = 0;
	$scope.login.userName = '';
	console.log(localStorage.getItem('userName'));
	
	// ********** WHEN THE PAGE IS REFRESHED ENSURE IT STAYS ***************//
	if(localStorage.getItem('userName') != null) {
		$scope.login.loginCheck = 1;
		$scope.login.userName = localStorage.getItem('userName');
		$location.path('/consumerHome');
	}
	else { 
		$location.path('/suh');
	}

	// ********************************* LOGOUT  ***************************//
	$scope.logout = function() {
		localStorage.removeItem('userName');
		$scope.login.loginCheck = 0;
		$scope.login.userName = '';
		$location.path('/suh');
	}

})
