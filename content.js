// content.js
console.log("Chrome Extension is running!");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    if(request.cmd == 'test') {
        if(request.value == 'mode-1'){
            removeWaterMarkElementByZIndex();
            // alert("use mode 1 to remove the watermark");
        }else if(request.value == 'mode-2'){
            removeWaterMarkElementByName();
            // alert("use mode 2 to remove the watermark");
        }
    }
    // sendResponse('我收到了你的消息！');
});


const matchName = ["watermark", "water-mark", "waterMark", "WaterMark", "water_mark" ,"suite-clear"]

const mockBody = () => {
    
    console.log("start to mock body");
    let sourceBody = document.body;
    let mockBody = sourceBody.cloneNode(true);
    // sourceBody.parentNode.appendChild(mockBody);   
    // sourceBody.replaceWith(mockBody);
}

const removeWaterMarkElementByName = () => {
    // 创建一个观察器实例
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                console.log("新增",mutation.addedNodes[i]);
                mutation.addedNodes[i].remove();
            }
        });
    });

    // 配置观察选项:
    var config = { childList: true, subtree: true };

    // 传入目标节点和观察选项
    observer.observe(document.body, config);
    let elementList = [];
    matchName.forEach(name => {
        let elements = document.querySelectorAll(`[id*=${name}]`);
        if (elements.length > 0)
            elementList = [...elementList, ...elements]
        elements = document.querySelectorAll(`[class*=${name}]`);
        if (elements.length > 0)
            elementList = [...elementList, ...elements]
    });
    console.log(elementList);
    elementList.forEach(element => {
        console.log("!!! remove watermark element",element);
        const run = () => {
            element.remove();
            // window.requestAnimationFrame(run);
            var e = document.documentElement; 
            e.style.display = 'none';
            var trick = e.offsetHeight; 
            e.style.display = '';
          };
        run();
    });
}

const removeWaterMarkElementByZIndex = ()=>{
    function getMaxZIndex() {
        var elements = document.querySelectorAll('*');
        var maxZIndex = 0;
        var maxZIndexElement = null;
    
        elements.forEach(function(element) {
            var zIndex = window.getComputedStyle(element).getPropertyValue('z-index');
            if (!isNaN(zIndex) && zIndex > maxZIndex) {
                maxZIndex = zIndex;
                maxZIndexElement = element;
            }
        });
        return maxZIndexElement;
    }
    getMaxZIndex().remove();
    alert(`remove max z-index element ${maxZIndexElement.innerHTML}`);
}

