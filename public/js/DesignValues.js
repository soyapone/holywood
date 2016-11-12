(function(){
  var app = angular.module('myApp', [ ]);

  app.controller('InicializadorController', function(){
    this.products = gems;
  });

  app.controller('CalculoController', ['$scope', '$http', '$log', function($scope,$http,$log){
    var cal = this;
    $scope.errVisibility = "none";
    $scope.extVisibility = "none";

    this.sendCalculation = function(){
      // mandar hacer el cálculo
      //alert("Alerta me han mandado un calculation!");
      //this.calculation.resultado = "";
      //http://localhost:3705/CompressionPerpendicularToTheGrain/?Fd=14752&b=90&l=70&a1=0&a2=30&l1=1000&h=300&Continuous=false&s=GL24h&service=1&LoadDuration=S&gammaM=1.25&format=xml
      //
      var CharacteristicValues = '/CharacteristicValues/'
      +'?s='+cal.calculation.woodtype+'&format=json';

      var DesignValues = '/DesignValues/'
      +'?s='+cal.calculation.woodtype+'&service='+cal.calculation.service
      +'&LoadDuration='+cal.calculation.LoadDuration+'&b='+cal.calculation.b
      +'&h='+cal.calculation.h+'&Ksys='+cal.calculation.Ksys
      +'&Kh='+cal.calculation.Kh+'&gammaM='+cal.calculation.gammaM
      +'&format=json';

      $http({
        method: 'GET',
        url: CharacteristicValues
      }).then(function successCallback(responseCharacteristicValues) {
        $scope.errVisibility = "none";
        $scope.extVisibility = "none";
        // this callback will be called asynchronously
        // when the response is available
        // Aquí no podemos poner THIS!!
        //alert(JSON.stringify(response.data.index, null, 4));
        $scope.fmk = responseCharacteristicValues.data.fmk;
        $scope.ft0k = responseCharacteristicValues.data.ft0k;
        $scope.ft90k = responseCharacteristicValues.data.ft90k;
        $scope.fc0k = responseCharacteristicValues.data.fc0k;
        $scope.fc90k = responseCharacteristicValues.data.fc90k;
        $scope.fvk = responseCharacteristicValues.data.fvk;
        $scope.E0mean = responseCharacteristicValues.data.E0mean;
        $scope.E005 = responseCharacteristicValues.data.E005;
        $scope.E90mean = responseCharacteristicValues.data.E90mean;
        $scope.Gmean = responseCharacteristicValues.data.Gmean;
        $scope.rhok = responseCharacteristicValues.data.rhok;
        $scope.rhomean = responseCharacteristicValues.data.rhomean;

        $scope.frgk = responseCharacteristicValues.data.frgk;
        $scope.E9005 = responseCharacteristicValues.data.E9005;
        $scope.G05 = responseCharacteristicValues.data.G05;
        $scope.Grmean = responseCharacteristicValues.data.Grmean;
        $scope.Gr05 = responseCharacteristicValues.data.Gr05;

        if( typeof responseCharacteristicValues.data.frgk !== 'undefined' ) {
          $scope.extVisibility = "initial";
        }

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        // Aquí no podemos poner THIS!!
        $scope.errVisibility = "initial";
        $scope.errMsg = response.data;

        $scope.fmk = "error";
        $scope.ft0k = "error";
        $scope.ft90k = "error";
        $scope.fc0k = "error";
        $scope.fc90k = "error";
        $scope.fvk = "error";
        $scope.E0mean = "error";
        $scope.E005 = "error";
        $scope.E90mean = "error";
        $scope.Gmean = "error";
        $scope.rhok = "error";
        $scope.rhomean = "error";

        $scope.frgk = "error";
        $scope.E9005 = "error";
        $scope.G05 = "error";
        $scope.Grmean = "error";
        $scope.Gr05 = "error";
      });

      $http({
        method: 'GET',
        url: DesignValues
      }).then(function successCallback(responseDesignValues) {
        $scope.errVisibility = "none";
        // this callback will be called asynchronously
        // when the response is available
        // Aquí no podemos poner THIS!!
        //alert(JSON.stringify(response.data.index, null, 4));

        $scope.fmd  = responseDesignValues.data.fmd;
        $scope.ft0d = responseDesignValues.data.ft0d;
        $scope.ft90d = responseDesignValues.data.ft90d;
        $scope.fc0d = responseDesignValues.data.fc0d;
        $scope.fc90d = responseDesignValues.data.fc90d;
        $scope.fvd = responseDesignValues.data.fvd;

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        // Aquí no podemos poner THIS!!
        $scope.errVisibility = "initial";
        $scope.errMsg = response.data;


        $scope.fmd  = "error";
        $scope.ft0d = "error";
        $scope.ft90d = "error";
        $scope.fc0d = "error";
        $scope.fc90d = "error";
        $scope.fvd = "error";

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
