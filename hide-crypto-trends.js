// Adapted from https://github.com/lucaswerkmeister/hide-twitter-trends/

"use strict";

function removeCryptoTrends() {
    for (let trends of document.querySelectorAll('a[href="/settings/trends"]')) {
        if (trends.closest("article")) {
            // trends link in a tweet
            continue;
        }
        trends = trends.closest("h2");
        if (!trends) {
            // trends link in settings? maybe?
            continue;
        }
        trends = trends.closest("section");
        if (!trends) {
            // (unclear if this can happen)
            continue;
        }
        if (trends.firstElementChild.tagName !== "H1") {
            // (unclear if this can happen)
            continue;
        }
        let parent;
        while ((parent = trends.parentElement).childElementCount == 1) trends = parent;
        for (let div of trends.querySelectorAll('div[data-testid="trend"]')) {
            for (let span of div.children[0].children[1].querySelectorAll("span")) {
                if (span.textContent.startsWith("$")) {
                    div.remove();
                }
            }
        }
        return;
    }

    for (let trends of document.querySelectorAll('a[href="/i/trends"]')) {
        if (trends.closest("article")) {
            // trends link in a tweet
            continue;
        }
        trends = trends.closest("section");
        if (!trends) {
            // (unclear if this can happen)
            continue;
        }
        if (trends.firstElementChild.tagName !== "H1") {
            // (unclear if this can happen)
            continue;
        }
        let parent;
        while ((parent = trends.parentElement).childElementCount == 1) trends = parent;
        for (let div of trends.querySelectorAll('div[data-testid="trend"]')) {
            for (let span of div.children[0].children[1].querySelectorAll("span")) {
                if (span.textContent.startsWith("$")) {
                    div.remove();
                }
            }
        }
        return;
    }

    for (let trends of document.querySelectorAll('a[href*="&src=trend_click"]')) {
        if (trends.closest("article")) {
            // trends link in a tweet
            continue;
        }
        trends = trends.closest("section");
        if (!trends) {
            // (unclear if this can happen)
            continue;
        }
        if (trends.firstElementChild.tagName !== "H1") {
            // (unclear if this can happen)
            continue;
        }
        let parent;
        while ((parent = trends.parentElement).childElementCount == 1) trends = parent;
        for (let div of trends.querySelectorAll('div[data-testid="trend"]')) {
            for (let span of div.children[0].children[1].querySelectorAll("span")) {
                if (span.textContent.startsWith("$")) {
                    div.remove();
                }
            }
        }
        return;
    }
}

function removeTrendsAFewTimes() {
    removeCryptoTrends();
    for (const delay of [100, 500, 3000]) {
        setTimeout(removeCryptoTrends, delay);
    }
}

function removeTrendsPeriodically() {
    setInterval(removeCryptoTrends, 30 * 60 * 1000); // every 30 minutes
}

removeTrendsAFewTimes();
removeTrendsPeriodically();

browser.runtime.onMessage.addListener((request) => {
    if (request === "removeCryptoTrends") {
        removeTrendsAFewTimes();
    } else {
        throw new Error(`Unknown request ${request}`);
    }
});
