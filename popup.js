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
//chrome.storage.sync.get(['POarray'], function (result) {
  //var x = document.getElementById("POs");
  //var option;
  //if(result.POarray){
    //for (var i = 0; i< result.POarray.length; i++){
      //option = document.createElement("option");
      //var split = result.POarray[i].split("<spa");
      //split = split[0].split(" :");
      //option.text = split[0];
      //option.value = split[1];
      //x.add(option);
    //}
  //}
//}
//);
//chrome.storage.sync.get(['SMarray'], function(result) {
  //var x = document.getElementById("SMs");
  //var option, split;
  //if(result.SMarray){
    //for(var i = 0; i< result.SMarray.length; i++){
      //option = document.createElement("option");
      //split = result.SMarray[i].split("<spa");
      //split = split[0].split(" :");
      //option.text = split[0];
      //option.value = split[1];
      //x.add(option);
    //}
  //}
//}
//);
//chrome.storage.sync.get(['SEarray'], function(result) {
  //var x = document.getElementById("SEs");
  //var option, split;
  //if(result.SEarray){
    //for(var i = 0; i< result.SEarray.length; i++){
      //option = document.createElement("option");
      //split = result.SEarray[i].split("<spa");
      //split = split[0].split(" :");
      //option.text = split[0];
      //option.value = split[1];
      //x.add(option);
    //}
  //}
//}
//);
//chrome.storage.sync.get(['TLarray'], function(result) {
  //var x = document.getElementById("TLs");
  //var option, split;
  //if(result.TLarray){
    //for(var i = 0; i< result.TLarray.length; i++){
      //option = document.createElement("option");
      //split = result.TLarray[i].split("<spa");
      //split = split[0].split(" :");
      //option.text = split[0];
      //option.value = split[1];
      //x.add(option);
    //}
  //}
//}
//);
window.onload = () => {
  document.getElementById('scYes').onclick = () => {
    //var Po = document.getElementById('POs').value;
    //var Sm = document.getElementById('SMs').value;
    //var Se = document.getElementById('SEs').value;
    //var Tl = document.getElementById('TLs').value;
    //console.log("PO: "+Po);
    //console.log("SM: "+Sm);
    //console.log("SE: "+Se);
    //console.log("TL: "+Tl);
    document.getElementById('loader').style.display = "block";
         
  addSubTask(
    {"fields":{  
      "project":{  "key": project },
      "parent":{ "key": jiraKey},
      "summary":"Documentation",
      "description":"- Link to help documentation that was created or change due to this issue \n OR \n - Confirmation no help documentation needed to be created or updated due to this issue",
      //"assignee":{  "name": Po},
      "issuetype":{  "name":"Sub-task"}
    }
    }
  );
    console.log("Documentation Sent");
        
  addSubTask(
    {"fields":{  
      "project":{  "key": project },
      "parent":{ "key": jiraKey},
      "summary":"Requirements",
      "description":"- Link to signed, finalized requirements covering this issue \n OR \n - Short comment on why this issue did not require requirements \n\n  Note: If the issue is a defect, please reference the original requirements covering this functionality along with the Jira Number that introduced this defect",
      //"assignee":{  "name": Sm},
      "issuetype":{  "name":"Sub-task"}
    }
    }
  );
    console.log("Requirements Sent");
  addSubTask(
    {"fields":{
      "project":{  "key": project },
      "parent":{ "key": jiraKey},
      "summary":"Release Information",
      "description":"The Developer should work with the PO or PO Delegate to provide the following information needed for the release of this issue:\n - Will this issue release on its own, or part of a larger epic? \n - Will the release of this issue cause any performance impacts (IF, PD, Down). If so, to what and for how long? \n - Should this change be announced to users? \n - Will any resources outside of the development team be needed to assist in the deployment to production? If so, whom?",
      //"assignee":{  "name": Sm},
      "issuetype":{  "name":"Sub-task"}
    }
    }
  );
    console.log("Release Information Sent");
  addSubTask(
    {"fields":{  "project":{  "key": project },
    "parent":{ "key": jiraKey},
    "summary":"Certification",
    "description":"- Link to test runs (including if there were failed runs), to the eventual successful test run \n OR \n - Attached screenshots of test runs (including if there were failed runs), to the eventual successful test run \n OR \n - Short comment on why this issue did not require certification",
    //"assignee":{  "name": Tl},
    "issuetype":{  "name":"Sub-task"}
    }
    }
  );
    console.log("Certification Sent");
  addSubTask(
    {"fields":{  "project":{  "key": project },
      "parent":{ "key": jiraKey},
      "summary":"Code Review",
      "description":"- Link to the reviewed and signed Code Review \n OR \n - Short comment on why this issue did not require a code review",
      //"assignee":{  "name": Tl},
      "issuetype":{  "name":"Sub-task"}
    }
    }
  );
    console.log("Code Review Sent");
  addSubTask(
    {"fields":{
      "project":{  "key": project },
      "parent":{ "key": jiraKey},
      "summary":"Tech Design",
      "description":"- Link to reviewed and approved tech design covering this issue \n OR \n - Short comment on why this issue did not require a tech design \n\n Note: If the issue is a defect, please reference the original tech design covering this functionality along ",
      //"assignee":{  "name": Se},
      "issuetype":{  "name":"Sub-task"}
    }
    }
  );
    console.log("Tech Design Sent");
  };
  
  //document.getElementById("options").onclick = () =>{
    //if (chrome.runtime.openOptionsPage) {
      //chrome.runtime.openOptionsPage();
    //} else {
      //window.open(chrome.runtime.getURL('options.html'));
    //}
  //};
};

function addSubTask(subtask){
  var xhr = new XMLHttpRequest;
  xhr.open("POST", "https://"+jiraInstance+".cerner.com/rest/api/2/issue/");
  xhr.setRequestHeader("Content-Type","application/json","Access-Control-Allow-Origin");
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