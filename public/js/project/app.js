require.config({
	baseUrl: '/js'
});

require(['lib/validator', 'lib/bootstrap', 'project/service', 'project/controller', 'project/filter', 'project/editCtrl', 'project/directive'], function() {
	validator.bind();
	angular.module('myApp', ['moduleListCtrl', 'moduleDetailCtrl', 'moduleSvc', 'moduleFilter', 'moduleDirect']);
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['myApp']);
	});
});
