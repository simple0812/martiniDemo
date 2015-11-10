define([
  'lib/angular'
], function () {
  var moduleDetailCtrl = angular.module('moduleDetailCtrl', []);
  moduleDetailCtrl.controller('editCtrl', ['$scope', '$http', '$window', 'svc', editCtrl]);

  function editCtrl($scope, $http, $window, svc) {
    $scope.model = {
      id: '',
      name: "",
      status: 0,
      created_at: "",
      updated_at: ""
    };

    function initScope() {
      $scope.model = {
        id: '',
        name: "",
        status: 0,
        created_at: "",
        updated_at: ""
      };
    }

    $scope.save = function () {
      if (!validator.validateAll('#createUserModal')) return;
      var saveType = $('#btnSave').data('save-type');
      if (saveType == 'edit') update();
      else if (saveType == 'create') create();
    };

    function create() {
      svc.create($scope.model).done(function (p) {
        var scope = $('#user').scope();
        scope.models.push(p);

        $('#createUserModal').modal('hide');
        $('#btnSave').data('save-type', '');
      }).fail(function (err) {
        common.popBy($('#btnSave'), err);
      });

    }

    function update() {
      svc.update($scope.model).done(function () {
        var scope = $('#user').scope();
        var model = _.find(scope.models, function (item) {
          return item.id == $scope.model.id;
        });

        for (var each in $scope.model)
          model[each] = $scope.model[each]

        $('#createUserModal').modal('hide');
        $('#btnSave').data('save-type', '');
      }).fail(function () {
        $('#createUserModal').modal('hide');
        $('#btnSave').data('save-type', '');
      });

    }

    $('#createUserModal').on('hidden.bs.modal', function (e) {
      initScope();
    })
  }
});