require.config({
	baseUrl: '/js'
});

require(['lib/validator', 'lib/bootstrap', 'requirement/service', 'requirement/controller', 'requirement/filter', 'requirement/editCtrl', 'requirement/directive'], function() {
	validator.bind();
	angular.module('myApp', ['moduleListCtrl', 'moduleDetailCtrl', 'moduleSvc', 'moduleFilter', 'moduleDirect']);
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['myApp']);
	});
});
