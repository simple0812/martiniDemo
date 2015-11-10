define([
    'lib/angular'
], function () {
    var moduleDetailCtrl =  angular.module('moduleDetailCtrl', []);
    moduleDetailCtrl.controller('editCtrl',['$scope', '$http', '$window', 'svc', editCtrl]);

    function editCtrl($scope, $http, $window, svc) {
        $scope.model = {
            dn : '',
            attributes : {}
        };

        function initScope() {
            $scope.model = {
                dn : '',
                attributes : {}
            };
        }

        $scope.save = function() {
            if(!validator.validateAll('#createUserModal')) return;
            var saveType = $('#btnSave').data('save-type');
            if(saveType == 'edit') update();
            else if(saveType == 'create') create();
        };

        function create() {
            $('#btnSave').attr('disabled', 'disabled');
            svc.create($scope.model).done(function(p) {
                $('#btnSave').removeAttr('disabled');
                $scope.model.dn = p.dn;
                $scope.model.attributes = p.attributes;
                var scope = $('#user').scope();
                scope.models.push($scope.model);

                $('#createUserModal').modal('hide');
                $('#btnSave').data('save-type', '');
            }).fail(function(err) {
              $('#btnSave').removeAttr('disabled');
               common.popBy($('#btnSave'), err);
            });

        }

        function update() {
            svc.update($scope.model).done(function() {
                var scope = $('#user').scope();
                var model = _.find(scope.models, function(item) {return item.dn == $scope.model.dn;});

                for(var each in $scope.model)
                    model[each] = $scope.model[each]

                $('#createUserModal').modal('hide');
                $('#btnSave').data('save-type', '');
            }).fail(function() {
                $('#createUserModal').modal('hide');
                $('#btnSave').data('save-type', '');
            });

        }

        $('#createUserModal').on('hidden.bs.modal', function (e) {
            initScope();
        })
    }
});