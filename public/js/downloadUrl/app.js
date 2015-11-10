require.config({
  baseUrl: '/js'
});

require(['lib/validator', 'lib/bootstrap', 'downloadUrl/service', 'downloadUrl/controller', 'downloadUrl/filter',
  'downloadUrl/editCtrl', 'downloadUrl/directive'], function () {
  validator.bind();
  angular.module('myApp', ['moduleListCtrl', 'moduleDetailCtrl', 'moduleSvc', 'moduleFilter', 'moduleDirect']);
  angular.element(document).ready(function () {
    angular.bootstrap(document, ['myApp']);
  });
});
