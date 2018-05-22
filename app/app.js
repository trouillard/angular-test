var App = angular.module("App", ["ngRoute"]);
App.constant('config', constants());
App.config(['$routeProvider', 'config', routes]);
App.factory('appServices', ['$http', 'config', appServices]);
App.controller('Ctrl', ['$scope', '$http', 'config', 'appServices', controlleur]);

function appServices($http, config) {

        return {
            getZone: getZone
        };

		function getZone() {
			$http({
				method: 'GET',
				url: config.urlPath + "/zones/" + "1"
			}).then(function(data) {
				$scope.nom = "coucou ok";
				return "OK";
			}, function(data, status) {
				$scope.nom = "coucou ko";
				return "KO";
			});
        }
}

function controlleur($scope, $http, config, appServices) {

    $scope.ref = "";
	$scope.nom = "";

    //recherche($http, config, $scope.id);

	$scope.recherche = function recherche() {
/*
            $http({
                method: 'GET',
                url: config.urlPath + "/zones/" + $scope.ref
            })
			//$http.get(config.urlPath + "/zones/" + $scope.ref)
			.then(
					function(response) {
						$scope.nom = response.data.data[0].nom;
					},
					function(response) {
						console.log(response);
					}
				 );
*/

          $scope.nom = appServices.getZone();
          //.then(function(data) {
		//
			//	$scope.nom = "yesss";
          //  });

        //  appServices.getZone();
        //  .then(function(data) {
		//			$scope.nom = "gagne";
        //        }
        //  );

	};

}

function constants() {
    return {
        urlPath: 'http://localhost:3001/RestGenerique/rest',
    };
}

function routes($routeProvider, config) {

		$routeProvider

		.when("/test", {
			templateUrl : "test.html"
		})
		.otherwise({
			templateUrl : "test.html"
		});

}
