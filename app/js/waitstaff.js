"use strict";

var app = angular.module('WaitStaffApp', ['ngRoute']);

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
        });
}]);

app.controller('NewMealController', function ($scope) {
    ResetMealForm();
    $scope.SubmitMeal = function () {
        if ($scope.NewMealForm.$valid) {
            $scope.charges.subTotal = $scope.meal.basePrice * (1 + ($scope.meal.taxRate / 100));
            $scope.charges.tip = $scope.meal.basePrice * ($scope.meal.tipPercent / 100);
            $scope.charges.total = $scope.charges.subTotal + $scope.charges.tip;
            //$rootscope.earnings.tipTotal += $scope.charges.tip;
            //$rootscope.earnings.mealCount++;
            //$rootscope.earnings.avgTipPerMeal = $rootscope.earnings.tipTotal / $rootscope.earnings.mealCount;
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

app.controller('MyEarningsController', function ($rootscope) {
    function ResetAll() {
        $rootscope.earnings = { tipTotal: 0, mealCount: 0, avgTipPerMeal: 0 };
    }
});