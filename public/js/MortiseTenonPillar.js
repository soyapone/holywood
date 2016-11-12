(function(){
  var app = angular.module('myApp', [ ]);

  app.controller('InicializadorController', function(){
    this.products = gems;
  });

  app.controller('CalculoController', ['$scope', '$http', '$log', function($scope,$http,$log){
    var cal = this;
    $scope.errVisibility = "none";

    this.sendCalculation = function(){
      // mandar hacer el cálculo
      //alert("Alerta me han mandado un calculation!");
      //this.calculation.resultado = "";
      //http://localhost:3705/MortiseTenonPillar/?Nd=21&b=21&hprime=21&bprime=21&lprime=21&a1=21&a2=21&l1=21&h=21&Continuous=true&s=C14&service=1&LoadDuration=P&gammaM=1.3&format=json
      //
      var myurl = '/MortiseTenonPillar/'
      +'?Nd='+cal.calculation.Nd+'&b='+cal.calculation.b
      +'&hprime='+cal.calculation.hprime+'&bprime='+cal.calculation.bprime
      +'&lprime='+cal.calculation.lprime+'&a1='+cal.calculation.a1
      +'&a2='+cal.calculation.a2+'&l1='+cal.calculation.l1
      +'&h='+cal.calculation.h+'&Continuous='+cal.calculation.Continuous
      +'&s='+cal.calculation.woodtype+'&service='+cal.calculation.service
      +'&LoadDuration='+cal.calculation.LoadDuration
      +'&gammaM='+cal.calculation.gammaM+'&format=json';

      $http({
        method: 'GET',
        url: myurl
      }).then(function successCallback(response) {
          $scope.errVisibility = "none";
          // this callback will be called asynchronously
          // when the response is available
          // Aquí no podemos poner THIS!!
          //alert(JSON.stringify(response.data.index, null, 4));
          $scope.sigmaC90d = response.data.sigmaC90d;
          $scope.fc90d = response.data.fc90d;
          $scope.areaEf = response.data.areaEf;
          $scope.kc90 = response.data.kc90;
          $scope.index = response.data.index;

          if ($scope.index <= 1) {
            $scope.myColor = "#00FF00";
          } else {
            $scope.myColor = "#FF0000";
          }

          // cal.calculation.result.sigmaC90d = response.data.sigmaC90d;
          // cal.calculation.result.fc90d = response.data.fc90d;
          // cal.calculation.result.areaEf = response.data.areaEf;
          // cal.calculation.result.index = response.data.index;

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          // Aquí no podemos poner THIS!!
          $scope.errVisibility = "initial";
          $scope.errMsg = response.data;

          $scope.sigmaC90d = "error";
          $scope.fc90d = "error";
          $scope.areaEf = "error";
          $scope.kc90 = "error";
          $scope.index = "error";
          $scope.myColor = "#FF0000";

        });

    };
  }]);



var gems = [
{
  name: 'Dodecaedro',
  price: 2.95,
  description: 'esta es la descripcion',
  canPurchase: false
},
{
  name: 'Gema superchula',
  price: 17.00,
  description: 'Gema que te cagas de chuli',
  canPurchase: true
}

]

})();
