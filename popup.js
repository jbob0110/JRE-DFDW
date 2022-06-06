var jiraKey;
var project;
var jiraInstance;
var url;
var description;
// asyncRequestCount keeps track of when the sub-tasks and labels are being sent.
var asyncRequestCount = 0;
/**This if checks the users browser and grabs their browser information based on this.*/
chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
  url = tabs[0].url;
  getURLs(url);
});
chrome.storage.sync.get(['POarray'], function (result) {
  var x = document.getElementById("POs");
  var option;
  if(result.POarray){
    for (var i = 0; i< result.POarray.length; i++){
      option = document.createElement("option");
      var split = result.POarray[i].split("<spa");
      split = split[0].split(" :");
      option.text = split[0];
      option.value = split[1];
      x.add(option);
    }
  }
}
);
chrome.storage.sync.get(['SMarray'], function(result) {
  var x = document.getElementById("SMs");
  var option, split;
  if(result.SMarray){
    for(var i = 0; i< result.SMarray.length; i++){
      option = document.createElement("option");
      split = result.SMarray[i].split("<spa");
      split = split[0].split(" :");
      option.text = split[0];
      option.value = split[1];
      x.add(option);
    }
  }
}
);
chrome.storage.sync.get(['SEarray'], function(result) {
  var x = document.getElementById("SEs");
  var option, split;
  if(result.SEarray){
    for(var i = 0; i< result.SEarray.length; i++){
      option = document.createElement("option");
      split = result.SEarray[i].split("<spa");
      split = split[0].split(" :");
      option.text = split[0];
      option.value = split[1];
      x.add(option);
    }
  }
}
);
chrome.storage.sync.get(['TLarray'], function(result) {
  var x = document.getElementById("TLs");
  var option, split;
  if(result.TLarray){
    for(var i = 0; i< result.TLarray.length; i++){
      option = document.createElement("option");
      split = result.TLarray[i].split("<spa");
      split = split[0].split(" :");
      option.text = split[0];
      option.value = split[1];
      x.add(option);
    }
  }
}
);
window.onload = () => {
  document.getElementById('scYes').onclick = () => {
    var Po = document.getElementById('POs').value;
    var Sm = document.getElementById('SMs').value;
    var Se = document.getElementById('SEs').value;
    var Tl = document.getElementById('TLs').value;
    console.log("PO: "+Po);
    console.log("SM: "+Sm);
    console.log("SE: "+Se);
    console.log("TL: "+Tl);
    document.getElementById('loader').style.display = "block";
  /**The requirements XMLHttpRequest is opened and sent*/        
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Documentation","description":" ","assignee":{  "name": Po},"reporter":{  "name": Po},"issuetype":{  "name":"Sub-task"}} });
  console.log("Documentation Sent");
  /**The Test Case XMLHttpRequest is opened and sent*/        
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Requirements","description":" ","assignee":{  "name": Sm},"reporter":{  "name": Sm},"issuetype":{  "name":"Sub-task"}} });
  console.log("Requirements Sent");
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Release Information","description":" ","assignee":{  "name": Sm},"reporter":{  "name": Sm},"issuetype":{  "name":"Sub-task"}} });
  console.log("Release Information Sent");
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Certification","description":" ","assignee":{  "name": Tl},"reporter":{  "name": Tl},"issuetype":{  "name":"Sub-task"}} });
  console.log("Certification Sent");
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Code Review","description":" ","assignee":{  "name": Tl},"reporter":{  "name": Tl},"issuetype":{  "name":"Sub-task"}} });
  console.log("Code Review Sent");
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Tech Design","description":" ","assignee":{  "name": Se},"reporter":{  "name": Se},"issuetype":{  "name":"Sub-task"}} });
  console.log("Tech Design Sent");
  };
  
  document.getElementById("options").onclick = () =>{
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  };
};

function addSubTask(subtask){
  var xhr = new XMLHttpRequest;
  xhr.open("POST", "https://"+jiraInstance+".cerner.com/rest/api/2/issue/");
  xhr.setRequestHeader("Content-Type","application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText);
      asyncRequestCount--;
      checkAsynRequestCount();
    }
  };
  asyncRequestCount++;
  xhr.send(JSON.stringify(subtask));
};

function getURLs(url){
  var re = /https\:\/\/(.+?)\..+\/((.+?)\-[^\?]+)/;
  var regexGroups = { jIns: 1, jKey: 2, pKey: 3 };
  var m = re.exec(url);
  jiraKey = m[regexGroups.jKey];
  project = m[regexGroups.pKey];
  jiraInstance = m[regexGroups.jIns];
};

/** This function checks if the asyncRequestCount is 0 then will reload the page, and hide the loading spinner*/
function checkAsynRequestCount(){
  if(asyncRequestCount === 0){
    chrome.tabs.reload();
    document.getElementById('loader').style.display = "none";
  }
}