cdc
		.controller(
				'productController',
				function($scope, $location, $resource, $window, $http, cart,
						$compile, AutoRetriever, $sce, $timeout) {
					
					// cfpLoadingBar.start();
					
					
					
					$scope.loadingContractManagement = false;
					 $timeout(function() { $scope.loadingContractManagement = true; }, 5000);
					
					$scope.from_one = {
						      from_one :'<strong>bold data in controller in from_one.js</strong>'
						    }
					$scope.itemsVisibility = 0;
					$scope.paymentVisibility = 0;
					$scope.cards = 0;
					$scope.ewallet = 0;
					$scope.cod = 0;
					
					$scope.cartChecked = 0;
					
					$(function() {
						
						$('img').on('click', function() {
							$('.enlargeImageModalSource').attr('src', $(this).attr('src'));
							$('#enlargeImageModal').modal('show');
						});
						
						
						var navMain = $("#navbar");
						navMain.on("click", "a", null, function() {
							navMain.collapse('hide');
						});

						$('.navbar-collapse ul li a:not(.dropdown-toggle)')
								.click(function() {
									$('.navbar-toggle:visible').click();
								});
					});
								
					$('#homeMenu').click(function(event) {
						$(".navbar-collapse").collapse('hide');
					});

					$('.navbar-nav li a').click(function(evt) {
						$(".navbar-collapse").collapse('hide');
					});

					$scope.result = '';
					$scope.vendorCheck = 0;
					$scope.serviceProviderCheck = 0;
					$scope.defaultSearch = 1;
					$scope.homeClicked = 1;
					$scope.loginCheck = 0;
					$scope.scroll = 1;
					$scope.products = 0;
					$scope.showelectronics = 0;
					$scope.showFurnitures = 0;
					$scope.showConsumerCart = 0;
					$scope.showConsumerServiceCart = 0;
					$scope.showUserQuotes = 0;
					$scope.showQuoteConfirmation = 0;
					$scope.showMyProfile = 0;
					$scope.showAcceptedQuotes = 0;
					$scope.showAcceptedServiceQuotes = 0;
					$scope.showOrderedItems = 0;
					$scope.showOrderedServiceItems = 0;
					$scope.showServices = 0;
					$scope.serviceDisplay = 0;
					$scope.showCheckout = 0;
					$scope.homeDisplay = 0;
					$scope.editPrice = 0;
					$scope.userName = localStorage.getItem('userName');
					$scope.userEmail = localStorage.getItem('userEmail');
					localStorage.setItem('category', 'PRODUCTS');
					// $scope.vendorCartList =
					// localStorage.getItem('vendorCart');
					$scope.vendorLocation = '';
					$scope.cartCount = 0;
					$scope.userEmailCheck = 0;
					$scope.cartByUser = [];
					$scope.serviceVendor = [];
					$scope.phoneNumber;
					$scope.searchMessage = ''
					$scope.searchString = '';
					// Payment animations
					$("#nextbutton").animate({
						right : "-200px"
					});
					$scope.paynow = 0;
					$scope.paymentdiv = 0;
					$scope.creditcardshow = 0;

					if (localStorage.getItem('userName')) {
						$scope.loginCheck = 1;
					}

					// MOVE THIS TO DB LATER
					var productString = 'ELECTRONICS, MOBILE, WATCHES, FURNITURE, TABLETS, LAPTOPS, BOOKS, MOVIES, MUSIC, GAMES, CAMERAS, VIDEOPRODUCTS, KITCHENACCESSORIES, BABYPRODUCTS, BEAUTYPRODUCTS, PETS, TOYS, SPORTS, FITNESS, OUTDOOR, CLOTHINGANDACCESSORIES, JEWELS, EYEWEAR, LUGGAGES, SHOES, CARS, AUTOMOBILES, KINDLEPRODUCTS, COMPUTERACCESSORIES, SOFTWARE, PENS, HARDDRIVES, PENDRIVES, MEMORYCARDS, PRINTERSANDINK, INTERNETDEVICES, STATIONERY, CAMPINGPRODUCTS, HIKINGPRODUCTS, SWIMMINGKIT, FANS, SOFA, COT, HEADPHONES';
					var serviceString = 'LAUNDRY, CLEANING, HOUSE,	SERVICES ';

					$scope.suggestionText = 'What do you like to do?'

					// Build the auto suggestion, later pull this from DB
					var suggestedList = [];
					$scope.setSuggesterChecks = function(vendorCheck,
							defaultSearch, serviceProviderCheck, vendor) {
						$scope.vendorCheck = vendorCheck;
						$scope.defaultSearch = defaultSearch;
						$scope.serviceProviderCheck = serviceProviderCheck;
						$scope.vendor = vendor;
					}

					$scope.setSuggester = function(type) {
						switch (type) {
						case "products":
							$scope.setSuggesterChecks(0, 1, 0, 0);
							$scope.suggestionText = 'What do you like to buy in Products? Mobile, Sofa..'
							localStorage.setItem('category', 'PRODUCTS');
							break;
						case "vendor":
							$scope.setSuggesterChecks(1, 0, 0, 1);
							break;
						case "serviceProvider":
							$scope.setSuggesterChecks(0, 0, 1, 1);
							break;
						case "availServices":
							$scope.setSuggesterChecks(0, 1, 0, 0);
							$scope.suggestionText = 'Please specify the service that you are looking for..'
							localStorage.setItem('category', 'SERVICES');
							break;
						default:
							$scope.placeholderText = "Eg: I would like to buy a Mobile, I would like to avail a Cleaning service";
						}
					}

					// DO SOMETHING WHEN THE USER STARTS ENTERING KEYS FOR
					// SEARCH
					var category = localStorage.getItem('category');
					$scope.doSomething = function(typedText) {
						$scope.newmovies = AutoRetriever.getmovies(typedText);
						$scope.newmovies.then(function(data) {
							$scope.dataString = data;
						});
					}

					$scope.doSomethingElse = function(userSearchText) {
						$scope.searchString = userSearchText;
					}

					// ********** HOME FUNCTION
					$scope.setNavigationChecks = function(flagCheckOne,
							flagCheckTwo) {

						var listFlagChecks = [];
						listFlagChecks.push(flagCheckOne);
						listFlagChecks.push(flagCheckTwo);
						$scope.scroll = 0, $scope.products = 0,
								$scope.showelectronics = 0,
								$scope.showFurnitures = 0,
								$scope.showServices = 0,
								$scope.showReviews = 0,
								$scope.showContract = 0,
								$scope.showConsumerCart = 0,
								$scope.showQuoteConfirmation = 0;
						$scope.showConsumerServiceCart = 0,
								$scope.showUserQuotes = 0,
								$scope.showCheckout = 0,
								$scope.showServiceUserQuotes = 0;
						$scope.showAcceptedQuotes = 0,
								$scope.showAcceptedServiceQuotes = 0,
								$scope.showOrderedItems = 0,
								$scope.showOrderedServiceItems = 0,
								$scope.createServices = 0,
								$scope.showMyProfile = 0,
								$scope.showReviewItems = 0,
								$scope.homeClicked = 0,
								$scope.showServicesCustom = 0;
								$scope.myorderDisplay = 0;
								$scope.showServiceOrderHistory = 0;

						for (x = 0; x < listFlagChecks.length; x++) {
							switch (listFlagChecks[x]) {
							case 'scroll':
								$scope.scroll = 1;
								break;
							case 'products':
								$scope.products = 1;
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
							case 'showContract':
								$scope.showContract = 1;
								break;
							case 'showConsumerCart':
								$scope.showConsumerCart = 1;
								break;
							case 'showConsumerServiceCart':
								$scope.showConsumerServiceCart = 1;
								break;
							case 'showUserQuotes':
								$scope.showUserQuotes = 1;
								break;
							case 'showServiceUserQuotes':
								$scope.showServiceUserQuotes = 1;
								break;
							case 'showQuoteConfirmation':
								$scope.showQuoteConfirmation = 1;
								break;
							case 'showAcceptedQuotes':
								$scope.showAcceptedQuotes = 1;
								break;
							case 'showAcceptedServiceQuotes':
								$scope.showAcceptedServiceQuotes = 1;
								break;
							case 'showOrderedItems':
								$scope.showOrderedItems = 1;
								break;
							case 'showOrderedServiceItems':
								$scope.showOrderedServiceItems = 1;
								break;
							case 'createServices':
								$scope.createServices = 1;
								break;
							case 'showCheckout':
								$scope.showCheckout = 1;
								break;
							case 'showMyProfile':
								$scope.showMyProfile = 1;
								break;
							case 'showReviewItems':
								$scope.showReviewItems = 1;
								break;
							case 'homeDisplay':
								$scope.homeDisplay = 1;
								break;
							case 'showServicesCustom':
								$scope.showServicesCustom = 1;
								break;
							case 'myorderDisplay':
								$scope.myorderDisplay = 1;
								break;
							case 'showServiceOrderHistory':
								$scope.showServiceOrderHistory = 1;
								break;								
							}
						}
					}
					
					$scope.parent = {}
					$scope.parent.showServiceOrderHistory = 1;
					$scope.setShowServiceOrderHistory = function(){
						$scope.parent.showServiceOrderHistory = 1;
						$scope.parent.createServices = 0;
					}

					// HOME PAGE CALL TO DECIDE THE ROUTING OF THE USER
					$scope.getProductsServices = function(searchString) {
						$scope.searchMessage = '';
						var tepSearchText = '';
						var selectedTextList = searchString.split(' ');
						if (selectedTextList != '') {
							for (i = 0; i < selectedTextList.length; i++) {
								if (productString.indexOf(selectedTextList[i]
										.toUpperCase()) > -1) {
									$scope.setNavigationChecks(
											'showelectronics', 0);
									tepSearchText = selectedTextList[i];
									break;
								} else if (serviceString
										.indexOf(selectedTextList[i]
												.toUpperCase()) > -1) {
									$scope.setNavigationChecks('showServicesCustom',
											'createServices');
									tepSearchText = selectedTextList[i];
									break;
								} else {
									$scope.searchMessage = 'Please refine your search or Choose the categories to browse';
									tepSearchText = "";
								}
							}
						} else {
							$scope.searchMessage = 'Please enter a valid text';
						}

						if ($scope.showServices == 1) {
							$scope.createService();
							$http.get('selectVendor', {
								params : {
									'catselected' : tepSearchText
								}
							}).then(function(response) {
								$scope.serviceVendor = response.data;
							});
						} else {
							$http
									.get('findAllByPartialSearch', {
										params : {
											'partialSearchText' : tepSearchText
										}
									})
									.then(
											function(response) {
												console.log(response);
												if (response.data != '') {
													$scope.electronicProductList = response.data;

												} else
													$scope.searchMessage = 'Please refine your search or Choose the categories to browse';
											});
						}
					}

					// PAGINATION
					$scope.curPage = 0;
					$scope.pageSize = 4;

					$scope.numberOfPages = function(list) {
						if (list) {
							return Math.ceil(list.length / $scope.pageSize);
						}
					};
					
					$scope.contractPageSize = 10;

					$scope.contractNumberOfPages = function(list) {
						if (list) {
							return Math.ceil(list.length / $scope.contractPageSize);
						}
					};
					
					$scope.services = [];
					$scope.getServicesCustom = function() {
						// $scope.getVendorServiceSubmitted();
						
						$scope.services = [];
						$window.scrollTo(0, 0);
						// $scope.myorderDisplay = 1;
						// $scope.setNavigationChecks('showServiceUserQuotes','products');
						$scope.parent.showServiceOrderHistory = 1;
						$scope.parent.createServices = 0;
						
						$scope.emailId = localStorage.getItem('userEmail');						
						$http.get('createServiceOrders').then(
								function(response) {
									angular.forEach(response.data, function(
											element, index) {
										$scope.services.push(element);
									})
									$scope.getVendorServiceSubmitted();
									});						
					}
					
					// Suresh - Submitted Order for Vendor Approval
					$scope.vendorServiceOrderList = [];
					$scope.getVendorServiceSubmitted = function(userEmail) {
						$scope.individualOrderDetail = [];
						$scope.vendorServiceOrderList = [];
						var data = new FormData();
						data.append('userName', localStorage.getItem('userEmail'));
						
						$http.get('getVendorServiceSubmitted', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(function(response) {
							console.log(response);
							$.each(response.data,
									function(
											index,
											element) {
										$scope.vendorServiceOrderList
												.push(element);
									});
						});
					}
					
					// Suresh - pull vendor approval status and details
					$scope.orderVendorApprovalDetail = [];
					$scope.serviceVendorActionExist = 0;
					$scope.showOrderVendorApprovals = function(element) {
						$scope.orderVendorApprovalDetail = [];
						$scope.serviceVendorActionExist = 0;
						$window.scrollTo(0, 0);
						// $scope.myorderDisplay = 1;
						
						// $scope.setNavigationChecks('myorderDisplay', 1);
						var data = new FormData();
						data.append('orderMasterId', element.orderMasterId);
						
						$http.get('getOrderVendorApprovals', {
							params : {
								'orderMasterId' : element.orderMasterId
							}
						}).then(function(response) {
							console.log(response);
							$.each(response.data,
									function(
											index,
											element) {
										console.log("==================================");
										console
												.log(element);
										console.log("==================================");
										
										/*
										 * for(var i =
										 * element.vendorOrderAction.length - 1;
										 * i >= 0; i--){
										 * if(element.vendorOrderAction[i].vendor.vendorEmail !=
										 * localStorage.getItem('userEmail')){
										 * element.vendorOrderAction.splice(i,1); } }
										 */
										
										$scope.orderVendorApprovalDetail
												.push(element);
										console.log($scope.orderVendorApprovalDetail.vendorOrderAction);
										$scope.serviceVendorActionExist = $scope.orderVendorApprovalDetail[0].vendorOrderAction.length;
									});
									
									
						});
					}
					
					// Suresh - Choose vendor who accepted - in Order level
					$scope.vendorServiceOrderList = [];
					$scope.chooseVendor = function(element, element1) {
						// $scope.vendorServiceOrderList = [];
						
						$window.scrollTo(0, 0);
						// $scope.myorderDisplay = 1;
						
						$scope.orderVendorApprovalDetail = [];
						
						$scope.setNavigationChecks('myorderDisplay', 0);
						var data = new FormData();
						data.append('orderMasterId', element.orderMasterId);
						data.append('orderId', element.orderId);
						data.append('productId', element.service.productid);
						data.append('vendorEmail', element1.vendor.vendorEmail);
						
						$http.post('chooseVendor', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).then(function(response){
							console.log(response);
							$.each(response.data,
									function(
											index,
											element) {
										console
												.log(element);
										
										/*
										 * for(var i =
										 * element.vendorOrderAction.length - 1;
										 * i >= 0; i--){
										 * if(element.vendorOrderAction[i].vendor.vendorEmail !=
										 * element1.vendor.vendorEmail){
										 * element.vendorOrderAction.splice(i,1); } }
										 * $scope.orderVendorApprovalDetail.push(element.vendorOrderAction);
										 * console.log($scope.orderVendorApprovalDetail);
										 */
										
										$scope.showOrderVendorApprovals(element);
										
										
									});
						});
						
						
					}
					
					// Suresh - Submit Service Order
					
					$scope.submitServiceOrder = function(element){
						$window.scrollTo(0, 0);
						// $scope.myorderDisplay = 1;
						
						$scope.individualOrderDetail = [];
						
						console.log("Suresh - Started Checking the Order submission!!!!!!!!!");
						console.log(element);
						console.log(element.service.productName)
						console.log("Suresh - End Checking the Order submission!!!!!!!!!");
						
						$scope.setNavigationChecks('myorderDisplay', 0);
						var data = new FormData();
						data.append('orderMasterId', element.orderMasterId);
						data.append('servicingDate', element.user.dateCreated);
						data.append('userName', element.user.userEmail);
						data.append('serviceName', element.service.productName);
						
						$http.post('submitServiceOrder', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).then(function(response){
							console.log(response);
							$.each(response.data,
									function(
											index,
											element) {
										console
												.log(element);
										
										bootbox
										.alert('Service Order has been successfully submitted !!!!');
										
										$scope.
										individualOrderDetail.push(element);
									});
						});
					}
					
					// Suresh - pull individual order detail and show in UI -
					// including vendor actions(if it has been approved by
					// vendor)
					$scope.individualOrderDetail = [];
					$scope.showOrderDetails = function(element) {
						$scope.individualOrderDetail = [];
						$scope.individualOrderDetail.push(element);
						
						$window.scrollTo(0, 0);
						// $scope.myorderDisplay = 1;
						
						$scope.setNavigationChecks('myorderDisplay', 0);
					}

					// Sets the price edit as readonly
					$scope.editPrice = false;
					if (localStorage.getItem('userType') == 'consumer') {
						$scope.showVendorHome = 0
						$scope.products = 0;
						$scope.cartCount = (+localStorage
								.getItem('cartProductLegth'))
								+ (+localStorage.getItem('cartServiceLegth'));
					} else {
						$scope.showVendorHome = 1
						$scope.products = 1;
					}

					String.prototype.capitalizeFirstLetter = function() {
						return this.charAt(0).toUpperCase() + this.slice(1);
					}

					// *********************** GET PRODUCT LIST
					$scope.productList = [];
					$scope.categoryList = [];
					$scope.subCategoryList = [];
					$scope.itemCategoryList = [];
					$scope.getProductList = function() {
						var tempCategoryCheck = 0;
						var tempSubCategoryCheck = 1;
						var tempSubCategoryStarted = 0;
						var elementID = angular.element(document
								.querySelector('#productCategory'));
						var serviceCheck = 0;
						$http.get('getProductList').then(function(response) {
							$scope.productList = response.data;
							tempElement = cart.buildMenu(response);
							elementID.append($compile(tempElement)($scope));
						});
					}
					
					$scope.getProductList();
					
					if (localStorage.getItem('userType') == 'vendor')
						$location.path('/vendorHome');
					else if (localStorage.getItem('userType') == 'vendorService')
						$location.path('/vendorServiceHome');
					else
						$location.path('/cdc');

					$scope.home = function() {
						// if ($scope.showelectronics == 1)
						// $scope.consumerCart();
						// else if ($scope.serviceDisplay == 1)
						// $scope.consumerServiceCart();
						$scope.setNavigationChecks('scroll', 'products');
						$scope.searchMessage = '';
						if (localStorage.getItem('userType') == 'vendor')
							$location.path('/vendorHome');
						else if (localStorage.getItem('userType') == 'vendorService')
							$location.path('/vendorServiceHome');
						else
							$location.path('/cdc');
					}

					// **************** REVIEWS
					$scope.reviews = function() {
						$window.scrollTo(0, 0);
						// $scope.consumerCart();
						$scope.setNavigationChecks('showReviews', 0);
					}
					
					// ************* GET SERVICES soumya
					$scope.getservices = function() {
						$window.scrollTo(0, 0);
						$scope.individualOrderDetail = [];
						$scope.setNavigationChecks('showServicesCustom', 'showServiceOrderHistory');
					}

					// Service Order creation - GET the category and other
					// details and create
					$scope.submitOrder = function(vendor, location,
							selectedCategory) {
						alert("Ready to submit Order !!!!!");
					}

					$scope.selectLocation = function(vendor, catselected) {
						$scope.serviceLocations = [];
						$scope.setNavigationChecks('createServices', 0);
						$http
								.get('selectServiceLocations', {
									params : {
										'catselected' : catselected,
										'vendor' : vendor
									}
								})
								.then(
										function(response) {
											console.log(response.data);
											$.each(response.data, function(
													index, elements) {
												console.log(elements);
												elements.rating = '';
												$scope.serviceLocations
														.push(elements);
											});

											$scope.serviceLocationLegth = response.data.length;
											localStorage
													.setItem(
															'orderLength',
															$scope.serviceLocationLegth);
											$scope.serviceLocationCount = $scope.serviceLocationLegth;
										});

					}

					$scope.selectVendor = function(catselected) {
						$scope.serviceVendor = [];
						$scope.setNavigationChecks('createServices',
								'showServices');
						$http
								.get('selectVendor', {
									params : {
										'catselected' : catselected
									}
								})
								.then(
										function(response) {
											console.log(response.data);
											$scope.serviceVendor = response.data;

											$scope.serviceVendorLegth = response.data.length;
											localStorage.setItem('orderLength',
													$scope.serviceVendorLegth);
											$scope.serviceVendorCount = $scope.serviceVendorLegth;
											// $scope.orderReview.rating = '';
										});

					}
					
					// soumya
					$scope.selectVendorCustom = function(catselected) {
						$scope.serviceVendor = [];
						$scope.selectedCategory = catselected;
						$http
								.get('selectVendor', {
									params : {
										'catselected' : catselected
									}
								})
								.then(
										function(response) {
											console.log(response.data);
											$scope.serviceVendor = response.data;

											$scope.serviceVendorLegth = response.data.length;
											localStorage.setItem('orderLength',
													$scope.serviceVendorLegth);
											$scope.serviceVendorCount = $scope.serviceVendorLegth;
											// $scope.orderReview.rating = '';
										});

					}
					
					$scope.parent = {};
					// Date date = new Date(
					$scope.bookService = function() {
						if(localStorage.getItem('userEmail')) {
						var data = new FormData();
						data.append('servicingDate',
								convert($scope.parent.serviceRequestedDate));
						if ($scope.serviceSpecificInfo == 1
								&& $scope.laundryForm == 1) {
							data.append('additionalInfo', $scope.parent.netwt);
						} else if ($scope.serviceSpecificInfo == 1
								&& $scope.residentialCleaningForm == 1) {
							data.append('additionalInfo',
									$scope.parent.cleaning);
						} else if ($scope.serviceSpecificInfo == 1
								&& $scope.repairGadgetsForm == 1) {
							data.append('additionalInfo',
									$scope.parent.gadgettype);
						}
						data.append('additionalInfo',
								"Test Information");
						data.append('timeslot', $scope.parent.timeslot);
						data.append('comment', $scope.comment);
						data.append('servicingDate',
								$scope.parent.serviceRequestedDate);
						data.append('userName', $scope.userName);
						data.append('serviceName', $scope.selectedCategory);
						data.append('serviceLocation', $scope.parent.serviceLocation);
						$http.post('saveServiceOrder', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).then(function(response) {
							$('.modal-backdrop').remove();
							bootbox.alert('Congratulation - You have successfully placed Order for further process !!!!');
							// $scope.getVendorServiceSubmitted();
							$window.scrollTo(0, document.body.scrollHeight);
							// $scope.serviceorder.$setPristine();
							$scope.getServicesCustom();

						});
						} else {
							bootbox.alert('Please login to proceed');
						}
					}
					
					function convert(str) {
						var date = new Date(str), mnth = ("0" + (date
								.getMonth() + 1)).slice(-2), day = ("0" + date
								.getDate()).slice(-2);
						return [ day, mnth, date.getFullYear() ].join("-");
					}

					
					// soumya ends
					$scope.createService = function() {
						$window.scrollTo(0, 0);
						// $scope.vendorSelect = 0;
						$scope.setNavigationChecks('createServices',
								'showServices');
						$scope.serviceCategories = [];
						$http
								.get('createServiceOrders', {
									params : {}
								})
								.then(
										function(response) {
											console.log(response.data);
											$.each(response.data, function(
													index, elements) {
												console.log(elements);
												elements.rating = '';
												$scope.serviceCategories
														.push(elements);
											});

											// $scope.consumerCartList =
											// response.data;
											console
													.log($scope.serviceCategories);
											$scope.serviceOrderLegth = response.data.length;
											localStorage.setItem('orderLength',
													$scope.serviceOrderLegth);
											$scope.ServiceOrderCount = $scope.serviceOrderLegth;
											// $scope.orderReview.rating = '';
										});

					}
					// ********************

					$scope.createService = function() {
						$window.scrollTo(0, 0);
						// $scope.vendorSelect = 0;
						$scope.setNavigationChecks('createServices',
								'showServices');
						$scope.serviceCategories = [];
						$http
								.get('createServiceOrders', {
									params : {}
								})
								.then(
										function(response) {
											console.log(response.data);
											$.each(response.data, function(
													index, elements) {
												console.log(elements);
												elements.rating = '';
												$scope.serviceCategories
														.push(elements);
											});

											// $scope.consumerCartList =
											// response.data;
											console
													.log($scope.serviceCategories);
											$scope.serviceOrderLegth = response.data.length;
											localStorage.setItem('orderLength',
													$scope.serviceOrderLegth);
											$scope.ServiceOrderCount = $scope.serviceOrderLegth;
											// $scope.orderReview.rating = '';
										});

					}
					// ********************
					
					// *********CONTRACT MANAGEMENT *******
					$scope.contract = function() {
						$window.scrollTo(0, 0);
						// $scope.consumerCart();
						$scope.setNavigationChecks('showContract', 0);
					}


					// *************** GET DETAIL FOR THE SELECTED ORDERS
					$scope.getOrderDetails = function(reviewId) {
						$window.scrollTo(0, 0);
						$scope.orderDetails = [];
						$scope.setNavigationChecks('showReviews', 0);
						$http.get(
								'getOrderDetails',
								{
									params : {
										'userEmail' : localStorage
												.getItem('userEmail'),
										'reviewId' : reviewId
									}
								}).then(
								function(response) {
									$.each(response.data, function(index,
											elements) {
										elements.rating = '';
										$scope.orderDetails.push(elements);
									});

									// $scope.consumerCartList = response.data;
									$scope.orderLegth = response.data.length;
									localStorage.setItem('orderLength',
											$scope.orderLegth);
									$scope.orderCount2 = $scope.orderLegth;
									// $scope.orderReview.rating = '';
								});
					}

					// ******************** UDPATE REVIEWS AND DISPLAY IT IN
					// REVIEW PAGE
					$scope.parent = {};
					$scope.updateReviews = function(reviewId, rating) {
						$scope.rating = 5;
						$window.scrollTo(0, 0);
						$scope.orderReviewDetails = [];
						$scope.setNavigationChecks('showReviews', 0);
						var data = new FormData();
						data.append('userEmail', localStorage
								.getItem('userEmail'));
						data.append('reviewId', reviewId);
						data.append('rating', rating);
						data.append('comments', $scope.parent.reviewcomments);
						data.append('reviewtitle', $scope.parent.reviewtitle);
						$http.post('updateReviews', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function(response) {
							$scope.getOrders();
						});
					}

					// ******************** PICK ALL ORDERS AND DISPLAY FOR
					// REVIEW
					// $window.onload
					$scope.getOrders = function() {
						// $window.onload = function() {
						$window.scrollTo(0, 0);
						$scope.orderAllList = [];
						$scope.setNavigationChecks('showReviews', 0);
						$http.get('getOrders', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(
								function(response) {
									$.each(response.data, function(index,
											element) {
										$scope.orderAllList.push(element);
									});

									// $scope.consumerCartList = response.data;
									$scope.orderLegth = response.data.length;
									localStorage.setItem('orderLength',
											$scope.orderLegth);
									$scope.orderCount = $scope.orderLegth;
									console.log($scope.orderAllList)
								});
					}

					// ***************************** DISPLAY REVIEWS AGAINST
					// PRODUCT
					// ab19000
					$scope.ratings = [ {
						current : 5,
						max : 5
					} ];

					$scope.avgPseudoRatingList = [];
					$scope.showReviewItems = 0;
					// ***************************** GET ELECTRONICS PRODUCTS
					// REVIEWS
					$scope.shopElectronicsReview = function(product_id) {
						$window.scrollTo(0, 0);
						$scope.setNavigationChecks('products',
								'showReviewItems');
						$scope.electronicProductReviewList = [];
						$http
								.get('getProductReviews', {
									params : {
										'productid' : product_id
									}
								})
								.then(
										function(response) {
											$scope.electronicProductReviewListLength = response.data.length;
											$scope.electronicProductReviewList = response.data;
											console
													.log($scope.electronicProductReviewList);
											$scope.avgPseudoRatingList = [ {
												avgrate : $scope.electronicProductReviewList[0].product.avgrating
											} ];
										});
					}
					// ends

					// ********************************8 VENDOR HOME
					$scope.vendorHome = function() {
						$scope.vendorCart();
						$scope.showVendorHome = 1;
						$scope.showVendorOrders = 0;
						$scope.showVendorProducts = 0;
						$scope.showReviewItems = 0;

						if (localStorage.getItem('userType') == 'consumer')
							$location.path('/cdc');
					}

					// ******************************** Suresh- VENDOR SERVICE
					// HOME
					$scope.vendorServiceHome = function() {
						$scope.vendorServiceCart();
						$scope.showVendorServiceHome = 1;
						$scope.showVendorServiceOrders = 0;
						$scope.showVendorServiceProducts = 0;
						$scope.showReviewItems = 0;
						if (localStorage.getItem('userType') == 'consumer')
							$location.path('/cdc');
					}

					$scope.successRateCheck = function() {
						$scope.successRatePer = 82;
					}

					// ****************************** Populating the product
					// list for electronics
					$scope.productList = {
						'type' : 'select',
						'name' : 'product',
						'value' : 'Electronics',
						'values' : [ 'Tablet', 'Computer', 'Laptop' ]
					};

					// *****************************LOGIN
					$scope.vendorCartList = [];
					$scope.login = function() {
						$scope.createServices = 0;
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
										function(resp) {
											if (resp[0] != null) {
												$scope.userName = resp[0].userName;
												$scope.userID = resp[0].userID;
												localStorage.setItem(
														'userName',
														$scope.userName);
												localStorage.setItem('userID',
														$scope.userID);
												localStorage.setItem(
														'userEmail',
														$scope.email);
												$scope.userType = resp[0].userType;
												localStorage.setItem(
														'userType',
														$scope.userType);
												$scope.loginCheck = 1;
												$('.modal-backdrop').remove();
												$('.in').remove();
												$scope.homeClicked = 0;
												$scope.userEmailCheck = 1;
												if (resp[0].userType == 'vendor') {
													/*
													 * if(resp[0].userStatus ==
													 * 'pending') {
													 * localStorage.setItem('userStatus','Pending');
													 * $location.path('/agreement'); }
													 * else {
													 */
													cart
															.vendorCart(
																	localStorage
																			.getItem('userEmail'))
															.then(
																	function(
																			response) {
																		$
																				.each(
																						response.data,
																						function(
																								index,
																								element) {
																							$scope.vendorCartList
																									.push(element);
																							
																						});
																	})
													$location
															.path('vendorHome');
													// }
												} else if (resp[0].userType == 'vendorService') {
													cart
															.vendorCart(
																	localStorage
																			.getItem('userEmail'))
															.then(
																	function(
																			response) {
																		$
																				.each(
																						response.data,
																						function(
																								index,
																								element) {
																							$scope.vendorCartList
																									.push(element);
																						});
																	})
													$location
															.path('/vendorServiceHome');
												} else {
													$scope.consumerCart();
													$scope.cartCount = localStorage
															.getItem('cartLength');
													console
															.log(localStorage
																	.getItem('cartLength'));
													$scope.setNavigationChecks(
															'scroll',
															'products');
													$location.path('/cdc');
												}
												$window.scrollTo(0, 0);
											} else {
												$scope.errorMessage = 'Invalid Login';
											}
										}).error(function() {
									$scope.errorMessage = 'Invalid Login';
								});
					}
					$scope.cartCount = localStorage.getItem('cartLength');

					// ***************************** SIGN UP
					$scope.signup = function() {
						var data = new FormData();
						data.append('userName', $scope.signupFullname);
						data.append('userEmail', $scope.signupEmail);
						data.append('userPassword', $scope.signupPassword);
						data.append('vendorLocation', $scope.vendorLocation);
						data.append('serviceType', $scope.serviceType);
						data.append('proser', $scope.proser);
						if ($scope.signupEmail != null
								&& $scope.signupPassword != null) {
							$http(
									{
										url : 'getProfile',
										method : "GET",
										dataType : "json",
										headers : {
											'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
										},
										params : {
											'userEmail' : $scope.signupEmail
										}
									})
									.then(
											function(response) {
												if (response.data == '') {
													$http
															.post(
																	'signup',
																	data,
																	{
																		withCredentials : false,
																		transformRequest : angular.identity,
																		headers : {
																			'Content-Type' : undefined
																		}
																	})
															.success(
																	function(
																			resp) {
																		$(
																				'.modal-backdrop')
																				.remove();
																		$('.in').remove();
																		bootbox
																				.alert('Please check your email to authenticate/activate your Email ID');
																		$location
																				.path('/cdc');
																		// $('#signupConfirmation').modal('show');
																	})
															.error(
																	function() {
																		console
																				.log('My Error');
																		$location
																				.path('/cdc');
																	});
												} else {
													$scope.errorMessage = 'User already exists. Please try again'
												}
											})
						}
					}

					// ***************************** LOGOUT
					$scope.logout = function() {
						$scope.showVendorServiceHome = 0;
						$scope.showVendorServiceOrders = 0;
						$scope.showVendorServiceProducts = 0;

						$scope.setNavigationChecks('scroll', 'products');

						$scope.userName = null;
						localStorage.removeItem('userName');
						localStorage.removeItem('userEmail');
						$scope.loginCheck = 0;
						$scope.cartCount = 0;
						if (localStorage.getItem('userType') == 'consumer') {
							localStorage.removeItem('userType')
							localStorage.removeItem('CartLength');
							$scope.home();
							$location.path('/cdc');
						}

						else {
							localStorage.removeItem('userType');
							$location.path('/cdc');
						}

					}

					$('.dropdown-submenu a.submenu1').on("click", function(e) {
						$('.dropdown-submenu ul.submenudrop2').hide();
						$(this).next('ul').toggle();
						e.stopPropagation();
						e.preventDefault();
					});

					$('.dropdown-submenu ul.submenudrop1').on("click",
							function(e) {
								$('.dropdown-submenu ul.submenudrop2').hide();
								$(this).hide('ul').toggle();
							});

					$('.dropdown-submenu a.submenu2').on("click", function(e) {
						$('.dropdown-submenu ul.submenudrop1').hide();
						$(this).next('ul').toggle();
						e.stopPropagation();
						e.preventDefault();
					});

					$('.dropdown-submenu ul.submenudrop2').on("click",
							function(e) {
								$('.dropdown-submenu ul.submenudrop1').hide();
								$(this).hide('ul').toggle();
							});
					$('html').click(function() {
						$('.dropdown-submenu ul.submenudrop1').hide();
						$('.dropdown-submenu ul.submenudrop2').hide();
					});

					$scope.parent = {};
					// ***************************** GET ELECTRONICS PRODUCTS
					$scope.shopElectronics = function(searchText) {
						$scope.searchField = searchText;
						$window.scrollTo(0, 0);
						$scope.parent.quantity = 1;
						$scope.setNavigationChecks('showelectronics',
								'products');
						$scope.electronicProductList = [];
						$http
								.get('getProducts', {
									params : {
										'category' : 'PRODUCTS',
										'subcategory' : 'ELECTRONICS'
									}
								})
								.then(
										function(response) {
											$scope.electronicProductListLength = response.data.length;
											$scope.electronicProductList = response.data;
											console
													.log($scope.electronicProductList)
										});
					}

					// **************************** GET FURNITURES PRODUCTS
					$scope.shopFurnitures = function(searchText) {
						$scope.searchField = searchText;
						$window.scrollTo(0, 0);
						$scope
								.setNavigationChecks('showFurnitures',
										'products');
						$scope.furnitureProductList = [];
						$http
								.get('getProducts', {
									params : {
										'category' : 'PRODUCTS',
										'subcategory' : 'FURNITURES'
									}
								})
								.then(
										function(response) {
											$scope.furnitureProductListLength = response.data.length;
											$scope.furnitureProductList = response.data;
										});

					}

					// ***************************** GET SERVICES CART
					$scope.shopServices = function(searchText) {
						$scope.createService();
						$scope.searchField = searchText;
						$window.scrollTo(0, 0);
						$scope.servicesProductList = [];
						$scope.setNavigationChecks('showServices', 'products');
						$http
								.get('selectVendor', {
									params : {
										'catselected' : searchText
									}
								})
								.then(
										function(response) {
											$scope.servicesProductListLength = response.data.length;
											$scope.serviceVendor = response.data;
											console.log('serviceVendor'
													+ $scope.serviceVendor);
										});
					}

					// ***************************** DISPLAY CONSUMER CART
					$scope.consumerCart = function() {
						$scope.loading = true;
						$window.scrollTo(0, 0);
						$scope.consumerCartList = [];
						$scope.setNavigationChecks('showConsumerCart',
								'products');
						$http.get('getConsumerCart', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(
								function(response) {
									$.each(response.data, function(index,
											element) {
										$scope.consumerCartList.push(element);
									});

									// $scope.consumerCartList = response.data;
									$scope.cartLegth = response.data.length;
									localStorage.setItem('cartLength',
											$scope.cartLegth);
									$scope.cartCount = $scope.cartLegth;
									$scope.loading = false;
								});
					}

					// ***************************** Suresh - Service - DISPLAY
					// CONSUMER CART
					$scope.consumerServiceCart = function() {
						$window.scrollTo(0, 0);
						$scope.showConsumerServiceCart = 1; 
						$scope.consumerServiceCartList = [];
						$scope.setNavigationChecks('showConsumerServiceCart',
								'products');
						$http
								.get(
										'getConsumerServiceCart',
										{
											params : {
												'userEmail' : localStorage
														.getItem('userEmail')
											}
										})
								.then(
										function(response) {
											console.log(response.data);
											$
													.each(
															response.data,
															function(index,
																	element) {
																console
																		.log(element)
																console
																		.log('Elementsssss'
																				+ element.product.productid);
																$scope.consumerServiceCartList
																		.push(element);
															});

											// $scope.consumerCartList =
											// response.data;
											console
													.log($scope.consumerServiceCartList);
											$scope.cartLegth = response.data.length;
											localStorage.setItem('cartLength',
													$scope.cartLegth);
											$scope.cartCount = $scope.cartLegth;
										});
					}

					// ***************************** VENDOR ORDERS
					$scope.vendorOrders = function() {
						$scope.showVendorHome = 0;
						$scope.showVendorOrders = 1;
						$scope.showVendorProducts = 0;
					}

					// ***************************** Suresh- VENDOR ORDERS
					$scope.vendorServiceOrders = function() {
						$scope.showVendorServiceHome = 0;
						$scope.showVendorServiceOrders = 1;
						$scope.showVendorServiceProducts = 0;
					}

					// Func to check if the user is signed in
					$scope.productPrice = function() {
						if (localStorage.getItem('userEmail') == null) {
							$('.modal-backdrop').remove();
							bootbox
									.alert('Please check your email to authenticate/activate your Email ID');
						}

					}

					// ************************ SUBMITTING THE ITEMS TO CART
					$scope.parent = {};
					$scope.submitQuote = function(productID) {
						if (localStorage.getItem('userEmail')) {
							var data = new FormData();
							data.append('userName', localStorage
									.getItem('userName'));
							data.append('userEmail', localStorage
									.getItem('userEmail'));
							data.append('productID', productID);
							data.append('userPrice', $scope.parent.priceQuote);
							data.append('quantity', $scope.parent.quantity);
							data.append('dateRequired',
									$scope.parent.dateRequired);
							$http
									.post('submitUserQuote', data, {
										withCredentials : false,
										transformRequest : angular.identity,
										headers : {
											'Content-Type' : undefined
										}
									})
									.success(
											function(resp) {
												console
														.log('submitQuote Success'
																+ resp);
												$('.modal-backdrop').remove();
												$scope.cartCount = Number($scope.cartCount) + 1;
												$scope.quoteOrdered = true;
												$scope.priceQuote = '';
												bootbox
														.alert('Your purchase is added to the cart.');
												$scope.parent.priceQuote = '';
												$scope.parent.quantity = 1;
											})
									.error(
											function() {
												$scope.userMessage = "There is some issue with the quote submission. Please try again."
											});
						} else {
							bootbox.alert('Please login to proceed');
						}
					}

					$scope.confirmQuote = function() {
						$scope.edit = 0;
						$scope.profile();
						$scope.quoteTax = 0;
						$scope.quoteTotal = 0;
						angular.forEach($scope.consumerCartList, function(value, index){
							$scope.quoteTax = +$scope.quoteTax  + +value.userPrice;
							
						})
						$scope.quoteTotal = $scope.quoteTax;
						$scope.quoteTax = $scope.quoteTax * .1;
						$scope.quoteTotal = $scope.quoteTotal + $scope.quoteTax;
						$scope.setNavigationChecks('showQuoteConfirmation',
								'products');
					}

					// *********************** Suresh **************submitQuote
					// to submitServiceQuote **********
					$scope.submitServiceUserQuote = function(productID) {
						if (localStorage.getItem('userEmail')) {
							var data = new FormData();
							data.append('userName', localStorage
									.getItem('userName'));
							data.append('userEmail', localStorage
									.getItem('userEmail'));
							data.append('productID', productID);
							data.append('userPrice', $scope.parent.priceQuote);
							data.append('days', $scope.parent.days);
							data.append('hours', $scope.parent.hours);
							$http
									.post('submitServiceUserQuote', data, {
										withCredentials : false,
										transformRequest : angular.identity,
										headers : {
											'Content-Type' : undefined
										}
									})
									.success(
											function(resp) {
												console
														.log('submitServiceUserQuote Success'
																+ resp);
												$('.modal-backdrop').remove();
												$scope.cartCount = Number($scope.cartCount) + 1;
												$scope.quoteOrdered = true;
												$scope.priceQuote = '';
												bootbox
														.alert('Your purchase is added to the cart.');
												// $scope.parent.userMessage =
												// "Thanks for your Quote, we
												// will
												// notify you through
												// email/mobile.";

											})
									.error(
											function() {
												console.log('My Error');
												$scope.userMessage = "There is some issue with the quote submission. Please try again."
											});
						} else {
							bootbox.alert('Please login to proceed');
						}
					}

					// ************************ SUBMITTING THE ITEMS FROM CART
					// TO ORDER
					$scope.placeQuote = function() {
						// $scope.updateProfile();
						$scope.setNavigationChecks('scroll', 0);
						// $scope.cartCount = 0;
						// $location.path('/cdc');
						$scope.formData = [];
						var listFinalItems = [];
						// $scope.consumerCart();
						for (i = 0; i < $scope.consumerCartList.length; i++) {
							listFinalItems.push($scope.consumerCartList[i]);
						}
						console.log(listFinalItems);
						$scope.formData = $scope.consumerCartList;
						$http
								.post('placeQuote', $scope.formData)
								.success(
										function(resp) {
											$scope.cartCount = 0;
											bootbox
													.alert('Thanks for your Quote, we will keep you posted via email/mobile');
										})
								.error(
										function() {
											$scope.userQuoteMessage = "There is some issue with the quote submission. Please try again."
										});

					}

					// ************************ Suresh -------------
					// TO ORDER
					$scope.placeServiceQuote = function() {
						$scope.setNavigationChecks('scroll', 0);
						// $scope.cartCount = 0;
						// $location.path('/cdc');
						$scope.formData = [];
						var listFinalItems = [];
						// $scope.consumerCart();
						console.log('After get'
								+ $scope.consumerServiceCartList);
						for (i = 0; i < $scope.consumerServiceCartList.length; i++) {
							console
									.log('$scope.cartByUser---->'
											+ $scope.consumerServiceCartList[i].userEmail);
							listFinalItems
									.push($scope.consumerServiceCartList[i]);
						}
						$scope.formData = $scope.consumerServiceCartList;
						console.log($scope.formData);
						$http
								.post('placeServiceQuote', $scope.formData)
								.success(
										function(resp) {
											console
													.log('placeServiceQuote Success'
															+ resp);
											$scope.cartCount = 0;
											bootbox
													.alert('Thanks for your Quote, we will keep you posted via email/mobile');
										})
								.error(
										function() {
											console.log('My Error');
											$scope.userQuoteMessage = "There is some issue with the quote submission. Please try again."
										});

					}

					$scope.profile = function() {
						var data = new FormData();
						data.append('userName', $scope.userEmail);
						$http.get('getProfile', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(function(response) {
							$scope.profileData = response.data;
							$scope.address = $scope.profileData.userAddressOne + '\n' + $scope.profileData.userAddressTwo + '\n' + $scope.profileData.userCity;
							$scope.phoneNumber = $scope.profileData.userPhonenumber; 
							console.log($scope.profileData);
						});
							
					}
					
					$scope.fetchProfile = function(){
						if(localStorage.getItem('userEmail') == null) {
							bootbox.alert('Please login to proceed')
						}else {
						$scope.profile();
						$scope.parent.createServices = 1; $scope.parent.showServiceOrderHistory = 0; 							
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
						data.append('userEmail', localStorage.getItem('userEmail'));
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

					// ********************* GET USER QUOTES BY EMAIL
					$scope.consumerQuoteList = [];
					$scope.userQuotes = function() {
						$scope.consumerQuoteList = [];
						$window.scrollTo(0, 0);
						$scope
								.setNavigationChecks('showUserQuotes',
										'products');
						$http.get('getUserQuotes', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(function(response) {
							$.each(response.data, function(index, element) {
								$scope.consumerQuoteList.push(element);
							});

						});
					}

					// ******************* Suresh --
					$scope.consumerServiceQuoteList = [];
					$scope.serviceUserQuotes = function() {
						$scope.consumerServiceQuoteList = [];
						$window.scrollTo(0, 0);
						$scope.setNavigationChecks('showServiceUserQuotes',
								'products');
						$http.get('getServiceUserQuotes', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(function(response) {
							$.each(response.data, function(index, element) {
								console.log('USER QUOTES' + element);
								$scope.consumerServiceQuoteList.push(element);
							});

						});
						console.log($scope.consumerServiceQuoteList)

					}

					// ********************* GET VENDOR ACCEPTED QUOTES BY EMAIL
					$scope.vendorAcceptedQuotesList = [];
					$scope.acceptedQuotes = function() {
						$scope.vendorAcceptedQuotesList = [];
						$window.scrollTo(0, 0);
						$scope.setNavigationChecks('showAcceptedQuotes',
								'products');
						$http.get('getVendorAcceptedQuotes', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(function(response) {
							$.each(response.data, function(index, element) {
								$scope.vendorAcceptedQuotesList.push(element);
							});

						});
					}

					// ********************* Suresh - GET VENDOR ACCEPTED QUOTES
					// BY EMAIL
					$scope.vendorAcceptedServiceQuotesList = [];
					$scope.acceptedServiceQuotes = function() {
						$scope.vendorAcceptedServiceQuotesList = [];
						$window.scrollTo(0, 0);
						$scope.setNavigationChecks('showAcceptedServiceQuotes',
								'products');
						$http.get('getVendorAcceptedServiceQuotes', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(
								function(response) {
									$.each(response.data, function(index,
											element) {
										console
												.log('VENDOR ACCEPTED'
														+ element);
										$scope.vendorAcceptedServiceQuotesList
												.push(element);
									});

								});
						console.log($scope.vendorAcceptedServiceQuotesList)
					}

					// *********************** EDIT QUOTE
					$scope.vendorList = [];
					$scope.updateQuote = function() {
						$scope.formData = [];
						$scope.createServices = 0;
						var listUpdatedQuotes = [];
						for (i = 0; i < $scope.consumerQuoteList.length; i++) {
							listUpdatedQuotes.push($scope.consumerQuoteList[i]);
						}
						$scope.formData = $scope.consumerQuoteList;
						$http.post('updateQuotes', $scope.formData).success(
								function(response) {
									$scope.userQuotes();
								});
					}

					// ************ ------ Suresh ---------------------
					$scope.vendorServiceList = [];
					$scope.updateServiceQuote = function() {
						$scope.formData = [];
						$scope.createServices = 0;
						var listUpdatedServiceQuotes = [];
						for (i = 0; i < $scope.consumerServiceQuoteList.length; i++) {
							listUpdatedServiceQuotes
									.push($scope.consumerServiceQuoteList[i]);
						}
						$scope.formData = $scope.consumerServiceQuoteList;
						$http.post('updateServiceQuote', $scope.formData)
								.success(function(response) {
									$scope.serviceUserQuotes();
								});
					}

					// ************************* DELETE QUOTE
					$scope.deleteItemInQuote = function(consumerPriceID) {
						$scope.createServices = 0;
						var data = new FormData();
						data.append('consumerPrice', consumerPriceID);
						data.append('userEmail', localStorage
								.getItem('userEmail'));
						$http.post('deleteQuote', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function() {
							$scope.userQuotes();
						});

					}

					// ************************* Suresh - ---- DELETE QUOTE
					$scope.deleteServiceQuote = function(consumerPriceID) {
						$scope.createServices = 0;
						var data = new FormData();
						data.append('consumerPrice', consumerPriceID);
						data.append('userEmail', localStorage
								.getItem('userEmail'));
						$http.post('deleteServiceQuote', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function() {
							$scope.serviceUserQuotes();
						});

					}

					// ************************* DELETE ITEM FROM CART
					$scope.deleteItemInCart = function(consumerPriceID) {
						$scope.createServices = 0;
						var data = new FormData();
						data.append('consumerPrice', consumerPriceID);
						data.append('userEmail', localStorage
								.getItem('userEmail'));
						$http.post('deleteCart', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function() {
							$scope.consumerCart();
						});

					}

					// ************************* Suresh - DELETE ITEM FROM CART
					$scope.deleteServiceCart = function(consumerPriceID) {
						$scope.createServices = 0;
						var data = new FormData();
						data.append('consumerPrice', consumerPriceID);
						data.append('userEmail', localStorage
								.getItem('userEmail'));
						$http.post('deleteServiceCart', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function() {
							$scope.consumerServiceCart();
						});

					}

					// ******************* CHECKOUT PRODUCT
					$scope.checkoutProduct = function(element) {
						$scope.getProfile();
						$scope.paynow = 0;
						$scope.itemsVisibility = 0;
						$window.scrollTo(0, 0);
						$scope.setNavigationChecks('showCheckout', 'products');
						$scope.paymentdiv = 1;
						$scope.productInfo = element;
						$scope.totalPrice = (element.userPrice * element.productQuantity) + 10;
						$('#address-save-icon').hide();
					}

					// ******************* Suresh - CHECKOUT PRODUCT
					$scope.checkoutService = function(element) {
						$scope.getProfile();
						$window.scrollTo(0, 0);
						$scope.setNavigationChecks('showCheckout', 'products');
						$scope.productInfo = element;
					}

					// ******************** PLACE THE ORDER
					$scope.placeOrder = function(productInfo) {
						$scope.createServices = 0;
						console.log(productInfo);
						var data = new FormData();
						data.append('consumerPriceID',
								productInfo.consumerPriceID);
						$http.post('placeOrder', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function() {
							bootbox.alert('Order Placed successfully!');
							$scope.home();
						})

					}

					// ******************** Suresh - PLACE THE ORDER
					$scope.placeServiceOrder = function(productInfo) {
						$scope.createServices = 0;
						console.log(productInfo);
						var data = new FormData();
						data.append('consumerPriceID',
								productInfo.consumerPriceID);
						$http.post('placeServiceOrder', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function() {
							bootbox.alert('Order Placed successfully!');
							$scope.home();
						})

					}

					// *********************** ORDERED ITEMS
					$scope.orderList = [];
					$scope.orderedItems = function() {
						$scope.orderList = [];
						$window.scrollTo(0, 0);
						$scope.setNavigationChecks('showOrderedItems',
								'products');
						$http.get('getOrderByUser', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(function(response) {
							$.each(response.data, function(index, element) {
								$scope.orderList.push(element);
							});
						});
					}

					// *********************** Suresh ----ORDERED ITEMS
					$scope.orderServiceList = [];
					$scope.orderedServiceItems = function() {
						$scope.orderServiceList = [];
						$window.scrollTo(0, 0);
						$scope.setNavigationChecks('showOrderedServiceItems',
								'products');
						$http.get('getServiceOrderByUser', {
							params : {
								'userEmail' : localStorage.getItem('userEmail')
							}
						}).then(function(response) {
							$.each(response.data, function(index, element) {
								console.log('ORDER ITEMS' + element);
								$scope.orderServiceList.push(element);
							});
						});
					}

					$scope.makeAddressVisible = function() {
						$scope.itemsVisibility = 1;
						$scope.paynow = 1;
						$scope.paymentdiv = 0;
						if ($("#addressdiv").css("right") == "0px") {
							$("#addressdiv").animate({
								right : "-200px"
							});
							$("#addressdiv").animate({
								right : "0"
							});
						} else {
							$("#addressdiv").animate({
								right : "0"
							});
						}
						$('body').animate({scrollTop: $('#addressdiv').offset().top}, 'slow');
						var element = angular.element(document
								.querySelector('#addressdiv'));
						element.prop('offsetTop');
// $('#addressdiv').slideUp(function() {
// $(this).offset(-100).top;
// });
// $('html,body').animate({
// scrollTop : $("#addressdiv").offset().top
// }, 'slow');
						$("#address-save-icon").hide();
					}
					
					$scope.newAddressVisibility = function(){
						$("#address-save-icon").show();
						$("#address-next-icon").hide();
					}
					
					$scope.shownexticon = function() {
						$("#address-next-icon").show();
						$("#address-save-icon").hide();
					}
					
					$scope.hidePaymentVisibilityDiv = function(flag){
						$scope.paymentVisibility = flag;
					}

					$scope.savenewaddress = function() {
						$('#paymentVisibility').hide();
						$("#address-save-icon").hide();					
						$scope.newAddress = 1;
						$scope.paymentVisibility = 1;
						var data = new FormData();
						data.append('userEmail', $scope.userEmail);
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
							$scope.paymentshow = 1;
							if ($("#paymentmode").css("right") == "0px") {
								$("#paymentmode").animate({
									right : "-200px"
								})
								$("#paymentmode").animate({
									right : "0"
								})
							} else {
								$("#paymentmode").animate({
									right : "0"
								})
							}
						})
					}

					$scope.dopayment = function() {
						// $("#address-next-icon").hide();
						$scope.creditcardshow = 1;
						$scope.class = "selected-address";
						if ($("#creditcard-slide").css("right") == "0px") {
							$("#creditcard-slide").animate({
								right : "-200px"
							})
							$("#creditcard-slide").animate({
								right : "0"
							})
						} else {
							$("#creditcard-slide").animate({
								right : "0"
							})
						}
						$('html,body').animate({
							scrollTop : $("#creditcard-slide").offset().top
						}, 'slow');
						
						$('#paymentVisibility').hide();
					};
					
					// Credit card payment gateway
					$scope.creditcardpayment = function() {
						// $("#address-next-icon").hide();
						$scope.creditcardshow = 1;
						$scope.paypalpayshow = 0;
						$scope.class = "selected-address";
						if ($("#creditcard-slide").css("right") == "0px") {
							$("#creditcard-slide").animate({
								right : "-200px"
							})
							$("#creditcard-slide").animate({
								right : "0"
							})
						} else {
							$("#creditcard-slide").animate({
								right : "0"
							})
						}
						$('html,body').animate({
							scrollTop : $("#creditcard-slide").offset().top
						}, 'slow');
					};
					
					$scope.paytmeligible = 0;
					$scope.paypalpayment = function() {
						// $("#address-next-icon").hide();
						$scope.paypalpayshow = 1;
						$scope.creditcardshow = 0;
						
						$http.get(
								'getPayPalAmount',
								{
									params : {
										'userEmail' : localStorage
												.getItem('userEmail')
									}
								}).then(
								function(response) {
									console.log(response);
									$scope.availableAmount = response.data[0].available_amount;	
									$scope.lastTransaction = response.data[0].last_transaction;
									$scope.lastTransactionDate = new Date(response.data[0].dateModified).getDate()+"-"+(new Date(response.data[0].dateModified).getMonth()+1)
																	+"-"+new Date(response.data[0].dateModified).getFullYear();
									
									if($scope.availableAmount >= $scope.totalPrice)
										$scope.paytmeligible = 1;
									
									console.log($scope.availableAmount);
								});
						
						
						$scope.class = "selected-address";
						if ($("#paypal-slide").css("right") == "0px") {
							$("#paypal-slide").animate({
								right : "-200px"
							})
							$("#paypal-slide").animate({
								right : "0"
							})
						} else {
							$("#paypal-slide").animate({
								right : "0"
							})
						}
						$('html,body').animate({
							scrollTop : $("#paypal-slide").offset().top
						}, 'slow');
					};
					
					// Suresh - Adding multiple payment options
					$scope.dopaymentoption = function() {
						$scope.paymentVisibility = 1;
						$scope.newAddress = 1;
						$scope.paymentshow = 1;
						$("#address-next-icon").hide();
						if ($("#paymentmode").css("right") == "0px") {
							$("#paymentmode").animate({
								right : "-200px"
							})
							$("#paymentmode").animate({
								right : "0"
							})
						} else {
							$("#paymentmode").animate({
								right : "0"
							})
						}
						$('html,body').animate({
							scrollTop : $("#paymentmode").offset().top
						}, 'slow');						
					};

					// THis is to divide the HTML DIV into 2 elements per row
					Array.prototype.divideIt = function(d) {
						if (this.length <= d)
							return this;
						var arr = this;
						$scope.hold = [], ref = -1;
						for (var i = 0; i < arr.length; i++) {
							if (i % d === 0) {
								ref++;
							}
							if (typeof $scope.hold[ref] === 'undefined') {
								$scope.hold[ref] = [];
							}
							$scope.hold[ref].push(arr[i]);
						}

						return $scope.hold;
					};
									
					$scope.today = function() {
						$scope.dt = new Date();
					};
					$scope.today();

					$scope.clear = function() {
						$scope.dt = null;
					};

					// Disable weekend selection
					$scope.disabled = function(date, mode) {
						return (mode === 'day' && (date.getDay() === 0 || date
								.getDay() === 6));
					};

					$scope.toggleMin = function() {
						$scope.minDate = $scope.minDate ? null : new Date();
					};
					$scope.toggleMin();

					$scope.open = function($event) {
						$event.preventDefault();
						$event.stopPropagation();

						$scope.opened = true;
					};

					$scope.dateOptions = {
						formatYear : 'yy',
						startingDay : 1
					};

					$scope.initDate = new Date('2016-15-20');
					$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy/MM/dd',
							'dd.MM.yyyy', 'shortDate' ];
					$scope.format = $scope.formats[0];
					console.log('$scope.formats[0]' + $scope.formats[0])

					// *********** AGREEEMENT *****************
					$scope.createPDFTemplate = function(){
						var data = new FormData();
						data.append('vendorAgreementText', $scope.from_one.from_one);
						$http.post('createPDFTemplate', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function(response) {
							console.log(response);
						});
					}
					
					$scope.saveAgreementTemplate = function(){
						$scope.loading = true;
						var data = new FormData();
						data.append('vendorAgreementText', $scope.from_one.from_one);
						$http.post('saveAgreementTemplate', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function(response) {
							localStorage.setItem('templateText', response.vendorAgreementText);
							$scope.loading = false;
							bootbox.alert('Agreement template updated');
						});
					}
					
					
					$scope.getAgreementTemplate = function(){
						$scope.loading = true;					
						$http.get('getAgreementTemplate', {
							params : { }
						}).then(function(response) {
							$scope.loading = false; 
							$scope.loadingContractManagement = true;
							localStorage.setItem('templateText', response.data.vendorAgreementText);
						});
					}
					
					$scope.from_one.from_one = localStorage.getItem('templateText');
					$scope.vendor_Agreement = localStorage.getItem('templateText');
					
					$scope.viewAgreement = function(){
						$window.open('c:\Dumps\Agreement.pdf');
					}				
					
					$scope.newVendorList = [];
					$scope.getNewVendorList = function(){
						$scope.newVendorList = [];
						$http.get('getNewVendorList', {
							params : {
								'agreementStatus' : ''
							}
						}).then(function(response) {
							$scope.newVendorList = response.data;
							$scope.loadingContractManagement = false;
						});
						console.log($scope.newVendorList);
					}	
					
					$scope.sendAgreementToVendor = function(vendor_Agreement){
						var data = new FormData();
						data.append('vendorEmail', localStorage.getItem('vendorEmail'));
						data.append('vendorAgreementText', vendor_Agreement);
						$http.post('sendAgreementToVendor', data, {
							withCredentials : false,
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).success(function(response) {
							$scope.editAgreementFlag = 0;
							$scope.getNewVendorList();
							bootbox.alert('Agreement sent to Vendor!');							
						});
					}
					
					$scope.viewAgreementFlag = 0;
					$scope.viewAgreement = function(vendor){
						$scope.viewAgreementFlag = 1;
						$scope.vendorEmail = vendor.vendorEmail;
						$http
								.get(
										'getvendorAgreement',
										{
											params : {
												'vendorEmail' : vendor.vendorEmail
											}
										})
								.then(
										function(response) {
											console.log(response.data)
											$scope.agreementAcceptanceResponse = response.data;
											$scope.vendorAgreementText = response.data.vendorAgreementText;
										});
					}
													
					$scope.editAgreementFlag = 0;
					$scope.editAgreement = function(vendor){
						$scope.editAgreementFlag = 1;
						localStorage.setItem('vendorEmail', vendor.vendorEmail);
						$scope.vendorEmail = vendor.vendorEmail;
					}
					
					$scope.backToAgreeement = function(){
						$scope.editAgreementFlag = 0;
						$scope.viewAgreementFlag = 0;
					}
				});

cdc.directive('scrollSpy', function($timeout) {
	return {
		restrict : 'A',
		link : function(scope, elem, attr) {
			var offset = parseInt(attr.scrollOffset, 10)
			if (!offset)
				offset = 10;
			// elem.scrollSpy({ "offset" : offset});
			scope.$watch(attr.scrollSpy, function(value) {
				$timeout(function() {
					// elem.scrollSpy('refresh', { "offset" : offset})
				}, 1);
			}, true);
		}
	}
});

cdc.directive('preventDefault', function() {
	return function(scope, element, attrs) {
		jQuery(element).click(function(event) {
			event.preventDefault();
		});
	}
});

cdc.directive("scrollTo", [ "$window", function($window) {
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

cdc.filter('pagination', function() {
	return function(input, start) {
		start = +start;
		return input.slice(start);
	};
});

cdc
		.directive(
				'starRating',
				function() {
					return {
						restrict : 'A',
						template : '<ul class="rating">'
								+ '    <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
								+ '\u2605' + '</li>' + '</ul>',
						scope : {
							ratingValue : '=',
							max : '=',
							onRatingSelected : '&',
							readonly : "=?"
						},
						link : function(scope, elem, attrs) {
							var updateStars = function() {
								scope.stars = [];
								for (var i = 0; i < scope.max; i++) {
									scope.stars.push({
										filled : i < scope.ratingValue
									});
								}
							};

							scope.toggle = function(index) {
								if (scope.readonly == undefined
										|| scope.readonly == false) {
									scope.ratingValue = index + 1;
									scope.onRatingSelected({
										rating : index + 1
									});
								}
							};

							scope.$watch('ratingValue',
									function(oldVal, newVal) {
										if (newVal) {
											updateStars();
										}
									});
						}
					};
				});

