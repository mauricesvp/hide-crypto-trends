// Adapted from https://github.com/lucaswerkmeister/hide-twitter-trends/

"use strict";

browser.webNavigation.onHistoryStateUpdated.addListener(
    ({ tabId }) => {
        browser.tabs.sendMessage(tabId, "removeCryptoTrends");
    },
    {
        url: [{ hostEquals: "twitter.com" }],
    }
);
