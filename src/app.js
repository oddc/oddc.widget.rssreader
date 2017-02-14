(function(){

    'use strict';

    angular
        .module('oddc.widget.rssreader',['widgetbuilder'])
        .config(stateMashineConfig);

    stateMashineConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function stateMashineConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                template: '<index-page/>',
                data: {
                    cssClassNames : 'index'
                }
            })
            .state('config', {
                url: '/config',
                template: '<config-page/>',
                data: {
                    cssClassNames : 'config'
                }
            });

        $urlRouterProvider.otherwise('/');
    }

})();