(function () {

    'use strict';

    angular
        .module('oddc.widget.rssreader')
        .component('feedlist', {
            templateUrl: 'src/components/feedlist/feedlist.component.html',
            controllerAs: 'feedlistController',
            bindings: {
                list: '<',
                onOpenItem: '&'
            }
        });

})();