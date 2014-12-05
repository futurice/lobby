angular.module('models.employee', ['lodash', 'services', 'ngSails'])

.service('EmployeeModel',['$q', 'lodash', 'utils', '$sails', function($q, lodash, utils, $sails) {
	this.getAll = function() {

		var deferred = $q.defer();
		var url = utils.prepareUrl('employees');
		$sails.get(url, function(models) {
			return deferred.resolve(models);
		});

		return deferred.promise;
	};

	this.getOne = function(id) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('employees/' + id);

		$sails.get(url, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
}]);