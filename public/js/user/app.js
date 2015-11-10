require.config({
	baseUrl: '/js'
});

require(['lib/validator', 'lib/bootstrap', 'user/service', 'user/controller', 'user/filter', 'user/editCtrl', 'user/directive'], function() {
	validator.bind();
	angular.module('myApp', ['moduleListCtrl', 'moduleDetailCtrl', 'moduleSvc', 'moduleFilter', 'moduleDirect']);
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['myApp']);
	});
});
