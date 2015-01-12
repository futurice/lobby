angular.module('models.systemEvent', ['lodash', 'services', 'ngSails'])

.service('SystemEventModel',['$q', 'lodash', 'utils', '$sails', function($q, lodash, utils, $sails) {
	this.getAll = function() {

		var deferred = $q.defer();
		var url = utils.prepareUrl('systemEvents');
		$sails.get(url, function(models) {
			return deferred.resolve(models);
		});

		return deferred.promise;
	};

	this.getOne = function(id) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('systemEvents/' + id);

		$sails.get(url, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
}]);