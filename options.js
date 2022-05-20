var productOwners = [];
var scrumMasters = [];
var softwareEngineers = [];
var techLeads = [];
var isFirefox = typeof InstallTrigger !== 'undefined';
window.onload = () => {
  chrome.storage.sync.get(['POarray'], function (result) {
    if (result.POarray === undefined) {
      chrome.storage.sync.set({ POarray: productOwners }, function () { console.log("Initial product owner array save!"); });
    }
  });
  chrome.storage.sync.get(['SMarray'], function (result) {
    if (result.SMarray === undefined) {
      chrome.storage.sync.set({ SMarray: scrumMasters }, function () { console.log("Initial scrum master array save!"); });
    }
  });
  chrome.storage.sync.get(['SEarray'], function (result) {
    if (result.SEarray === undefined) {
      chrome.storage.sync.set({ SEarray: softwareEngineers }, function () { console.log("Initial software engineer array save!"); });
    }
  });
  chrome.storage.sync.get(['TLarray'], function (result) {
    if (result.TLarray === undefined) {
      chrome.storage.sync.set({ TLarray: techLeads }, function () { console.log("Initial tech lead array save!"); });
    }
  });
  addPOs();
  addSMs();
  addSEs();
  addTLs();
  document.getElementById('addPO').onclick = () => {
    var name = document.getElementById("POname").value;
    var id = document.getElementById("POid").value;
    chrome.storage.sync.get(['POarray'], function (result) {
      for (var i = 0; i < result.POarray.length; i++) {
        holder = result.POarray[i].split(" :");
        productOwners[holder[0]] = true;
      }
      if (productOwners[name] != undefined) {
        alert("Person is already on the list.");
        document.getElementById('POname').value = '';
        document.getElementById('POid').value = '';
      } else {
        productOwners[name] = true;
        addNames('POname', 'POid', 'POlist', document.getElementById('POname').value + " :" + document.getElementById('POid').value, productOwners, deletePO);
      }
    });
  }
  document.getElementById('addSM').onclick = () => {
    var name = document.getElementById("SMname").value;
    chrome.storage.sync.get(['SMarray'], function (result) {
      for (var i = 0; i < result.SMarray.length; i++) {
        holder = result.SMarray[i].split(" :");
        scrumMasters[holder[0]] = true;
      }
      if (scrumMasters[name] != undefined) {
        alert("Name already on the list.");
        document.getElementById('SMname').value = '';
        document.getElementById('SMid').value = '';
      } else {
        scrumMasters[name] = true;
        addNames('SMname', 'SMid', 'SMlist', document.getElementById('SMname').value + " :" + document.getElementById('SMid').value, scrumMasters, deleteSM);
      }
    });
  }
  document.getElementById('addSE').onclick = () => {
    var name = document.getElementById("SEname").value;
    chrome.storage.sync.get(['SEarray'], function (result) {
      for (var i = 0; i < result.SEarray.length; i++) {
        holder = result.SEarray[i].split(" :");
        softwareEngineers[holder[0]] = true;
      }
      if (softwareEngineers[name] != undefined) {
        alert("Name already on the list.");
        document.getElementById('SEname').value = '';
        document.getElementById('SEid').value = '';
      } else {
        softwareEngineers[name] = true;
        addNames('SEname', 'SEid', 'SElist', document.getElementById('SEname').value + " :" + document.getElementById('SEid').value, softwareEngineers, deleteSE);
      }
    });
  }
  document.getElementById('addTL').onclick = () => {
    var name = document.getElementById("TLname").value;
    chrome.storage.sync.get(['TLarray'], function (result) {
      for (var i = 0; i < result.TLarray.length; i++) {
        holder = result.TLarray[i].split(" :");
        techLeads[holder[0]] = true;
      }
      if (techLeads[name] != undefined) {
        alert("Name already on the list.");
        document.getElementById('TLname').value = '';
        document.getElementById('TLid').value = '';
      } else {
        techLeads[name] = true;
        addNames('TLname', 'TLid', 'TLlist', document.getElementById('TLname').value + " :" + document.getElementById('TLid').value, techLeads, deleteTL);
      }
    });
  }
}
function save_options() {
  if (isFirefox) {
    browser.storage.sync.set({
      POarray: productOwners,
      SMarray: scrumMasters,
      SEarray: softwareEngineers,
      TLarray: techLeads
    }, function () {
      console.log("Settings Saved")
    });
  } else {
    chrome.storage.sync.set({
      POarray: productOwners,
      SMarray: scrumMasters,
      SEarray: softwareEngineers,
      TLarray: techLeads
    }, function () {
      console.log("Settings Saved");
    });
  }
}
function deletePO(e) {
  var closebtns = document.getElementsByClassName("close");
  for (i = 0; i < productOwners.length; i++) {
    if (!isFirefox) {
      if (productOwners[i] === e.path[1].innerHTML) {
        var holder = productOwners[i].split(" :");
        productOwners[holder[0]] = undefined;
        productOwners.splice(i, 1);
        break;
      }
    } else {
      if (productOwners[i] === e.originalTarget.parentElement.innerHTML) {
        var holder = productOwners[i].split(" :");
        productOwners[holder[0]] = undefined;
        productOwners.splice(i, 1);
        break;
      }
    }
  }
  if (!isFirefox) {
    e.path[1].style.display = "none";
  } else {
    e.originalTarget.parentElement.style.display = "none";
  }
  save_options();
}
function deleteSM(e) {
  var closebtns = document.getElementsByClassName("close");
  for (i = 0; i < scrumMasters.length; i++) {
    if (!isFirefox) {
      if (scrumMasters[i] === e.path[1].innerHTML) {
        var holder = scrumMasters[i].split(" :");
        scrumMasters[holder[0]] = undefined;
        scrumMasters.splice(i, 1);
        break;
      }
    } else {
      if (scrumMasters[i] === e.originalTarget.parentElement.innerHTML) {
        var holder = scrumMasters[i].split(" :");
        scrumMasters[holder[0]] = undefined;
        scrumMasters.splice(i, 1);
        break;
      }
    }
  }
  if (!isFirefox) {
    e.path[1].style.display = "none";
  } else {
    e.originalTarget.parentElement.style.display = "none";
  }
  save_options();
}
function deleteSE(e) {
  var closebtns = document.getElementsByClassName("close");
  for (i = 0; i < softwareEngineers.length; i++) {
    if (!isFirefox) {
      if (softwareEngineers[i] === e.path[1].innerHTML) {
        var holder = softwareEngineers[i].split(" :");
        softwareEngineers[holder[0]] = undefined;
        softwareEngineers.splice(i, 1);
        break;
      }
    } else {
      if (softwareEngineers[i] === e.originalTarget.parentElement.innerHTML) {
        var holder = softwareEngineers[i].split(" :");
        softwareEngineers[holder[0]] = undefined;
        softwareEngineers.splice(i, 1);
        break;
      }
    }
  }
  if (!isFirefox) {
    e.path[1].style.display = "none";
  } else {
    e.originalTarget.parentElement.style.display = "none";
  }
  save_options();
}
function deleteTL(e) {
  var closebtns = document.getElementsByClassName("close");
  for (i = 0; i < techLeads.length; i++) {
    if (!isFirefox) {
      if (techLeads[i] === e.path[1].innerHTML) {
        var holder = techLeads[i].split(" :");
        techLeads[holder[0]] = undefined;
        techLeads.splice(i, 1);
        break;
      }
    } else {
      if (techLeads[i] === e.originalTarget.parentElement.innerHTML) {
        var holder = techLeads[i].split(" :");
        techLeads[holder[0]] = undefined;
        techLeads.splice(i, 1);
        break;
      }
    }
  }
  if (!isFirefox) {
    e.path[1].style.display = "none";
  } else {
    e.originalTarget.parentElement.style.display = "none";
  }
  save_options();
}
function addPOs() {
  chrome.storage.sync.get(['POarray'], function (result) {
    for (var i = 0; i < result.POarray.length; i++) {
      result.POarray[i] = result.POarray[i].split("<sp")[0];
      addNames('POname', 'POid', 'POlist', result.POarray[i], productOwners, deletePO);
    }
  });
}
function addSMs() {
  chrome.storage.sync.get(['SMarray'], function (result) {
    for (var i = 0; i < result.SMarray.length; i++) {
      result.SMarray[i] = result.SMarray[i].split("<sp")[0];
      addNames('SMname', 'SMid', 'SMlist', result.SMarray[i], scrumMasters, deleteSM);
    }
  });
}
function addSEs() {
  chrome.storage.sync.get(['SEarray'], function (result) {
    for (var i = 0; i < result.SEarray.length; i++) {
      result.SEarray[i] = result.SEarray[i].split("<sp")[0];
      addNames('SEname', 'SEid', 'SElist', result.SEarray[i], softwareEngineers, deleteSE);
    }
  });
}
function addTLs() {
  chrome.storage.sync.get(['TLarray'], function (result) {
    for (var i = 0; i < result.TLarray.length; i++) {
      result.TLarray[i] = result.TLarray[i].split("<sp")[0];
      addNames('TLname', 'TLid', 'TLlist', result.TLarray[i], techLeads, deleteTL);
    }
  });
}
function addNames(name, id, pointer, text, array, deleter) {
  var list = document.getElementById(pointer);
  var entry = document.createElement('li');
  entry.appendChild(document.createTextNode(text));
  var spanDelete = document.createElement("span");
  spanDelete.setAttribute("class", 'close');
  spanDelete.innerHTML = "&times;";
  list.appendChild(entry);
  entry.appendChild(spanDelete);
  array.push(entry.innerHTML);
  document.getElementById(name).value = '';
  document.getElementById(id).value = '';
  spanDelete.onclick = deleter;
  save_options();
}