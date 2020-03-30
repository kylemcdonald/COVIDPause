function setupMenus(enabled) {
    let status = enabled ? 'Disable' : 'Enable';
    let title = status + ' COVID Pause'
    chrome.browserAction.setBadgeText({text: enabled ? '' : 'Off'});
    chrome.contextMenus.removeAll((enabled) => {
        chrome.contextMenus.create({
            "id": "toggleCovidPage",
            "title": title,
            "type": "normal",
            "contexts": ["page"]
        });
        chrome.contextMenus.create({
            "id": "toggleCovidBrowser",
            "title": title,
            "type": "normal",
            "contexts": ["browser_action"]
        });
    });
}

chrome.storage.local.get(['enabled'], function(result) {
    let enabled = result.enabled;
    if (typeof(result.enabled) == "undefined") {
        enabled = true;
        chrome.storage.local.set({'enabled': enabled});
    }
    setupMenus(enabled);
})

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "toggleCovidPage" || info.menuItemId == "toggleCovidBrowser") {
        chrome.storage.local.get(['enabled'], function(result) {
            let enabled = !result.enabled;
            chrome.storage.local.set({'enabled': enabled});
            setupMenus(enabled);
        });
    }
})