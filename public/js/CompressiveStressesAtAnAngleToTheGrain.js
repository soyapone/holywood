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
      //http://localhost:3705/CompressionPerpendicularToTheGrainEURO/api?Fd=14752&b=90&l=70&a1=0&a2=30&l1=1000&h=300&Continuous=false&s=GL24h&service=1&LoadDuration=S&gammaM=1.25&format=xml
      //
      var myurlEURO = '/CompressiveStressesAtAnAngleToTheGrainEURO/api'
      +'?falfaD='+cal.calculation.falfaD+'&b='+cal.calculation.b
      +'&l='+cal.calculation.l+'&l1='+cal.calculation.l1
      +'&c1='+cal.calculation.c1
      +'&c2='+cal.calculation.c2+'&h='+cal.calculation.h
      +'&Continuous='+cal.calculation.Continuous
      +'&s='+cal.calculation.woodtype+'&service='+cal.calculation.service
      +'&LoadDuration='+cal.calculation.LoadDuration
      +'&gammaM='+cal.calculation.gammaM+'&alfaGr='+cal.calculation.alfaGr
      +'&format=json';

      var myurlDIN = '/CompressiveStressesAtAnAngleToTheGrainDIN/api'
      +'?falfaD='+cal.calculation.falfaD+'&b='+cal.calculation.b
      +'&l='+cal.calculation.l+'&l1='+cal.calculation.l1
      +'&c1='+cal.calculation.c1
      +'&c2='+cal.calculation.c2+'&h='+cal.calculation.h
      +'&Continuous='+cal.calculation.Continuous
      +'&s='+cal.calculation.woodtype+'&service='+cal.calculation.service
      +'&LoadDuration='+cal.calculation.LoadDuration
      +'&gammaM='+cal.calculation.gammaM+'&alfaGr='+cal.calculation.alfaGr
      +'&format=json';

      $http({
        method: 'GET',
        url: myurlEURO
      }).then(function successCallback(responseEuro) {
          $scope.errVisibility = "none";
          // this callback will be called asynchronously
          // when the response is available
          // Aquí no podemos poner THIS!!
          //alert(JSON.stringify(response.data.index, null, 4));
          $scope.euroareaEf  = responseEuro.data.areaEf;
          $scope.eurokc90 = responseEuro.data.kc90;
          $scope.eurofcalfaD = responseEuro.data.fcalfaD;
          $scope.euroindex = responseEuro.data.index;

          if ($scope.euroindex <= 1) {
            $scope.euroMyColor = "#00FF00";
          } else {
            $scope.euroMyColor = "#FF0000";
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

          $scope.euroareaEf = "error";
          $scope.eurokc90 = "error";
          $scope.eurofcalfaD = "error";
          $scope.euroindex = "error";
          $scope.euroMyColor = "#FF0000";

        });

        $http({
          method: 'GET',
          url: myurlDIN
        }).then(function successCallback(responseDIN) {
            $scope.errVisibility = "none";
            // this callback will be called asynchronously
            // when the response is available
            // Aquí no podemos poner THIS!!
            //alert(JSON.stringify(response.data.index, null, 4));
            $scope.DINareaEf  = responseDIN.data.areaEf;
            $scope.DINkc90 = responseDIN.data.kc90;
            $scope.DINfcalfaD = responseDIN.data.fcalfaD;
            $scope.DINkcalf = responseDIN.data.kcalf;
            $scope.DINindex = responseDIN.data.index;

            if ($scope.DINindex <= 1) {
              $scope.DINMyColor = "#00FF00";
            } else {
              $scope.DINMyColor = "#FF0000";
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

            $scope.DIN.areaEf = "error";
            $scope.DIN.kc90 = "error";
            $scope.DIN.fcalfaD = "error";
            $scope.DIN.index = "error";
            $scope.myColor = "#FF0000";

          });


    };
  }]);

})();
