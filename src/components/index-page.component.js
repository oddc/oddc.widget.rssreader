(function () {

    'use strict';

    angular
        .module('oddc.widget.rssreader')
        .component('indexPage', {
            templateUrl: 'src/components/index-page.component.html',
            controller: indexPageController,
            controllerAs: 'indexPageController'
        });

    indexPageController.$inject = ['$log', 'Feedreader', '$window', '$timeout', '$state'];
    function indexPageController($log, Feedreader, $window, $timeout, $state) {
        var vm = this;
        vm.loading = false;
        vm.Feedreader = Feedreader;
        vm.$onInit = $onInit;
        vm.$postLink = $postLink;
        vm.onOpenItem = onOpenItem;

        function $onInit() {
            vm.loading = true;
            vm.Feedreader
                .requestFeeds()
                .catch(onRequestFeedsError)
                .finally(onRequestFeedsDone);

            function onRequestFeedsError(error) {
                $log.error(error);
            }

            function onRequestFeedsDone() {
                $timeout(function () {
                    vm.loading = false;
                }, 500);
            }
        }

        function $postLink() {
            if (!$('.config-icon').length) {
                $('<div>', {
                    'class': "config-icon icon",
                    'data-icon': "k",
                    on: {
                        click: function () {
                            $state.go('config');
                        }
                    }
                }).appendTo('body');
            }
        }

        function onOpenItem(url) {
            $window.open(url);
        }
    }

})();