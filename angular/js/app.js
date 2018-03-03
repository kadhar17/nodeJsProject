var app = angular.module("myapp", []);

app.controller("mycontroller", function ($scope, $http,$filter) {
    $scope.serverUrl = "http://localhost:8030";
    $scope.currState = "";
    $scope.userlist = false;

    $scope.name = 'Abdul';
    $scope.age = 27;
    $scope.phone = 99528384321;
    $scope.doj = new Date();
    console.log($scope.doj)
    $scope.desg = "Associate animation development";
    $scope.photo = "C:\Users\Abdul\Desktop\abdul.jpg";
    console.log("$scope.doj "+$scope.doj)
    $scope.reset = function () {
        $scope.name = 'Abdul';
        $scope.age = 27;
        $scope.phone = 99528384321;
        $scope.doj = new Date();
        $scope.desg = "Associate animation development";
        $scope.photo = "C:\Users\Abdul\Desktop\abdul.jpg";
    }

    $scope.add = function () {
        console.log("add"+$scope.photo)
        $http({
            method: "Get",
            params: {
                "name": $scope.name,
                "age": $scope.age,
                "phone": $scope.phone,
                "doj": $filter('date')($scope.doj, 'yyyy-MM-dd'),
                "desg": $scope.desg,
                "photo": $scope.photo
            },
            accepts: "application/json",
            dataType: 'json',
            url: $scope.serverUrl + "/add"
        })
            .then(function (response) {
                console.log("success")
                $scope.reset()
                $scope.list();
            },
                function (response) {
                    // failure call back
                    console.log("error in data")
                });
    }

    $scope.fetch = function () {
       
        $http({
            method: "Get",
            params: {
                "phone": $scope.phone
            },
            accepts: "application/json",
            dataType: 'json',
            url: $scope.serverUrl + "/fetch"
        })
            .then(function (response) {
                console.log("fetch"+new Date(response.data[0].doj))
                $scope.name = response.data[0].name;
                $scope.age = response.data[0].age;
                $scope.doj = new Date(response.data[0].doj);
                $scope.desg = response.data[0].desg;
                $scope.photo = response.data[0].photo.data;
                $scope.currState = "fetch";
                // alert("fetch Successfully");
            },
                function (response) {
                    // failure call back
                    console.log("error in fetch")
                });
    }

    $scope.update = function () {
        console.log($filter('date')($scope.doj, 'yyyy-MM-dd'))
        console.log("add"+$scope.photo)
        $http({
            method: "Get",
            params: {
                "name": $scope.name,
                "age": $scope.age,
                "phone": $scope.phone,
                "doj": $filter('date')($scope.doj, 'yyyy-MM-dd'),
                "desg": $scope.desg,
                "photo":$scope.photo
            },
            accepts: "application/json",
            dataType: 'json',
            url: $scope.serverUrl + "/update"
        })
            .then(function (response) {
                console.log("updated")
                $scope.reset()
                $scope.currState = "";
                $scope.list();
                //alert("updated Successfully");
            },
                function (response) {
                    // failure call back
                    console.log("error in update")
                });
    }

    $scope.delete = function () {
        $http({
            method: "Get",
            params: {
                "phone": $scope.phone
            },
            accepts: "application/json",
            dataType: 'json',
            url: $scope.serverUrl + "/delete"
        })
            .then(function (response) {
                console.log("deleted")
                $scope.currState = "";
                $scope.reset()
                $scope.list();
            },
                function (response) {
                    // failure call back
                    console.log("error in data")
                });
    }

    $scope.list = function () {
        $http({
            method: "Get",
            accepts: "application/json",
            dataType: 'json',
            url: $scope.serverUrl + "/list"
        })
            .then(function (response) {
                console.log("success")
                $scope.userlist = true;
                $scope.userdata = response.data;
                //console.log($scope.userdata)
            },
                function (response) {
                    // failure call back
                    console.log("error in list")
                });
    }

    $scope.hidelist = function () {
        $scope.userlist = false;
    }

    $scope.checkid = function () {
        return
    }
});