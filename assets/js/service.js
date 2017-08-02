angular.module('blockappmodule.service', [])
  .factory('UserService', function($http) {
    function UserService() {}

    // UserService.getLoyaltyPointsApproval = function() {
    //   return $http.get(constants.projectName + '/getRedeemProductForApproval?statusId=4', {
    //     headers: {
    //       'Content-Type': 'application/json;charset=UTF-8'
    //     }
    //   }).then(function(response) {
    //
    //     var data = response.data;
    //
    //     return response.data;
    //
    //   });
    // };

    UserService.createNewAddress = function(userDetails) {
      return $http.post('http://localhost:1337/user/createNewAddressApi', userDetails, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        // var data = response.data;
        //	alert("UserService "+angular.toJson(data))
        return response;
      });
    };

    return UserService;
  });
