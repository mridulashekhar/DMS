var donorController = angular.module('donorController', []);
donorController.controller('donorController', ['$scope', '$http',
    function ($scope, $http) {
        console.log("Hello world from controller");

        var refresh = function () {
            $http.get('/Donor').success(function (response) {
                console.log("I got the data I requested");
                $scope.donors = response;
                for (x in $scope.donors) {
                    $scope.donors[x].TotalDonation = 0;
                    for (y in $scope.donors[x].Events) {
                        $scope.donors[x].TotalDonation += parseInt($scope.donors[x].Events[y]);
                    }
                }
            });
        };

        refresh();

        $scope.addDonor = function () {
            console.log($scope.donor);
            $http.post('/Donor', $scope.donor).success(function (response) {
                console.log(response);
                refresh();
            });
        };

        $scope.remove = function (id) {
            console.log(id);
            $http.get('/Donor/' + id).success(function (response) {
                var donor = response;
                $http.delete('/Donor/' + id).success(function (response) {
                    for(x in donor.Events){
                        $http.get('/Event/' + x).success(function (response) {
                            var event = response;
                            delete event.Donors[id];
                            $http.put('/Event/' + event._id, event).success(function (response) {
                                refresh();
                            });
                        })
                    }
                    refresh();
                })
            })
        };


        $scope.get = function ($scope,$routeParams) {
            console.log($routeParams.id);
            $http.get('/Donor/' + id).success(function (response) {
                $scope.donor = response;
            })
        };

        $scope.edit = function (id) {
            console.log(id);
            $http.get('/Donor/' + id).success(function (response) {
                $scope.donor = response;
            })
        };

        $scope.update = function () {
            console.log($scope.donor._id);
            $http.put('/Donor/' + $scope.donor._id, $scope.donor).success(function (response) {
                refresh();
            })
        };

        $scope.deselect = function () {
            $scope.donor = "";
        }

    }]);