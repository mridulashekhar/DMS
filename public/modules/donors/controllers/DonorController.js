angular.module('viewDonorController', []).controller("viewDonorController", function ($scope, $routeParams, $http) {

    var refresh = function () {
        $http.get('/Donor/' + $scope.donor._id).success(function (response) {
            console.log("I got the data I requested");
            $scope.donor = response;
            $scope.donor.totalDonation = 0;
            $scope.donor.eventsDonated = [];
            for (x in $scope.donor.Events) {
                getDonatedEvents(x);
                $scope.donor.totalDonation += parseInt($scope.donor.Events[x]);
            }
        });
    };

    function getDonatedEvents(x) {
        $http.get('/Event/' + x).success(function (resp) {
            var name = resp.EventName;
            if ($scope.donor.eventsDonated.indexOf(name) < 0) {
                $scope.donor.eventsDonated.push(name);
            }

        });
    }

    $http.get('/Donor/' + $routeParams.id).success(function (response) {
        console.log("I got the data I requested");
        $scope.donor = response;
        $scope.donor.totalDonation = 0;
        $scope.donor.eventsDonated = [];
        for (x in $scope.donor.Events) {
            getDonatedEvents(x);
            $scope.donor.totalDonation += parseInt($scope.donor.Events[x]);
        }
    });

    $http.get('/Event/').success(function (response) {
        console.log("I got the data I requested");
        $scope.events = response;
    });

    $scope.donate = function () {
        $http.get('/Donor/' + $scope.donor._id).success(function (response) {
            console.log("I got the data I requested");
            var donor = response;
            if (!donor.Events) {
                donor.Events = {};
            }
            donor.Events[$scope.donor.eventId] = $scope.donor.donationAmount;
            $http.put('/Donor/' + $scope.donor._id, donor).success(function (response) {
                refresh();
            });
            $http.get('/Event/' + $scope.donor.eventId).success(function (response) {
                var event = response;
                if (!event.Donors) {
                    event.Donors = {};
                }
                event.Donors[$scope.donor._id] = $scope.donor.donationAmount;

                $http.put('/Event/' + $scope.donor.eventId, event).success(function (response) {
                    refresh();
                });

            });


        });
    };
});