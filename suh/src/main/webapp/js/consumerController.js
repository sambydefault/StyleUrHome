suh
		.controller(
				'consumerController',
				function($scope, $http, $location, $resource, $window,
						sharedLoginCheck, consumerService, $route, $parse) {

					// Dimension Variables
					$scope.something = {};
					$scope.roomDesignsList = [];
					$scope.roomImage = '';
					$scope.parent = [];
					$scope.bedroomList = [];
					$scope.livingroomList = [];
					$scope.kitchenList = [];
					$scope.toiletList = [];
					$scope.projectID = 0;

					// *** START*** GET THE LOCAL STORAGE VALUES IN NEXT PAGE
					if (localStorage.getItem('builtArea') != '') {
						$scope.parent.builtArea = localStorage
								.getItem('builtArea');
						$scope.parent.projectName = localStorage
								.getItem('projectName');

						$scope.parent.bedValue = localStorage
								.getItem('bedValue')
						$scope.parent.kitValue = localStorage
								.getItem('kitValue')
						$scope.parent.tlValue = localStorage.getItem('tlValue')
						$scope.parent.livValue = localStorage
								.getItem('livValue');
					}

					// *** END******* GET THE LOCAL STORAGE VALUES IN NEXT PAGE

					// *************** FETCH THE SELECTED DESIGN *************
					$scope.selectedDesign = function(selectedDesignImage) {
						$scope.designBreakup = 0;
						$scope.designRelatedInfo = 0;
						$scope.designRelatedInfo = 1;
						var imageElement = angular.element(document
								.querySelector('#imageSelected'));
						imageElement.attr('src', 'images/designs/'
								+ selectedDesignImage + '.jpg');
					}

					// **************** SET DESIGN FOR a SELECTED ROOM ********
					$scope.setDesignForSelectedRoom = function(event) {
						var selectedRoom = event.target.alt;
						$scope.description = selectedRoom.substr(0,
								selectedRoom.indexOf(' '));

						localStorage.setItem('roomSelectedID', event.target.id);
						var imageSelected = angular.element(document
								.querySelector('#imageSelected'));

						var imageReference = event.target.src.replace(
								'http://localhost:8080/', '');
						if (imageReference == '') {
							imageSelected.attr('alt', 'Choose the design for '
									+ event.target.id);
							imageSelected.attr('src', '');
							$scope.designBreakup = 0;
							$scope.designRelatedInfo = 0;
						} else {
							imageSelected.attr('src', event.target.src);
							$scope.designBreakup = 0;
							$scope.designRelatedInfo = 1;
						}
					}

					// ***** SAVE THE DESIGN OR MODEL FOR SELECTED ROOM ON SAVE
					$scope.roomsUpdatedList = []
					$scope.saveDesignForSelectedRoom = function() {
						// Fetch the selected Image ID
						var imageSelectedID = angular.element(document
								.querySelector('#imageSelected'));

						var roomSelectedID = localStorage
								.getItem('roomSelectedID');
						// Fetch the ID of the room that has to be modified
						var roomSelected = angular.element(document
								.getElementById(roomSelectedID));
						roomSelected.attr('src', imageSelectedID[0].href);
						var textID = angular.element(document
								.querySelector('#A' + roomSelectedID));
						textID.attr('hidden', 'hidden');

						var imagePath = imageSelectedID[0].href;
						var designID = imagePath.substring(imagePath
								.lastIndexOf("/") + 1, imagePath
								.lastIndexOf("."));
						localStorage.setItem('roomSelected', '');
						console.log(roomSelectedID);
						$scope.submitButtonFlag = 0;

						var totalLength = $scope.bedroomList.length
								+ $scope.kitchenList.length
								+ $scope.toiletList.length
								+ $scope.toiletList.length;
						for (x = 0; x < totalLength; x++) {
							for (i = 0; i < $scope.bedroomList.length; i++) {
								if ($scope.bedroomList[i].roomDetailsID == roomSelectedID) {
									$scope.bedroomList[i].design = Number(designID);
									$scope.bedroomList[i].roomImage = imageSelectedID[0].href;
									$scope.submitButtonFlag = 1;
								} else {
									$scope.submitButtonFlag = 0;
								}
							}

							for (i = 0; i < $scope.kitchenList.length; i++) {
								if ($scope.kitchenList[i].roomDetailsID == roomSelectedID) {
									$scope.kitchenList[i].design = Number(designID);
									$scope.kitchenList[i].roomImage = imageSelectedID[0].href;
									$scope.submitButtonFlag = 1;
								} else {
									$scope.submitButtonFlag = 0;
								}
							}

							for (i = 0; i < $scope.toiletList.length; i++) {
								if ($scope.toiletList[i].roomDetailsID == roomSelectedID) {
									$scope.toiletList[i].design = Number(designID);
									$scope.toiletList[i].roomImage = imageSelectedID[0].href;
									$scope.submitButtonFlag = 1;
								} else {
									$scope.submitButtonFlag = 0;
								}
							}

							for (i = 0; i < $scope.toiletList.length; i++) {
								if ($scope.livingroomList[i].roomDetailsID == roomSelectedID) {
									$scope.livingroomList[i].design = Number(designID);
									$scope.livingroomList[i].roomImage = imageSelectedID[0].href;
									$scope.submitButtonFlag = 1;
								} else {
									$scope.submitButtonFlag = 0;
								}
							}
						}
						if ($scope.submitButtonFlag) {
							var submitButtonID = angular.element(document
									.querySelector('#submitDesign'));
							submitButtonID.removeAttr('disabled');
						}
					}

					// ************** SUBMIT DESIGN
					$scope.submitDesign = function() {

					}

					// ************** DESIGN BREAKUP
					$scope.designBreak = function() {
						if ($scope.designBreakup)
							$scope.designBreakup = 0;
						$scope.designBreakup = 1;
						$scope.designBreakUpList = [];
						var imageSelectedID = angular.element(document
								.querySelector('#imageSelected'));
						var imagePath = imageSelectedID[0].src;

						var designID = imagePath.substring(imagePath
								.lastIndexOf("/") + 1, imagePath
								.lastIndexOf("."));
						$http
								.get('getDesignByID', {
									params : {
										'designID' : designID
									}
								})
								.then(
										function(response) {
											$scope.totalCost = 0;
											$scope.designBreakUpList = response.data;
											for (i = 0; i < $scope.designBreakUpList.length; i++)
												$scope.totalCost = $scope.totalCost
														+ $scope.designBreakUpList[i].price;
										});
					}

					$scope.consumerHomeDesign = function() {
						$location.path('/consumerHomeDesign');
					}

					// *************** AFTER SELECTING HOUSE DETAILS
					// **************
					$scope.designDimension = function(houseType) {
						localStorage.setItem('builtArea', '');
						localStorage.setItem('projectName', '');
						localStorage.setItem('bedValue', '');
						localStorage.setItem('kitValue', '');
						localStorage.setItem('tlValue', '');
						localStorage.setItem('livValue', '');

						$scope.houseType = houseType;
						localStorage.setItem('houseType', $scope.houseType);
						$location.path('/consumerHomeDimensions');
					}

					// *************** SET ROOM LIST BASED ON USER SELECTION
					// **************
					$scope.setRoomList = function() {
						$scope.bedroomList = [];
						$scope.livingroomList = [];
						$scope.kitchenList = [];
						$scope.toiletList = [];

						localStorage
								.setItem('bedValue', $scope.parent.bedValue);
						localStorage
								.setItem('kitValue', $scope.parent.kitValue);
						localStorage.setItem('tlValue', $scope.parent.tlValue);
						localStorage
								.setItem('livValue', $scope.parent.livValue);

						for (b = 1; b <= $scope.parent.bedValue; b++) {
							$scope.bedroomList.push({
								'length' : $scope.$eval('parent.br' + b
										+ 'Length'),
								'breadth' : $scope.$eval('parent.br' + b
										+ 'Breadth'),
								'height' : $scope.$eval('parent.br' + b
										+ 'Height'),
								'roomType' : 'Bedroom'
							});
						}

						for (k = 1; k <= $scope.parent.kitValue; k++) {
							var length = $parse('$scope.parent.kit' + k
									+ 'Length');
							$scope.kitchenList.push({
								'length' : $scope.$eval('parent.kit' + k
										+ 'Length'),
								'breadth' : $scope.$eval('parent.kit' + k
										+ 'Breadth'),
								'height' : $scope.$eval('parent.kit' + k
										+ 'Height'),
								'roomType' : 'Kitchen'
							});
						}

						for (t = 1; t <= $scope.parent.tlValue; t++) {
							var length = $parse('$scope.parent.tl' + t
									+ 'Length');
							$scope.toiletList.push({
								'length' : $scope.$eval('parent.tl' + t
										+ 'Length'),
								'breadth' : $scope.$eval('parent.tl' + t
										+ 'Breadth'),
								'height' : $scope.$eval('parent.tl' + t
										+ 'Height'),
								'roomType' : 'Toilet'
							});
						}

						for (l = 1; l <= $scope.parent.livValue; l++) {
							var length = $parse('$scope.parent.liv' + l
									+ 'Length');
							$scope.livingroomList.push({
								'length' : $scope.$eval('parent.liv' + l
										+ 'Length'),
								'breadth' : $scope.$eval('parent.liv' + l
										+ 'Breadth'),
								'height' : $scope.$eval('parent.liv' + l
										+ 'Height'),
								'roomType' : 'LivingRoom'
							});
						}
					}

					// *************** SAVE PROJECT DATA ************
					$scope.saveProjectData = function() {

						$scope.projectData = [];
						$scope.projectData.push({
							'builtArea' : $scope.parent.builtArea,
							'projectName' : $scope.parent.projectName,
							'userEmail' : localStorage.getItem('userEmail'),
							'houseType' : localStorage.getItem('houseType')
						});

						$scope.formData = [];
						$scope.formData.push($scope.projectData);
						$scope.formData.push($scope.bedroomList);
						$scope.formData.push($scope.kitchenList);
						$scope.formData.push($scope.toiletList);
						$scope.formData.push($scope.livingroomList);

						$http
								.post('saveRoomDetails', $scope.formData)
								.success(
										function(response) {
											$scope.bedroomList = [];
											$scope.kitchenList = [];
											$scope.toiletList = [];
											$scope.livingroomList = [];
											localStorage
													.removeItem('bedroomList');
											localStorage
													.removeItem('kitchenList');
											localStorage
													.removeItem('toiletList');
											localStorage
													.removeItem('livingroomList');
											console.log(response);
											angular
													.forEach(
															response,
															function(value, key) {
																console
																		.log(value.roomType)
																if (value.roomType == 'Bedroom')
																	$scope.bedroomList
																			.push(value);
																else if (value.roomType == 'Kitchen')
																	$scope.kitchenList
																			.push(value);
																else if (value.roomType == 'Toilet')
																	$scope.toiletList
																			.push(value);
																else if (value.roomType == 'LivingRoom')
																	$scope.livingroomList
																			.push(value);
															})

											localStorage
													.setItem(
															'bedroomList',
															JSON
																	.stringify($scope.bedroomList));
											localStorage
													.setItem(
															'kitchenList',
															JSON
																	.stringify($scope.kitchenList));
											localStorage
													.setItem(
															'toiletList',
															JSON
																	.stringify($scope.toiletList));
											localStorage
													.setItem(
															'livingroomList',
															JSON
																	.stringify($scope.livingroomList));
											$scope.fetchLocalStorageItems();
											$location.path('consumerDesigner');
										});
					}

					// **************** GET ALL ROOM DESIGNS
					// **********************
					$scope.getAllRoomDesigns = function() {
						// SET THE ROOM LIST FOR THE USER TO CHOOSE
						$scope.setRoomList();

						// PERSIST THE DATA SO FAR
						$scope.saveProjectData();

						$scope.test = 1;
						$scope.roomDesignsList = [];
						consumerService
								.async()
								.then(
										function(roomList) {
											$scope.roomDesignsList = roomList;
											localStorage
													.setItem(
															'roomDesignsList',
															JSON
																	.stringify($scope.roomDesignsList));
										});

					}

					$(".dropdown-menu li a")
							.click(
									function() {
										$(this)
												.parents(".dropdown")
												.find('.btn')
												.html(
														$(this).text()
																+ ' <span class="caret"></span>');
										$(this).parents(".dropdown").find(
												'.btn').val(
												$(this).data('value'));
									});

					$scope.fetchLocalStorageItems = function() {
						if (localStorage.getItem('bedroomList') != '')
							$scope.bedroomList = JSON.parse(localStorage
									.getItem('bedroomList'));
						if (localStorage.getItem('kitchenList') != '')
							$scope.kitchenList = JSON.parse(localStorage
									.getItem('kitchenList'));
						if (localStorage.getItem('toiletList') != '')
							$scope.toiletList = JSON.parse(localStorage
									.getItem('toiletList'));
						if (localStorage.getItem('livingroomList') != '')
							$scope.livingroomList = JSON.parse(localStorage
									.getItem('livingroomList'));
					}

					if (localStorage.getItem('roomDesignsList') != '') {
						$scope.roomDesignsList = JSON.parse(localStorage
								.getItem('roomDesignsList'));
					}
					// $scope.fetchLocalStorageItems();
				})
