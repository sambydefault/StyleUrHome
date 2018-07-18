suh
		.controller(
				'homeController',
				function($scope, $http, $location, $resource, $window,
						sharedLoginCheck) {

					console.log(localStorage.getItem('roomDesignsList'));
					$scope.signup_error_msg = '';
					$scope.errorMessage = '';
					$scope.loginCheck = 0;

					// ********************************* SIGNUP
					// ************************************
					$scope.signup = function() {
						$scope.errorMessage = '';
						var data = new FormData();
						data.append('signupEmail', $scope.signupEmail);
						data.append('userName', $scope.userName);
						data.append('signupPassword', $scope.signupPassword);
						data.append('userType', $scope.roleName);

						if ($scope.signupPassword != $scope.signupConfirmPassword) {
							$scope.errorMessage = "Passwords dont match. Please try again";
							throw new Error('');
						}

						$http
								.post('signup', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function(resp) {
											console.log("response" + resp);
											if (resp != '') {
												$('#signupModal').modal('hide');
												bootbox
														.alert('Please check your email to authenticate/activate your Email ID');
											} else {
												$scope.errorMessage = 'EmailID exists.';
											}
										});
					}

					// ********************************* LOGIN
					// ************************************
					$scope.login = function() {
						$scope.errorMessage = '';
						var data = new FormData();
						data.append('userEmail', $scope.email);
						data.append('userPassword', $scope.password);
						$http
								.post('login', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function(response) {
											if (response != '') {
												$('#loginModal').modal('hide');
												$scope.login = sharedLoginCheck;
												$scope.login.loginCheck = 1;
												$scope.login.userName = response.userName;
												localStorage.setItem(
														'userName',
														response.userName);
												localStorage.setItem(
														'userEmail',
														response.userEmail);
												$location.path('/consumerHome');
											} else {
												$scope.errorMessage = 'Invalid Login';
											}
										}).error(function() {
									$scope.errorMessage = 'Invalid Login';
								});
					}
				})

suh.directive('preventDefault', function() {
	return function(scope, element, attrs) {
		jQuery(element).click(function(event) {
			event.preventDefault();
		});
	}
});

suh.directive("scrollTo", [ "$window", function($window) {
	return {
		restrict : "AC",
		compile : function() {

			function scrollInto(elementId) {
				if (!elementId)
					$window.scrollTo(0, 0);
				// check if an element can be found with id attribute
				var el = document.getElementById(elementId);
				if (el)
					el.scrollIntoView();
			}

			return function(scope, element, attr) {
				element.bind("click", function(event) {
					scrollInto(attr.scrollTo);
				});
			};
		}
	};
} ]);

suh.directive('ddMenu', function() {
	return {
		restrict : 'A',
		scope : {
			value : '='
		},
		link : function(scope, element) {
			// set the initial value
			var $el = $(element);
			scope.value = $el.find('li:first').text();

			// listen for changes
			$el.on('click', 'li', function() {
				scope.value = $(this).text();
				scope.$apply();
			});
		}
	};
});
