/**
 * Created by huangyao on 2017/7/14.
 */
var app = angular.module('myApp',
    [
        'ui.router',
		'angularFileUpload'//除在controller注入之外 在module中同样注入
    ]);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('first', {
            url: '/first',
            templateUrl: 'views/first/first.html',
        })
        .state('second', {
            //路由传递参数url: '/second:ifOvaue',
			url: '/second',
            templateUrl: 'views/second/second.html',
        })
		.state('third', {
			url: '/third',
			templateUrl: 'views/third/third.html',
		})

    $urlRouterProvider.otherwise('first')
})