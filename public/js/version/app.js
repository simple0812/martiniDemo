require.config({
	baseUrl: '/js'
});

require(['lib/validator', 'lib/bootstrap', 'version/service', 'version/controller', 'version/filter', 'version/editCtrl', 'version/directive'], function() {
	validator.bind();
	angular.module('myApp', ['moduleListCtrl', 'moduleDetailCtrl', 'moduleSvc', 'moduleFilter', 'moduleDirect']);
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['myApp']);
	});
});
