(function(){
  var app = angular.module('myApp', []);

  app.controller('InicializadorController', function(){
    // this.products = gems;
  });

  app.controller('CalculoController', ['$scope', '$http', '$log', function($scope,$http,$log){
    var cal = this;
    $scope.errVisibility = "none";
    $scope.extVisibility = "none";

    this.sendCalculation = function(){
      // mandar hacer el cálculo
      //alert("Alerta me han mandado un calculation!");
      //this.calculation.resultado = "";
      //http://localhost:3705/CompressionPerpendicularToTheGrain/api/?Fd=14752&b=90&l=70&a1=0&a2=30&l1=1000&h=300&Continuous=false&s=GL24h&service=1&LoadDuration=S&gammaM=1.25&format=xml
      //
      var myurl = '/CharacteristicValues/api'
      +'?s='+cal.calculation.woodtype+'&format=json';
      $http({
        method: 'GET',
        url: myurl
      }).then(function successCallback(response) {
          $scope.errVisibility = "none";
          $scope.extVisibility = "none";
          // this callback will be called asynchronously
          // when the response is available
          // Aquí no podemos poner THIS!!
          //alert(JSON.stringify(response.data.index, null, 4));
          $scope.fmk = response.data.fmk;
          $scope.ft0k = response.data.ft0k;
          $scope.ft90k = response.data.ft90k;
          $scope.fc0k = response.data.fc0k;
          $scope.fc90k = response.data.fc90k;
          $scope.fvk = response.data.fvk;
          $scope.E0mean = response.data.E0mean;
          $scope.E005 = response.data.E005;
          $scope.E90mean = response.data.E90mean;
          $scope.Gmean = response.data.Gmean;
          $scope.rhok = response.data.rhok;
          $scope.rhomean = response.data.rhomean;

          $scope.frgk = response.data.frgk;
          $scope.E9005 = response.data.E9005;
          $scope.G05 = response.data.G05;
          $scope.Grmean = response.data.Grmean;
          $scope.Gr05 = response.data.Gr05;

          if( typeof response.data.frgk !== 'undefined' ) {
            $scope.extVisibility = "initial";
          }


          //
          //
          // if ($scope.index <= 1) {
          //   $scope.myColor = "#00FF00";
          // } else {
          //   $scope.myColor = "#FF0000";
          // }


        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          // Aquí no podemos poner THIS!!
          $scope.errVisibility = "initial";
          $scope.errMsg = response.data;

          // $scope.sigmaC90d = "error";
          // $scope.fc90d = "error";
          // $scope.areaEf = "error";
          // $scope.kc90 = "error";
          // $scope.index = "error";
          // $scope.myColor = "#FF0000";

        });

    };
  }]);


})();
