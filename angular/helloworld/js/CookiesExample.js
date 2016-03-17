'use strict';
angular.module('CookiesExample', ['ngCookies'])
.controller('MainCtrl', ['$scope' , '$cookies',  function($scope,$cookies) {

  $scope.name ='init';
  $scope.onClickBtn = function(){
    var note = {
        title:'bohebohe',
        price:2000,
        publisher:'Henle'
      };
      //Setting cookies
      $cookies.putObject('note', note);
      $scope.name = $cookies.getObject('note').title;
  };

}]);
