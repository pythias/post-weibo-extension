
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("got message from content.js", message);
    switch (message.type) {
        case "post-weibo":
            postWeibo(message.data);
            break;

        default:
            break;
    }
    return true;
});

function postWeibo(weibo) {
    chrome.tabs.create({
        url: "https://weibo.com"
    }, function (tab) {
        const tabId = tab.id;
        chrome.storage.local.set({ weiboFromExtension: weibo });
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files : [ "scripts/post.js" ]
        }).then(() => {
            console.log("executeScript");
        }).catch((error) => {
            console.error(`Error: ${error}`);
        });
    });
}