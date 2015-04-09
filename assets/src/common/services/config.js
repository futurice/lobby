angular.module( 'services.config', ['lodash'])

.service('config',['lodash', function(lodash) {

	// private vars here if needed

	return {
		siteName: 'Electronic Receptionist',
		siteUrl: '/',
		apiUrl: '/api',
    RESULTS_SHOW_AMOUNT: 20,
    RESULTS_SHOW_THRESHOLD: 20,
    EMPLOYEE_FETCH_INTERVAL: 3600000, // 1 hour
    EMPLOYEE_TRYAGAIN_INTERVAL: 120000, // 2 min
    IDLE_TIMEOUT: 30000,

    // Fuzzy search options, see https://github.com/krisk/Fuse#options
    fuse: {
      keys: ['first_name', 'last_name', 'full_name'],
      threshold: 0.4
    }
	};
}]);
