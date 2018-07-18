cdc
		.controller(
				'vendorController',
				function($scope, $location, $resource, $window, $http, cart,
						$sce) {

					if (localStorage.getItem('userType') == 'vendor')
						$location.path('/vendorHome');
					else if (localStorage.getItem('userType') == 'vendorService')
						$location.path('/vendorServiceHome');

					$scope.vendorAgreementText = $sce.trustAsHtml('<span>'
							+ $scope.vendorAgreementText + '</span>');

					$('.navbar-nav li a').click(function(event) {
						$(".navbar-collapse").collapse('hide');
					});

					$scope.resetProduct = function() {
								$scope.parent.productName = '',
								$scope.parent.productDescription = '',
								$scope.parent.brandName = '',
								$scope.parent.productCategory.productCategory = '',
								$scope.parent.productItemCategory.productItemCategory = '',
								$scope.parent.productSubCategory.productSubCategory = '',
								$scope.parent.productSoldQty = 0,
								$scope.parent.productMinPrice = 0,
								$scope.parent.productMaxPrice = 0,
								$scope.parent.productPrice = 0,
								$scope.parent.productInStock = '',
								$scope.parent.productAvailableQty = 0;
					}

					$scope.loginCheck = 1;
					$scope.scroll = 1;
					$scope.products = 1;
					$scope.showelectronics = 0;
					$scope.showFurnitures = 0;
					$scope.showConsumerCart = 0;
					$scope.showVendorAgreement = 0;
					$scope.showConsumerServiceCart = 0;
					$scope.showServices = 0;
					$scope.userName = localStorage.getItem('userName');
					$scope.userEmail = localStorage.getItem('userEmail');
					$scope.vendorLocation = '';

					$scope.setNavigationChecks = function(flagCheckOne,
							flagCheckTwo) {

						var listFlagChecks = [];
						listFlagChecks.push(flagCheckOne);
						listFlagChecks.push(flagCheckTwo);
						$scope.scroll = 0, $scope.products = 0,
								$scope.showMyProfile = 0,
								$scope.showVendorHome = 0;
						$scope.showelectronics = 0, $scope.showFurnitures = 0,
								$scope.showServices = 0,
								$scope.showReviews = 0,
								$scope.showVendorAgreement = 0,
								$scope.showConsumerServiceCart = 0;
						$scope.showVendorOrders = 0, $scope.vendorAdd = 0,
								$scope.showVendorAgreement = 0,
								$scope.showVendorProfile = 0,
								$scope.showVendorServiceHome = 0;

						for (x = 0; x < listFlagChecks.length; x++) {
							switch (listFlagChecks[x]) {
							case 'scroll':
								$scope.scroll = 1;
								break;
							case 'showProduct':
								$scope.showProduct = 1;
								$scope.editProduct = false;
								break;
							case 'showMyProfile':
								$scope.showMyProfile = 1;
								break;
							case 'showVendorHome':
								$scope.showVendorHome = 1;
								break;
							case 'showelectronics':
								$scope.showelectronics = 1;
								break;
							case 'showFurnitures':
								$scope.showFurnitures = 1;
								break;
							case 'showServices':
								$scope.showServices = 1;
								break;
							case 'showReviews':
								$scope.showReviews = 1;
								break;
							case 'showVendorAgreement':
								$scope.showVendorAgreement = 1;
								break;
							case 'showConsumerServiceCart':
								$scope.showConsumerServiceCart = 1;
								break;
							case 'showVendorOrders':
								$scope.showVendorOrders = 1;
								break;
							case 'vendorAdd':
								$scope.vendorAdd = 1;
								break;
							case 'showVendorAgreement':
								$scope.showVendorAgreement = 1;
								break;
							case 'showVendorProfile':
								$scope.showVendorProfile = 1;
								break;
							case 'showVendorServiceHome':
								$scope.showVendorServiceHome = 1;
								break;

							}
						}
					}

					//soumya
					//$scope.editProductVal = 0;
					$scope.editProduct = false;
					$scope.editProduct = function(product) {
						$scope.currentRecord = {};
						$scope.currentRecord = product;
					}
					
					$scope.updateProduct = function(product){
						$scope.loading = true;
						var data = new FormData();
						data.append('productId', product.productid);
						data.append('productQnty', product.productAvailableQty);
						data.append('productDesc', product.productDescription);
						data.append('productPrice', product.productPrice);
						data.append('productSubCat', product.productItemCategory);
						$http.post('updateProducts', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function(response) {
							$scope.loading = false;
							bootbox.alert('Product details updated');
						});
					}
					
					$scope.removeProduct = function(productid){
						$scope.loading = true;
						alert();
						var data = new FormData();
						data.append('productId', productid);
						$http.post('removeProduct', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function(response) {
							$scope.loading = false;
							bootbox.alert('Product removed successfully');
						});
					}
					//ends
					
					// *********************** GET VENDOR CART
					$scope.vendorList = [];
					cart.vendorCart(localStorage.getItem('userEmail')).then(
							function(response) {
								$.each(response.data, function(index, element) {
									$scope.vendorList.push(element);
								});
							})

					$scope.vendorServiceList = [];
					cart.vendorServiceCart(localStorage.getItem('userEmail'))
							.then(function(response) {
								$.each(response.data, function(index, element) {
									console.log(element)
									$scope.vendorServiceList.push(element);
								});
							})

					$scope.vendorServiceOrderList = [];
					cart
							.vendorServiceOrderQuote(
									localStorage.getItem('userEmail'))
							.then(
									function(response) {
										$
												.each(
														response.data,
														function(index, element) {
															for (var i = element.vendorOrderAction.length - 1; i >= 0; i--) {
																if (element.vendorOrderAction[i].vendor.vendorEmail != localStorage
																		.getItem('userEmail')) {
																	element.vendorOrderAction
																			.splice(
																					i,
																					1);
																}
															}

															$scope.vendorServiceOrderList
																	.push(element);
															console
																	.log($scope.vendorServiceOrderList);

														});
									})

					if (localStorage.getItem('userType') == 'vendor') {
						$scope.showVendorHome = 1
						$scope.products = 1;
					}

					if (localStorage.getItem('userType') == 'vendorService') {
						$scope.showVendorServiceHome = 1
						// $scope.products = 1;
					}

					$scope.vendorHome = function() {
						$scope.setNavigationChecks('showVendorHome', 'scroll');
					}

					$scope.vendorServiceHome = function() {
						$scope.setNavigationChecks('showVendorServiceHome',
								'scroll');
					}

					// **** Suresh

					$scope.curPage = 0;
					$scope.pageSize = 4;
					$scope.numberOfPages = function(list) {
						if (list) {
							return Math.ceil(list.length / $scope.pageSize);
						}
					};

					// $scope.productDateSortList = [];
					$scope.productDateSortList = [];
					$scope.showVendorServiceProducts = function() {
						$scope.setNavigationChecks('showProduct', 'scroll');
						$scope.productDateSortList = [];
						$http
								.get('getProductDateSortList', {
									params : {}
								})
								.then(
										function(resp) {
											console.log(resp.data);
											$scope.productDateSortList = resp.data;

											$scope.productDataLegth = resp.data.length;
											localStorage.setItem(
													'productDataLength',
													$scope.productDataLegth);
											$scope.productDataCount = $scope.productDataLegth;
											// $scope.orderReview.rating = '';
											// $location.path('/vendorServiceHome');
										});
					}

					$scope.addProduct = function() {
						$scope.showProduct = 0;
						$scope.vendorAdd = 1;
					}

					/*
					 * $scope.uploadFiles = function(files, errFiles) {
					 * $scope.files = files; $scope.errFiles = errFiles;
					 * angular.forEach(files, function(file) { file.upload =
					 * Upload.upload({ url: 'http://localhost:8080/cdc/images/',
					 * data: {file: file} }); file.upload.then(function
					 * (response) { $timeout(function () { file.result =
					 * response.data; }); }, function (response) { if
					 * (response.status > 0) $scope.errorMsg = response.status + ': ' +
					 * response.data; }) }) }
					 */
					$scope.productLoadConfirmation = function() {
						$scope.showProduct = 1;
						$scope.vendorAdd = 0;
						var data = new FormData();

						if (angular.isUndefined($scope.parent.productSoldQty))
							$scope.parent.productSoldQty = 0;
						if (angular.isUndefined($scope.parent.productMinPrice))
							$scope.parent.productMinPrice = 0;
						if (angular.isUndefined($scope.parent.productMaxPrice))
							$scope.parent.productMaxPrice = 0;
						if (angular.isUndefined($scope.parent.productPrice))
							$scope.parent.productPrice = 0;
						if (angular
								.isUndefined($scope.parent.productAvailableQty))
							$scope.parent.productAvailableQty = 0;

						data.append('productName', $scope.parent.productName);
						data.append('productDescription',
								$scope.parent.productDescription);
						data.append('brandName', $scope.parent.brandName);

						data.append('productCategory',
								$scope.parent.productCategory.productCategory);

						data
								.append(
										'productItemCategory',
										$scope.parent.productItemCategory.productItemCategory);
						data
								.append(
										'productSubCategory',
										$scope.parent.productSubCategory.productSubCategory);

						data.append('productSoldQty',
								$scope.parent.productSoldQty);

						console.log(this.myFile)
						data.append('productImage', this.myFile);

						data.append('productMinPrice',
								$scope.parent.productMinPrice);
						data.append('productMaxPrice',
								$scope.parent.productMaxPrice);
						data.append('productPrice', $scope.parent.productPrice);
						data.append('productInStock',
								$scope.parent.productInStock);
						data.append('productAvailableQty',
								$scope.parent.productAvailableQty);
						data.append('productVersion',
								$scope.parent.productVersion);

						$http
								.post('productLoad', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function(response) {
											bootbox
													.alert('Product has been added to your Catalogue');
											$http
													.get(
															'getProductDateSortList',
															{
																params : {}
															})
													.then(
															function(resp) {
																console
																		.log(resp.data);
																$scope
																		.showVendorServiceProducts();
																// $scope.orderReview.rating
																// = '';
																// $location.path('/vendorServiceHome');
															});

										})
								.error(
										function() {
											$scope.userMessage = "Not Loaded. Please try again."
										});

					}

					// *********************** VENDOR LOGOUT
					$scope.logout = function() {
						$scope.userName = null;
						localStorage.removeItem('userName');
						localStorage.removeItem('userEmail');
						$scope.loginCheck = 0;
						$scope.cartCount = 0;
						localStorage.removeItem('userType');
						$location.path('/cdc');
					}

					// *********************** APPROVE QUOTE
					$scope.vendorList = [];
					$scope.approveQuote = function(consumerPriceId) {
						$scope.vendorList = [];
						var data = new FormData();
						data.append('consumerPriceId', consumerPriceId);
						data.append('vendorInfo', localStorage
								.getItem('userEmail'));
						$http
								.post('approveUserPrice', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function(resp) {
											cart
													.vendorCart(
															localStorage
																	.getItem('userEmail'))
													.then(
															function(response) {
																$
																		.each(
																				response.data,
																				function(
																						index,
																						element) {
																					$scope.vendorList
																							.push(element);
																				});
															});
										}).error(function(response) {
								});
						bootbox
								.alert('Thanks, user will be notified to initate the payment');
					}

					// *********************** Suresh - APPROVE QUOTE
					$scope.vendorServiceList = [];
					$scope.approveServiceQuote = function(consumerPriceId) {
						$scope.showProduct = 0;
						$scope.vendorAdd = 0;
						$scope.vendorServiceList = [];
						var data = new FormData();
						data.append('consumerPriceId', consumerPriceId);
						$http
								.post('approveUserServicePrice', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function(resp) {
											console.log(resp);
											cart
													.vendorServiceCart(
															localStorage
																	.getItem('userEmail'))
													.then(
															function(response) {
																$
																		.each(
																				response.data,
																				function(
																						index,
																						element) {
																					console
																							.log(element);
																					$scope.vendorServiceList
																							.push(element);
																				});
															});
											console
													.log($scope.vendorServiceList);
										}).error(function(response) {
								});
						bootbox
								.alert('Thanks, user will be notified to initate the payment');
					}

					// *********************** VENDOR REJECTION
					$scope.vendorCartList = [];
					$scope.parent = {};
					$scope.vendorRejection = function(consumerPriceId) {
						$scope.vendorList = [];
						bootbox
								.alert('Thanks for your suggestion, we will inform the user');

						var data = new FormData();
						data.append('consumerPriceId', consumerPriceId);
						data.append('suggestedPrice',
								$scope.parent.suggestedPrice);
						data.append('rejectReason', $scope.parent.rejectReason);
						data.append('vendorReason', $scope.parent.vendorReason);
						$http
								.post('rejectUserPrice', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function(resp) {
											cart
													.vendorCart(
															localStorage
																	.getItem('userEmail'))
													.then(
															function(response) {
																$
																		.each(
																				response.data,
																				function(
																						index,
																						element) {
																					$scope.vendorList
																							.push(element);
																				});
															})
										}).error(function(response) {
								});
					}

					// *********************** Suresh - VENDOR Service REJECTION
					$scope.vendorServiceList = [];
					$scope.parent = {};
					$scope.vendorServiceRejection = function(consumerPriceId) {
						$scope.showProduct = 0;
						$scope.vendorAdd = 0;
						$scope.vendorServiceList = [];
						bootbox
								.alert('Thanks for your suggestion, we will inform the user');

						var data = new FormData();
						data.append('consumerPriceId', consumerPriceId);
						data.append('suggestedPrice',
								$scope.parent.suggestedPrice);
						data.append('rejectReason', $scope.parent.rejectReason);
						data.append('vendorReason', $scope.parent.vendorReason);
						$http
								.post('rejectUserServicePrice', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function(resp) {
											cart
													.vendorServiceCart(
															localStorage
																	.getItem('userEmail'))
													.then(
															function(response) {
																$
																		.each(
																				response.data,
																				function(
																						index,
																						element) {
																					console
																							.log(element)
																					$scope.vendorServiceList
																							.push(element);
																				});
															})
										}).error(function(response) {
									console.log(response);
								});
						console.log('Vendor output' + $scope.vendorServiceList);
					}

					// ***************************** GET VENDOR ORDERS
					$scope.vendorOrderList = [];
					$scope.vendorOrders = function() {
						$scope.vendorOrderList = [];
						$scope.showVendorHome = 0;
						$scope.showVendorOrders = 1;
						$http.get('getVendorOrders', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(function(response) {
							$.each(response.data, function(index, element) {
								$scope.vendorOrderList.push(element);
							});
						});
					}

					// ***************************** Suresh - GET VENDOR ORDERS

					$scope.vendorServiceOrderList = [];
					$scope.approveServiceOrderQuote = function(orderMasterId,
							productid) {
						$scope.showProduct = 0;
						$scope.vendorAdd = 0;
						$scope.vendorServiceOrderList = [];
						var data = new FormData();
						data.append('orderMasterId', orderMasterId);
						data.append('productid', productid);
						data.append('userEmail', localStorage
								.getItem('userEmail'));

						$http
								.post('approveServiceOrderQuote', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function(resp) {
											/*
											 * $scope.approvedOrderId =
											 * orderMasterId;
											 * $scope.approverEmail =
											 * localStorage.getItem('userEmail');
											 */
											console.log(resp);
											cart
													.vendorServiceOrderQuote(
															localStorage
																	.getItem('userEmail'))
													.then(
															function(response) {
																console
																		.log("Check 2222222-----------------");
																console
																		.log(response);
																$
																		.each(
																				response.data,
																				function(
																						index,
																						element) {
																					console
																							.log(element);

																					for (var i = element.vendorOrderAction.length - 1; i >= 0; i--) {
																						if (element.vendorOrderAction[i].vendor.vendorEmail != localStorage
																								.getItem('userEmail')) {
																							element.vendorOrderAction
																									.splice(
																											i,
																											1);
																						}
																					}

																					$scope.vendorServiceOrderList
																							.push(element);
																					console
																							.log($scope.vendorServiceOrderList);
																				});
															});
											console
													.log($scope.vendorServiceOrderList);
										}).error(function(response) {
								});
						bootbox
								.alert('Thanks, user will be notified to initate the payment');
					}

					$scope.vendorServiceList = [];
					$scope.approveServiceQuote = function(consumerPriceId) {
						$scope.showProduct = 0;
						$scope.vendorAdd = 0;
						$scope.vendorServiceList = [];
						var data = new FormData();
						data.append('consumerPriceId', consumerPriceId);
						$http
								.post('approveUserServicePrice', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function(resp) {
											console.log(resp);
											cart
													.vendorServiceCart(
															localStorage
																	.getItem('userEmail'))
													.then(
															function(response) {
																$
																		.each(
																				response.data,
																				function(
																						index,
																						element) {
																					console
																							.log(element);
																					$scope.vendorServiceList
																							.push(element);
																				});
															});
											console
													.log($scope.vendorServiceList);
										}).error(function(response) {
								});
						bootbox
								.alert('Thanks, user will be notified to initate the payment');
					}

					// *********************** VENDOR REJECTION
					$scope.vendorCartList = [];
					$scope.parent = {};
					$scope.vendorRejection = function(consumerPriceId) {
						$scope.vendorList = [];
						bootbox
								.alert('Thanks for your suggestion, we will inform the user');

						var data = new FormData();
						data.append('consumerPriceId', consumerPriceId);
						data.append('suggestedPrice',
								$scope.parent.suggestedPrice);
						data.append('rejectReason', $scope.parent.rejectReason);
						data.append('vendorReason', $scope.parent.vendorReason);
						$http
								.post('rejectUserPrice', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function(resp) {
											cart
													.vendorCart(
															localStorage
																	.getItem('userEmail'))
													.then(
															function(response) {
																$
																		.each(
																				response.data,
																				function(
																						index,
																						element) {
																					$scope.vendorList
																							.push(element);
																				});
															})
										}).error(function(response) {
								});
					}

					$scope.productList = [];
					$scope.getProductList = function() {
						$http.get('getProductList').then(function(response) {
							$scope.productList = response.data;
						});
					}

					$scope.getProductList();

					// ********* GET PRODUCT CATEGORIES ****
					$scope.productItemCategoryList = [];
					$scope.getProductItemCategory = function() {
						$http.get('getProductItemCategory', {
							params : {
								'parentCategory' : 'PRODUCTS'
							}
						}).then(function(response) {
							$.each(response.data, function(index, element) {
								$scope.productItemCategoryList.push(element);
							});
						});

					}

					$scope.productSubCategoryList = [];
					$scope.getProductSubCategory = function() {
						$http.get('getProductSubCategory', {
							params : {
								'parentCategory' : 'PRODUCTS'
							}
						}).then(function(response) {
							$.each(response.data, function(index, element) {
								$scope.productSubCategoryList.push(element);
							});
						});

					}

					// *********************** Suresh - VENDOR Service REJECTION
					$scope.vendorServiceList = [];
					$scope.parent = {};
					$scope.vendorServiceRejection = function(consumerPriceId) {
						$scope.showProduct = 0;
						$scope.vendorAdd = 0;
						$scope.vendorServiceList = [];
						bootbox
								.alert('Thanks for your suggestion, we will inform the user');

						var data = new FormData();
						data.append('consumerPriceId', consumerPriceId);
						data.append('suggestedPrice',
								$scope.parent.suggestedPrice);
						data.append('rejectReason', $scope.parent.rejectReason);
						data.append('vendorReason', $scope.parent.vendorReason);
						$http
								.post('rejectUserServicePrice', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function(resp) {
											cart
													.vendorServiceCart(
															localStorage
																	.getItem('userEmail'))
													.then(
															function(response) {
																$
																		.each(
																				response.data,
																				function(
																						index,
																						element) {
																					console
																							.log(element)
																					$scope.vendorServiceList
																							.push(element);
																				});
															})
										}).error(function(response) {
									console.log(response);
								});
						console.log('Vendor output' + $scope.vendorServiceList);
					}

					// ***************************** GET VENDOR ORDERS
					$scope.vendorOrderList = [];
					$scope.vendorOrders = function() {
						$scope.vendorOrderList = [];
						$scope.showVendorHome = 0;
						$scope.showVendorOrders = 1;
						$http.get('getVendorOrders', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(function(response) {
							$.each(response.data, function(index, element) {
								$scope.vendorOrderList.push(element);
							});
						});
					}

					$scope.vendorServiceOrders = function() {
						$scope.showProduct = 0;
						$scope.vendorAdd = 0;

						$scope.vendorServiceOrderList = [];
						$scope.showVendorHome = 0;

						$scope.showVendorServiceHome = 0
						$scope.showVendorServiceOrders = 1;
						$scope.showVendorProfile = 0;
						$scope.showVendorAgreement = 0;

						$http.get('getVendorServiceOrders', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(function(response) {
							$.each(response.data, function(index, element) {
								console.log('VENDOR ORDERS' + element);
								$scope.vendorServiceOrderList.push(element);
							});
						});
					}

					// ************************ DISPATCH ORDER
					$scope.dispatchProduct = function(consumerPriceID) {
						$scope.vendorOrderList = [];
						$scope.showVendorHome = 0;
						$scope.showVendorOrders = 1;
						var data = new FormData();
						data.append('userEmail', localStorage
								.getItem('userEmail'));
						data.append('consumerPriceID', consumerPriceID);

						$http
								.post('dispatchOrder', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function() {
											bootbox
													.alert('User will be notified with the order status');
											$scope.vendorOrders();
										})
					}

					// ************************ Suresh - DISPATCH ORDER
					$scope.dispatchServiceOrder = function(consumerPriceID) {
						$scope.showProduct = 0;
						$scope.vendorAdd = 0;
						$scope.vendorOrderList = [];
						$scope.showVendorHome = 0;
						$scope.showVendorOrders = 0;

						$scope.showVendorServiceHome = 0;
						$scope.showVendorServiceOrders = 1;

						var data = new FormData();
						data.append('userEmail', localStorage
								.getItem('userEmail'));
						data.append('consumerPriceID', consumerPriceID);

						$http
								.post('dispatchServiceOrder', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function() {
											bootbox
													.alert('User will be notified with the order status');
											$scope.vendorServiceOrders();
										})
					}

					// **************************** GET VENDOR PROFILE
					$scope.getVendorProfile = function() {
						$scope.showVendorHome = 0;
						$scope.showVendorOrders = 0;
						$scope.showVendorProfile = 1;
						$scope.showVendorAgreement = 0;
						$scope.scroll = 0;
						$http.get('getProfile', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(function(response) {
							$scope.profileData = response.data;
						});
					}
					
					$scope.vendorAgreement = function() {
						$scope.showVendorHome = 0;
						$scope.showVendorProfile = 0;
						$scope.showVendorOrders = 0;
						$scope.scroll = 0;
						$scope.showVendorAgreement = 1;
					}

					$scope.uploadProposal = function() {

						var formData = new FormData();
						var file = this.myFile;
						if (file) {
							console.log(file);
							var serviceURL = 'uploadProposal';
							// fileUpload.uploadFileToURL(file, serviceURL,
							// jobID);
							$scope.uploadFileToURL(file, serviceURL);
							/*
							 * $('#proposalForm').hide();
							 * $('#proposalMessage').show();
							 * $location.path('/login');
							 */
						} else {
							alert('Please choose a valid file name');
						}
					}

					$scope.uploadFileToURL = function(file, uploadUrl) {
						console.log('uploadFileToURL');
						var fd = new FormData();
						fd.append('file', file);
						console.log(fd);
						$http.post(uploadUrl, fd, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function(resp) {
							console.log('success');
						}).error(function() {

						});
					}

					$scope.getvendorAgreement = function() {
						$scope.loading = true;
						$http
								.get(
										'getvendorAgreement',
										{
											params : {
												'vendorEmail' : localStorage
														.getItem('userEmail')
											}
										})
								.then(
										function(response) {
											console.log(response)
											$scope.agreementAcceptanceResponse = response.data;
											$scope.vendorAgreementText = response.data.vendorAgreementText;
											$scope.loading = false;
										});
					}

					$scope.agreementAcceptanceResponse;
					$scope.respondToAgreement = function(acceptanceStatus) {
						var data = new FormData();

						data.append('vendorEmail', localStorage
								.getItem('userEmail'));
						data.append('acceptanceStatus', acceptanceStatus)
						$http
								.post('respondToAgreement', data, {
									withCredentials : false,
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									}
								})
								.success(
										function(response) {
											$scope.agreementAcceptanceResponse = response;
											bootbox
													.alert('Thanks for accepting the agreement!')
											$location.path('/vendorHome');
										}).error(function() {
								});
					}

					$scope.profile = function() {
						var data = new FormData();
						data.append('userName', $scope.userEmail);
						$http
								.get(
										'getProfile',
										{
											params : {
												'userEmail' : localStorage
														.getItem('userEmail')
											}
										})
								.then(
										function(response) {
											$scope.profileData = response.data;
											$scope.address = $scope.profileData.userAddressOne
													+ '\n'
													+ $scope.profileData.userAddressTwo
													+ '\n'
													+ $scope.profileData.userCity;
											$scope.phoneNumber = $scope.profileData.userPhonenumber;
											console.log($scope.profileData);
										});

					}

					$scope.fetchProfile = function() {
						if (localStorage.getItem('userEmail') == null) {
							bootbox.alert('Please login to proceed')
						} else {
							$scope.profile();
							$scope.parent.createServices = 1;
							$scope.parent.showServiceOrderHistory = 0;
						}
					}

					// ********************* GET USER PROFILE
					$scope.getProfile = function() {
						$window.scrollTo(0, 0);
						$scope.setNavigationChecks('showMyProfile', 'products');
						$scope.profile();
					}

					// ********************* UPDATE USER PROFILE
					$scope.profileData = {};
					$scope.updateProfile = function() {
						$window.scrollTo(0, 0);
						$scope.setNavigationChecks('showMyProfile', 'products');
						var data = new FormData();
						data.append('userEmail', localStorage
								.getItem('userEmail'));
						data.append('userName', $scope.userName);
						data.append('phoneNumber',
								$scope.profileData.userPhonenumber);
						data.append('addressOne',
								$scope.profileData.userAddressOne);
						data.append('addressTwo',
								$scope.profileData.userAddressTwo);
						data.append('city', $scope.profileData.userCity);
						data.append('state', $scope.profileData.userState);
						data.append('country', $scope.profileData.userCountry);
						data.append('zipcode', $scope.profileData.zipCode);
						$http.post('updateProfile', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function() {
							bootbox.alert('Profile updated successfully');
						})
					}

				});
