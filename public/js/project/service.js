define([
    'lib/angular'
], function () {
    var moduleSvc =  angular.module('moduleSvc', []);

    moduleSvc.factory('svc', ['$http', function($http) {
        return {
            delete: function(ids) {
                var def = $.Deferred();
                var promise = def.promise();

                $.ajax({
                    type: "DELETE",
                    url: "/project",
                    data: JSON.stringify(ids),
                    dataType:"json",
                    contentType: "application/json"
                }).success(function (json) {
                    if (!json) return def.reject('未知的错误');
                    if (!json.status || json.status == 'fail')  return def.reject(json.msg);
                    def.resolve();
                });

                return promise;
            },

            update: function(model) {
                var def = $.Deferred();
                var promise = def.promise();
                $http.put('/project', model).success(function(json) {
                    if (!json.status || json.status == 'fail') return def.reject(json ? json.msg : '未知的错误');
                    def.resolve(json.result);
                });

                return promise;
            },

            create: function(model) {
                var def = $.Deferred();
                var promise = def.promise();
                $http.post('/project', model).success(function(json) {
                    if (!json.status || json.status == 'fail') return def.reject(json ? json.msg : '未知的错误');
                    def.resolve(json.result);
                });

                return promise;
            },

            retrieve:function() {
                var def = $.Deferred();
                var promise = def.promise();

                $http.get('/project', {params : pager.condition}).success(function(json) {
                    if (!json) return def.reject('未知的错误');
                    if (!json.status || json.status == 'fail')  return def.reject(json.msg);
                    def.resolve(json);
                });

                return promise;
            }
        };
    }])

});