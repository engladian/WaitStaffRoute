var app = angular.module('waitStaffApp', []);

app.controller('waitStaffCtrl', function ($scope) {
    resetAll();

    $scope.submitMeal = function () {
        if ($scope.waitStaffForm.$valid) {
            $scope.charges.subtotal = $scope.meal.basePrice * (1 + ($scope.meal.taxRate / 100));
            $scope.charges.tip = $scope.meal.basePrice * ($scope.meal.tipPercent / 100);
            $scope.charges.total = $scope.charges.subtotal + $scope.charges.tip;
            $scope.earnings.tipTotal += $scope.charges.tip;
            $scope.earnings.mealCount++;
            $scope.earnings.avgTipPerMeal = $scope.earnings.tipTotal / $scope.earnings.mealCount;
        }
    };

    $scope.cancelMeal = function () {
        $scope.meal = {};
    };

    $scope.reset = function () {
        resetAll();
        $scope.waitStaffForm.$setPristine();
    };

    function resetAll() {
        $scope.meal = {};
        $scope.charges = { subtotal: 0, tip: 0, total: 0 };
        $scope.earnings = { tipTotal: 0, mealCount: 0, avgTipPerMeal: 0 };
    }

});