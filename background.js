function setEnabled(enabled) {
    let status = enabled ? 'Disable' : 'Enable';
    let title = status + ' COVID Pause'
    chrome.browserAction.setBadgeText({text: enabled ? '' : 'Off'});
    chrome.storage.local.set({'enabled': enabled});
}

// first run: if we're not already enabled, set enabled to true
chrome.storage.local.get(['enabled'], function(result) {
    let enabled = result.enabled;
    if (typeof(result.enabled) == "undefined") {
        setEnabled(true);
    }
})

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.local.get(['enabled'], function(result) {
        setEnabled(!result.enabled);
    });
});