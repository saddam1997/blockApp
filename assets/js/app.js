angular.module('blockappmodule', ['blockappmodule.service'])
.controller('dashboardCtrl', function($scope,UserService) {
  $scope.name="test";

  $scope.createNewAddress = function() {
      var userDetails={
        email:"test@gmail.com"
      }
      UserService.createNewAddress(userDetails).
        then(function(response) {
            console.log("Response :: " + angular.toJson(response));
            // if (response.statusCode == 60001) {
            //   console.log(" painterRedemptionHistory status code : 40003 " + angular.toJson(response.data));
            //   $scope.reasonsOfRejection = response.data;
            //   alert(angular.toJson($scope.reasonsOfRejection))
            // }
      });
  };



});
