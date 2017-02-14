(function () {

    'use strict';

    angular
        .module('oddc.widget.rssreader')
        .factory('Feedreader', FeedreaderFactory);

    FeedreaderFactory.$inject = ['$log', '$q', 'widgetServices', 'widgetConfiguration'];
    function FeedreaderFactory($log, $q, widgetServices, widgetConfiguration) {
        var _feeds = [],
            _feedUrl = 'https://www.optadata-gruppe.de/presse/alle.rss',
            _service = {
                requestFeeds: requestFeeds,
                getFeeds: getFeeds,
                setFeeds: setFeeds,
                getFeedUrl: getFeedUrl,
                setFeedUrl: setFeedUrl,
                saveFeedUrl: saveFeedUrl
            };

        function requestFeeds() {
            // FIXME: Der Widgetbuilder bietet in einen Service um Properties zu setzen und auszulesen. Bitte umschreiben.
            return widgetServices
                .callService('loadCustomRssFeed')
                .then(onLoadCustomRssFeedSuccess)
                .then(onRequestFeedsSuccess)
                .catch(onRequestFeedsError);

            function onLoadCustomRssFeedSuccess(response) {
                if (response.error && typeof widgetConfiguration !== 'undefined' && widgetConfiguration !== null) {
                    $log.error(response.message);
                    _service.setFeedUrl(widgetConfiguration.feedUrl);
                } else {
                    _service.setFeedUrl(response.propertyValueString);
                }
                return widgetServices.callService('requestFeeds', {feedUrl: _service.getFeedUrl()});
            }

            function onRequestFeedsSuccess(response) {
                _service.setFeeds(response.data);
            }

            function onRequestFeedsError(error) {
                $log.error(error);
                return $q.reject(error);
            }
        }

        function getFeeds() {
            return _feeds;
        }

        function setFeeds(feeds) {
            _feeds = feeds;
        }

        function getFeedUrl() {
            return _feedUrl;
        }

        function setFeedUrl(feedUrl) {
            _feedUrl = feedUrl;
        }

        function saveFeedUrl(feedUrl) {
            return widgetServices
                .callService('getCurrentUser')
                .then(onGetCurrentUserSuccess)
                .then(onSaveCustomFeedUrlSuccess)
                .then(onRequestFeedsSuccess)
                .catch(onError);

            function onGetCurrentUserSuccess(user) {
                // FIXME: Der Widgetbuilder bietet in einen Service um Properties zu setzen und auszulesen. Bitte umschreiben.
                return widgetServices.callService('saveCustomFeedUrl', {
                    "id": {
                        "widgetIdentifier": "oddc.widget.rssreader",
                        "userId": user.openId,
                        "propertyKey": "feed",
                        "globalProperty": false
                    },
                    "propertyValueString": feedUrl
                });
            }

            function onSaveCustomFeedUrlSuccess(response) {
                _service.setFeedUrl(feedUrl);
                return widgetServices.callService('requestFeeds', {feedUrl: _service.getFeedUrl()});
            }

            function onRequestFeedsSuccess(response) {
                _service.setFeeds(response.data);
            }

            function onError(error) {
                $log.error(error);
            }
        }

        return _service;
    }

})();