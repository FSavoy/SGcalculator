// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

//setup angular
var app = angular.module('sgcalculator', ['ionic']);

app.controller('calculator', function ($scope, $ionicModal) {
	
	$scope.string = "";
	$scope.result = "";
	
	$scope.$watch($scope.string, function(oldVal, newVal){
		$scope.result = $scope.string;
	});
	
	// Also used when starts with "-"
	$scope.addNumber = function(elem){
		$scope.string = $scope.string + elem;
		compute();
	}
	
	// Expression cannot start with operator (or zero)
	$scope.addOperator = function(elem){
		if($scope.string){
			$scope.string = $scope.string + elem;
			compute();
		}
	}
	
	$scope.removeLast = function(){
		$scope.string = $scope.string.slice(0, -1);
		compute();
	}
	
	$scope.reset = function(){
		$scope.string = "";
		$scope.result = "";	
	}
	
	$scope.equal = function(){
		if($scope.result && $scope.result != "undefined"){
			$scope.string = $scope.result;
			$scope.result = "";		
		}	
	}
	
	var compute = function(){
		var toEval = $scope.string.replace(/G/g, '*1.07').replace(/S/g, '*1.1').replace(/T/g, '*1.177').replace(/x/g, '*').replace(/÷/g, '/');
		
		if(/^(-)?\d+$/.test(toEval)){ // There is only numbers, nothing to compute
			$scope.result = "";
		} else {
			try {
				$scope.result = String(math.eval(toEval));
			}
			catch(err) {
    			$scope.result = '';
			}
		}
		
		
	}
	
	// Remove splash screen
	// https://calendee.com/2015/03/03/polish-app-launch-with-cordova-splashscreen-plugin/
	$scope.$on('$ionicView.loaded', function() {
		ionic.Platform.ready( function() {
			if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
		});
	});

});

app.filter('display',function() {
    return function(input) {
        if (input) {
            return input.replace(/G/g, 'x1.07').replace(/S/g, 'x1.1').replace(/T/g, 'x1.177');   
        }
    }
});

// Round to 6 decimals
app.filter('removeDecimals',function() {
    return function(input) {
        if (input) {
            return Math.round(input*1000000)/1000000;
        }
    }
});