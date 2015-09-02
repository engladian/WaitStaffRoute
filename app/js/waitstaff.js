"use strict";
var app = angular.module('WaitStaffApp', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/_intro.html'
        })
        .when('/new-meal', {
            templateUrl: 'views/_newmeal.html',
            controller: 'NewMealController'
        })
        .when('/my-earnings', {
            templateUrl: 'views/_myearnings.html',
            controller: 'MyEarningsController'
        })
        .otherwise('/');
}]);

app.controller('NavController', function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    };
});

app.controller('NewMealController', function ($scope, $rootScope) {
    ResetMealForm();
    $scope.SubmitMeal = function () {
        if ($scope.NewMealForm.$valid) {
            $scope.charges.subTotal = $scope.meal.basePrice * (1 + ($scope.meal.taxRate / 100));
            $scope.charges.tip = $scope.meal.basePrice * ($scope.meal.tipPercent / 100);
            $scope.charges.total = $scope.charges.subTotal + $scope.charges.tip;

            if (typeof ($rootScope.earnings) === "undefined") {
                $rootScope.earnings = { tipTotal: 0, mealCount: 0, avgTipPerMeal: 0 };
            }

            //Keep the running totals updated.
            $rootScope.earnings.tipTotal += $scope.charges.tip;
            $rootScope.earnings.mealCount++;
            $rootScope.earnings.avgTipPerMeal = $rootScope.earnings.tipTotal / $rootScope.earnings.mealCount;
        }
    };

    $scope.CancelMeal = function () {
        ResetMealForm();
    };

    function ResetMealForm() {
        $scope.meal = {};
        $scope.charges = { subTotal: 0, tip: 0, total: 0 };
    }
});

app.controller('MyEarningsController', function ($scope, $rootScope) {
    if (typeof ($rootScope.earnings) === "undefined") {
        $rootScope.earnings = { tipTotal: 0, mealCount: 0, avgTipPerMeal: 0 };
    }
    $scope.earnings = $rootScope.earnings;
    $scope.ResetAll = function () {
        $scope.earnings = { tipTotal: 0, mealCount: 0, avgTipPerMeal: 0 };
        $rootScope.earnings = $scope.earnings;
    }
});

app.run(function ($rootScope, $timeout) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $rootScope.isLoading = false;
        }, 500); //Half second
    });
});