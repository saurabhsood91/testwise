"use strict"

angular.module('TestWise', ['ui.bootstrap', 'ui.router', 'ngCookies'])
.controller('MainController', ['$modal', '$cookies', function($modal, $cookies){
  var self = this;
  self.openLoginDialog = function() {
    var modalInstance = $modal.open({
      templateUrl: 'templates/login-modal.html',
      controller: 'LoginModalInstanceCtrl as ctrl',
      backdrop: 'static'
    });
    modalInstance.result.then(function(data){
      // Set token on scope
      self.token = data.token;
    });
  };
}])
.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('testwise', {
    url: '/',
    views: {
      '': {
        templateUrl: '/partials/landingpage',
        controller: 'MainController',
        controllerAs: 'ctrl'
      }
    }
  });
}])
.controller('LoginModalInstanceCtrl', ['$modalInstance', '$http', '$cookies', function ($modalInstance, $http, $cookies) {
  var self = this;
  self.login = function() {
    // Login logic goes here
    $http.post('/login', {
      params: {
        username: self.username,
        password: self.password
      }
    })
    .success(function(data, status, headers, config){
      console.log(data);
      if(data["auth"] == 0) {
        // Not Logged in
        alert("Username and Password don't match")
      } else {
        // Logged in
        alert("Logged in...");
        $modalInstance.close(data);
      }
    });
  };
  self.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
