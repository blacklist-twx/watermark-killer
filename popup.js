function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}

console.log(document.getElementById("radio-group"));

document.getElementById('submit-btn').addEventListener('click', function() {
    var radios = document.getElementsByName('product-radio');
    var value;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            value = radios[i].id;
            break;
        }
    }
    sendMessageToContentScript({cmd:'test', value:value},null);
});
// document.getElementById("radio-group").addEventListener("click", function(e) {
//     console.log(e);
//     if (e.target.tagName == "INPUT") {
//         console.log("radiovalue", e.target.value)
//         var variable = e.target.value
//         sendMessageToContentScript({cmd:'test', value:e.target.id},null);
//         //......
//         //getJson("https://.../api/cnaps/" + variable + ".json")
//         //......
//     }
// })