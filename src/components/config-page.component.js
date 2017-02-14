(function () {

    'use strict';

    angular
        .module('oddc.widget.rssreader')
        .component('configPage', {
            templateUrl: 'src/components/config-page.component.html',
            controller: configPageController,
            controllerAs: 'configPageController'
        });

    configPageController.$inject = ['$log', 'widgetState', 'Feedreader', '$state'];
    function configPageController($log, widgetState, Feedreader, $state) {
        var vm = this;
        vm.Feedreader = Feedreader;
        vm.feedUrl = vm.Feedreader.getFeedUrl();
        vm.$onInit = $onInit;
        vm.submitRssFeed = submitRssFeed;

        function $onInit() {
            widgetState.setBackButtonState('index');
        }

        function submitRssFeed(feedUrl) {
            vm.Feedreader
                .saveFeedUrl(feedUrl)
                .then(onSaveFeedUrlSuccess())
                .catch(onSaveFeedUrlError);

            function onSaveFeedUrlSuccess(response) {
                $log.debug('onSaveFeedUrlSuccess(response): ', response);
                $state.go('index');
            }

            function onSaveFeedUrlError(error) {
                $log.error(error);
            }
        }
    }

})();