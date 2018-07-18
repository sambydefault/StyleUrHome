suh.factory('consumerService', function($http, $q) {

	var designService = {
		async : function() {
			var designResponse = $http.get('getAllRoomDesigns').then(
					function(response) {
						return response.data;
					});
			return designResponse;
		}
	}
	return designService;
});