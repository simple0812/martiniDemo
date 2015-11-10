define([
    'lib/angular',
    'lib/extension',
    'lib/underscore',
    'lib/pager'
], function () {
    var moduleListCtrl =  angular.module('moduleListCtrl', []);
    moduleListCtrl.controller('modelsCtrl',['$scope', '$window', 'svc', modelsCtrl]);

    function modelsCtrl($scope, $window, svc) {
        pager = new Pager(query_list.pagesize, 0, 1, query_list, showList, -1);
        pager.renderNumberStyleHtml($("#pager").get(0));
        showList({ mode: 'nums', val: 1});

        $scope.models = [];

        function showList() {
            pager.moveIndicator(arguments[0]);

            svc.retrieve()
                .done(function(json) {
                    $scope.models = json.result;
                    $('.userList').show();
                    pager.setRecordCount(json.allCount);
                    pager.renderNumberStyleHtml($get("pager"));
                }).fail(function() {
                    console.log('---------')
                })
        }

        $scope.$on('$destroy', function() {
            console.log($scope.models.length + '..')
        });

        $scope.remove = function(scope, obj) {
            if(confirm('确认删除项目吗？')) {
                svc.delete([scope.model.dn])
                    .done(function() {
                        showList();
                        //$scope.models.removeAt(scope.$index);
                        //$scope.$apply();
                    }).fail(function(msg) {
                        common.popBy(obj, msg);
                    });
            }
        };

        $scope.navToEdit = function(scope, obj) {
            var uid = scope.model.attributes.uid;
            var url = (typeof uid == 'array') ? "/user/v/" + uid[0] : '/user/v/' + uid;
            location.href = url;
        };

        $scope.removeModels = function(scope, obj) {
            if($('.chkItem:checked').length == 0) return common.popBy(obj, '请选择要删除的项目');
            var ids = [];
            $('.chkItem:checked').each(function(i, o) {
                ids.push($(o).val());
            });

            if(confirm('确认删除选中的项目吗？')) {
                svc.delete(ids).done(function() {
                    //$scope.models = _.reject($scope.models, function(item) {
                    //    return ids.indexOf(item.dn) != -1;
                    //});
                    //
                    //$scope.$apply();
                    //$('#chkAllItems').prop('checked', false);
                    showList();

                }).fail(function(msg) {
                    common.popBy(obj, msg);
                });
            }
        };

        $scope.showEditModal = function(scope, obj) {
            var editScope = $('#createUserModal').scope();

            $('#btnSave').data('save-type', 'edit');
            for(var each in scope.model)
                editScope.model[each] = scope.model[each]
            $('#logoImg').attr('src', scope.model.logo).show();
            $('#createUserModal').modal('show');
        };

        $scope.showCreateModal = function() {
            $('#btnSave').data('save-type', 'create');
            $('#createUserModal').modal('show');
        };

        $scope.search = function(obj) {
            query_list.keyword = $('#searchInput').val();
            showList({ mode: 'nums', val: 1});
        }
    }
});
