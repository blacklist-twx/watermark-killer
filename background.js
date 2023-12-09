console.log("background");
chrome.runtime.onInstalled.addListener(function () {
    console.log("插件已被安装");
    console.error("插件已被安装");
  });
chrome.tabs.onUpdated.addListener(function(tabId , info) {
	console.log(info);
    if (info.status == "complete") {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var url = tabs[0].url;
            console.log(url)
            if(url=="https://www.baidu.com/"){
                chrome.tabs.executeScript(null,{code:'alert("Hello World!");'});
            }
        });
    }
});
