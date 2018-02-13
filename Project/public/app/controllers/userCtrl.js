angular.module('userControllers',['userServices'])

	.controller('regCtrl', function($http, $location, $timeout, User){

		var app =this;

		this.regUser = function(regData){
			app.loading =true;
			app.errorMsg = false;
			
			// console.log("Testing button");
			// console.log(this.regData);
			// $http.post('/api/users', this.regData)
			User.create(app.regData).then(function(data){
				console.log(data);
				if(data.data.success){
					app.loading = false;
					app.successMsg = data.data.message;
					$timeout(function() {
						$location.path('/');
					}, 2000);

				}else{
					app.loading = false;
					app.errorMsg = data.data.message;
				}
			});
		};
	});


	//	router.post('/users', function(req, res){
