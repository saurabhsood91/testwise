"use strict"

angular.module('TestWise', ['ui.bootstrap'])
.controller('MainController', ['$scope', function($scope){
  var self = this;
}]);


document.getElementById("createNewUser").onclick = function () 
{
    location.href = "createNewUser";
};


