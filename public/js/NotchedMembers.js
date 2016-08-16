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
      //?Vd=14752&b=90&hef=70&h=5&Kcr=false&d=97&s=GL24h&x=4&service=1&LoadDuration=S&gammaM=1.25&notchOnSupport=true&format=xml
      var myurl = '/NotchedMembers/'
      +'?Vd='+cal.calculation.Vd+'&b='+cal.calculation.b
      +'&hef='+cal.calculation.hef+'&h='+cal.calculation.h
      +'&Kcr='+cal.calculation.Kcr+'&d='+cal.calculation.d
      +'&s='+cal.calculation.woodtype+'&x='+cal.calculation.x
      +'&service='+cal.calculation.service
      +'&LoadDuration='+cal.calculation.LoadDuration
      +'&gammaM='+cal.calculation.gammaM+'&notchOnSupport='+cal.calculation.notchOnSupport
      +'&format=json';

      $http({
        method: 'GET',
        url: myurl
      }).then(function successCallback(response) {
          $scope.errVisibility = "none";
          // this callback will be called asynchronously
          // when the response is available
          // Aquí no podemos poner THIS!!
          //alert(JSON.stringify(response.data.index, null, 4));
          $scope.Kn = response.data.Kn;
          $scope.Kv = response.data.Kv;
          $scope.Fvd = response.data.Fvd;
          $scope.TauD = response.data.TauD;
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



})();
