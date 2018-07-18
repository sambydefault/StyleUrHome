cdc
		.service(
				'cart',
				function($http, $q) {

					var _this = this;
					this.vendorCart = function(userEmail) {
						return $http
								.get('getVendorCart?userEmail=' + userEmail);
					}
					this.vendorServiceCart = function(userEmail) {
						return $http.get('getVendorServiceCart?userEmail='
								+ userEmail);
					}

					this.vendorServiceOrderQuote = function(userEmail) {
						return $http.get('getVendorServiceQuotes?userEmail='
								+ userEmail);
					}

					this.camelize = function camelize(str) {
						return str.toLowerCase().replace(/\b\w/g, function(m) {
							return m.toUpperCase();
						});
					}

					this.capitalizeFirstLetter = function() {
						return this.charAt(0).toUpperCase() + this.slice(1);
					}

					this.buildMenu = function(response) {
						var tempCategory = '', tempSubCategory = '';
						var tempElement = '';
						var tmpItemCategory = new Array();
						angular
								.forEach(
										response.data,
										function(elements, index) {
											// SET THE FLAG
											// FOR CATEGORY
											if (elements.productCategory != 'SERVICES') {
												serviceCheck = 0;
												var tempSubFunction = 'ng-click="shop'
														+ elements.productSubCategory
																.toLowerCase()
																.capitalizeFirstLetter();
											} else {
												serviceCheck = 1;
												var tempSubFunction = 'ng-click="shopServices';
											}

											// CHECK THE
											// PARENT
											// CATEGORY
											if (elements.productCategory != tempCategory
													|| index == 0) {
												if (elements.productSubCategory != tempSubCategory
														&& index != 0) {
													tempElement = tempElement
															+ '</ul></li></ul></li>'
												}
												tempElement = tempElement
														+ '<li class="dropdown-submenu" style="background-color: #232f3e;"><a tabindex="-1" href="" style="color: white;">'
														+ _this
																.camelize(elements.productCategory)
														+ '</a>';
												tempCategoryCheck = 1;
											}

											if (elements.productCategory != tempCategory
													&& tempCategoryCheck
													&& index != 0) {
											}

											if (elements.productSubCategory == tempSubCategory) {
												tempSubCategoryCheck = 1;
											} else {
												tempSubCategoryCheck = 0;
											}

											if (elements.productSubCategory != tempSubCategory
													&& !tempSubCategoryCheck
													&& !tempCategoryCheck
													&& index != 0) {
												tempElement = tempElement
														+ '</ul></li>'
												tempSubCategoryStarted = 0;
											}

											// CHECK THE SUB
											// CATEGORY
											if (elements.productSubCategory != tempSubCategory
													&& !tempSubCategoryCheck
													&& tempCategoryCheck) {
												tempElement = tempElement
														+ '<ul class="dropdown-menu" style="background-color: #232f3e;"> <li class="dropdown-submenu"><a href="" '
														+ tempSubFunction;
												if (serviceCheck) {
													tempElement = tempElement
															+ '(\''
															+ elements.productSubCategory
															+ '\')" data-toggle="tab" prevent-default="" scroll-to="'
															+ elements.productSubCategory
																	.toLowerCase()
															+ '" style="color: white">'
															+ _this
																	.camelize(elements.productSubCategory)
															+ '</a>';
												} else {
													tempElement = tempElement
															+ '()" data-toggle="tab" prevent-default="" scroll-to="'
															+ elements.productSubCategory
																	.toLowerCase()
															+ '" style="color: white">'
															+ _this
																	.camelize(elements.productSubCategory)
															+ '</a>';
												}

												if (elements.productItemCategory != 'null'
														|| elements.productItemCategory != '')

													tmpItemCategory
															.push(elements.productItemCategory);
												tempElement = tempElement
														+ '<ul class="dropdown-menu" style="background-color: #232f3e;"> <li><a href="" '
														+ tempSubFunction
														+ '(\''
														+ elements.productItemCategory
																.toLowerCase()
																.capitalizeFirstLetter()
														+ '\')" data-toggle="tab" prevent-default="" scroll-to="'
														+ elements.productSubCategory
																.toLowerCase()
														+ '" style="color: white">'
														+ _this
																.camelize(elements.productItemCategory)
														+ '</a></li>';
												tempSubCategoryStarted = 1;
												tempCategoryCheck = 0;

											} else if (elements.productSubCategory == tempSubCategory
													&& tempSubCategoryStarted) {
												if (elements.productItemCategory != null
														|| elements.productItemCategory != '')
													if (tmpItemCategory
															.indexOf(elements.productItemCategory) < 0) {
														tempElement = tempElement
																+ '<li><a href="" '
																+ tempSubFunction
																+ '(\''
																+ elements.productItemCategory
																		.toLowerCase()
																		.capitalizeFirstLetter()
																+ '\')" data-toggle="tab" prevent-default=""  scroll-to="'
																+ elements.productSubCategory
																		.toLowerCase()
																+ '" style="color: white">'
																+ _this
																		.camelize(elements.productItemCategory)
																+ '</a></li>';
													}
												tmpItemCategory
														.push(elements.productItemCategory);
												// tempSubCategoryStarted
											} else if (elements.productSubCategory != tempSubCategory
													&& !tempSubCategoryCheck) {
												tempElement = tempElement
														+ '<li class="dropdown-submenu"><a href="" '
														+ tempSubFunction;
												if (serviceCheck) {
													tempElement = tempElement
															+ '(\''
															+ elements.productSubCategory
															+ '\')" data-toggle="tab" prevent-default="" scroll-to="'
															+ elements.productSubCategory
																	.toLowerCase()
															+ '" style="color: white">'
															+ _this
																	.camelize(elements.productSubCategory)
															+ '</a>';
												} else {
													tempElement = tempElement
															+ '()" data-toggle="tab" prevent-default="" scroll-to="'
															+ elements.productSubCategory
																	.toLowerCase()
															+ '" style="color: white">'
															+ _this
																	.camelize(elements.productSubCategory)
															+ '</a>';
												}

												if (elements.productItemCategory != null
														|| elements.productItemCategory != '')
													tempElement = tempElement
															+ '<ul class="dropdown-menu" style="background-color: #232f3e;"> <li><a href="" '
															+ tempSubFunction
															+ '(\''
															+ elements.productItemCategory
																	.toLowerCase()
																	.capitalizeFirstLetter()
															+ '\')" data-toggle="tab" prevent-default=""  scroll-to="'
															+ elements.productSubCategory
																	.toLowerCase()
															+ '" style="color: white">'
															+ _this
																	.camelize(elements.productItemCategory)
															+ '</a></li>';
												tempSubCategoryStarted = 1;
											}

											if (index == response.data.length) {
												tempElement = tempElement
														+ '</ul></li>';
											}

											tempCategory = elements.productCategory;
											tempSubCategory = elements.productSubCategory;
										})
						return tempElement;
					}
				});
