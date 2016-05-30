var eventsController = angular.module('eventsController', []);
eventsController.controller('eventsController', ['$scope', '$http',
    function ($scope, $http) {
        console.log("Hello world from Event controller");

        function getDonor(x, y) {
            $http.get('/Donor/' + y).success(function (resp) {
                var name = resp.FirstName + " " + resp.LastName;
                if ($scope.Events[x].DonorsDonated.indexOf(name) < 0) {
                    $scope.Events[x].DonorsDonated.push(name);
                }
            });
        }

        var refresh = function () {
            $http.get('/Event').success(function (response) {
                console.log("I got the data I requested");
                $scope.Events = response;

                for (x in $scope.Events) {
                    $scope.Events[x].TotalDonation = 0;
                    $scope.Events[x].DonorsDonated = [];
                    for (y in $scope.Events[x].Donors) {
                        getDonor(x, y);
                        $scope.Events[x].TotalDonation += parseInt($scope.Events[x].Donors[y]);
                    }
                }
            });
        };

        refresh();

        $scope.addEvent = function () {
            console.log($scope.event);
            $http.post('/Event', $scope.event).success(function (response) {
                console.log(response);
                refresh();
            });
        };

        $scope.remove = function (id) {
            console.log(id);
            $http.get('/Event/' + id).success(function (response) {
                var event = response;
                $http.delete('/Event/' + id).success(function (response) {
                    if (!event.Donors) {
                        refresh();
                    }
                    for (x in event.Donors) {
                        $http.get('/Donor/' + x).success(function (response) {
                            var donor = response;
                            delete donor.Events[id];
                            $http.put('/Donor/' + donor._id, donor).success(function (response) {
                                refresh();
                            });
                        })
                    }
                })
            });
        };


        $scope.edit = function (id) {
            console.log(id);
            $http.get('/Event/' + id).success(function (response) {
                $scope.event = response;
            })
        };

        $scope.update = function () {
            console.log($scope.event._id);
            $http.put('/Event/' + $scope.event._id, $scope.event).success(function (response) {
                refresh();
            })
        };

        $scope.deselect = function () {
            $scope.event = "";
        }


    }]);