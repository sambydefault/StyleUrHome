var cdc = angular.module('cdc', [ 'ngRoute', 'ngResource', 'autocomplete',
		'ui', 'ui.router', 'angular-carousel', 'ui.bootstrap', 'ui.tinymce',
		'ngSanitize' ]);

cdc.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : "index.html",
		controller : "productController"
	}).when('/cdc', {
		templateUrl : "views/home.html",
		controller : "productController"
	}).when('/ecom', {
		templateUrl : "views/welcome.html",
		controller : "productController"
	}).when('/vendorHome', {
		templateUrl : "views/vendorHome.html",
		controller : "vendorController"
	}).when('/vendorServiceHome', {
		templateUrl : "views/vendorServiceHome.html",
		controller : "vendorController"
	}).when('/signup', {
		templateUrl : "views/home.html",
		controller : "productController"
	}).when('/electronics', {
		templateUrl : "views/electronics.html",
		controller : "productController"
	}).when('/reviews', {
		templateUrl : "views/reviews.html",
		controller : "reviewsController"
	}).otherwise({
		redirectTo : '/cdc'
	});

});

cdc.factory('AutoRetriever', function($http, $q, $timeout) {
	var AutoRetriever = new Object();

	AutoRetriever.getmovies = function(i, category) {
		var suggestedData = $q.defer();
		var dataString;
		var suggestedString = [];
		$http.get('getSuggestion').then(function(response) {
			$.each(response.data, function(index, elements) {
				suggestedString.push(elements.suggestionString);
			});
		})

		if (i && i.indexOf(suggestedString) != -1) {
			dataString = suggestedString;
		} else {
			dataString = suggestedString;
		}

		$timeout(function() {
			suggestedData.resolve(dataString);
		}, 1000);

		return suggestedData.promise
	}

	return AutoRetriever;
});

cdc.directive('fileModel', [ '$parse', function($parse) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
} ]);

cdc.directive("footer", function() {
	return {
		restrict : 'A',
		templateUrl : 'views/footer.html',
		scope : true,
		transclude : false,
		controller : 'loginController'
	};
});

cdc.filter('dateformat', function($filter) {
	return function(input) {
		if (input == null) {
			return "";
		}
		var _date = $filter('date')(new Date(input), 'dd-MM-yyyy');
		return _date.toUpperCase();
	};
});

cdc.service('fileUpload', [ '$http', function($http) {
	this.uploadFileToURL = function(file, uploadUrl) {
		var fd = new FormData();
		fd.append('file', file);
		$http.post(uploadUrl, fd, {
			withCredentials : false,
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		}).success(function(resp) {

		}).error(function() {

		});
	}
} ]);

cdc
		.directive(
				'loading',
				function() {
					return {
						restrict : 'E',
						replace : true,
						template : '<img style="display:block; margin:0 auto; top:0;" widht="100%" height="100%" src="images/loading.gif"/>',
						link : function(scope, element, attr) {
							scope.$watch('loading', function(val) {
								val = val ? $(element).show() : $(element)
										.hide();
							});
						}
					}
				});

cdc.directive('scrollOnClick', function() {
	return {
		restrict : 'A',
		link : function(scope, $elm) {
			$elm.on('click', function() {
				$("body").animate({
					scrollTop : $elm.offset().top
				}, "slow");
			});
		}
	}
});

cdc.directive('loading', [ '$http', function($http) {
	return {
		restrict : 'A',
		link : function(scope, elm, attrs) {
			scope.isLoading = function() {
				return $http.pendingRequests.length > 0;
			};

			scope.$watch(scope.isLoading, function(v) {
				if (v) {
					elm.show();
				} else {
					elm.hide();
				}
			});
		}
	};

} ]);

cdc.directive('uiTinymce', [ 'uiTinymceConfig', function(uiTinymceConfig) {
	uiTinymceConfig = uiTinymceConfig || {};
	var generatedIds = 0;
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ngModel) {
			var expression, options, tinyInstance;
			// generate an ID if not present
			if (!attrs.id) {
				attrs.$set('id', 'uiTinymce' + generatedIds++);
			}
			options = {
				// Update model when calling setContent (such as from the source
				// editor popup)
				setup : function(ed) {
					ed.on('init', function(args) {
						ngModel.$render();
					});
					// Update model on button click
					ed.on('ExecCommand', function(e) {
						ed.save();
						ngModel.$setViewValue(elm.val());
						if (!scope.$$phase) {
							scope.$apply();
						}
					});
					// Update model on keypress
					ed.on('KeyUp', function(e) {
						console.log(ed.isDirty());
						ed.save();
						ngModel.$setViewValue(elm.val());
						if (!scope.$$phase) {
							scope.$apply();
						}
					});
				},
				mode : 'exact',
				elements : attrs.id
			};
			if (attrs.uiTinymce) {
				expression = scope.$eval(attrs.uiTinymce);
			} else {
				expression = {};
			}
			angular.extend(options, uiTinymceConfig, expression);
			setTimeout(function() {
				tinymce.init(options);
			});

			ngModel.$render = function() {
				if (!tinyInstance) {
					tinyInstance = tinymce.get(attrs.id);
				}
				if (tinyInstance) {
					tinyInstance.setContent(ngModel.$viewValue || '');
				}
			};
		}
	};
} ]);