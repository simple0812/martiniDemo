define([
  'lib/angular'
], function () {
  var moduleSvc = angular.module('moduleSvc', []);
  var _url = "http://115.231.92.23:8007/api/download/url";
  var nodeEnv = $('#user').attr('nodeenv');

  if(nodeEnv == "development") {
    _url = "http://115.231.92.23:8007/api/download/url";
  } else {
    _url = "http://node.wanzhoumo.com/api/download/url";
  }

  moduleSvc.factory('svc', ['$http', function ($http) {
    return {
      delete: function (ids) {
        var def = $.Deferred();
        var promise = def.promise();

        $.ajax({
          type: "DELETE",
          url: _url,
          data: JSON.stringify(ids),
          dataType: "json",
          contentType: "application/json"
        }).success(function (json) {
          if (!json) return def.reject('未知的错误');
          if (!json.state || json.state == 'fail')  return def.reject(json.msg);
          def.resolve();
        });

        return promise;
      },

      update: function (model) {
        var def = $.Deferred();
        var promise = def.promise();

        $.ajax({
          type: "PUT",
          url: _url,
          data: JSON.stringify(model),
          dataType: "jsonp",
          contentType: "application/json"
        }).success(function (json) {
          if (!json.state || json.state == 'fail') return def.reject(json ? json.msg : '未知的错误');
          def.resolve(json.result);
        });

        return promise;
      },

      create: function (model) {
        var def = $.Deferred();
        var promise = def.promise();

        $.ajax({
          type: "POST",
          url: _url,
          data: JSON.stringify(model),
          dataType: "jsonp",
          contentType: "application/json"
        }).success(function (json) {
          if (!json.state || json.state == 'fail') return def.reject(json ? json.msg : '未知的错误');
          def.resolve(json.result);
        });

        return promise;
      },

      retrieve: function () {
        var def = $.Deferred();
        var promise = def.promise();

        $.ajax({
          type: "GET",
          url: _url,
          data: pager.condition,
          dataType: "jsonp",
          contentType: "application/json"
        }).success(function (json) {

          if (!json) return def.reject('未知的错误');
          if (!json.state || json.state == 'fail')  return def.reject(json.msg);

          def.resolve(json);
        });

        return promise;
      }
    };
  }])

});