var server = 'http://localhost:5000/';

angular.module('tuitinho', [])
.controller('posts', function($scope, $http) {
    
    $scope.submitPost = function() {
        $http.put(server + 'post', {
            id: document.getElementById("id").value, 
            text: document.getElementById("text").value
        });
    }
    
    $scope.submitNewUser = function() {
        $http.post(server + 'users', {
            fullname: document.getElementById("fullname").value, 
            password: document.getElementById("password").value,
            email: document.getElementById("email").value, 
            dateBirth: document.getElementById("dateBirth").value
        });
    }
    
    $scope.submitDeleteUser = function() {
        $http.delete(server + 'users/' + document.getElementById("id").value);
    }
    
    $http.get(server + 'posts').
        then(function(response) {
            var posts = [];
            for (i in response.data) {
                for (j in response.data[i]) {
                    posts.push(response.data[i][j]);
                }
            }
            $scope.posts = posts;
        });
    
    $http.get(server + 'posts/tags').
        then(function(response) {
            $scope.tags = response.data;
        });
    
});
