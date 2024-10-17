"use strict";

/**** DATA ****/
let petArr = JSON.parse(getFromStorage("petArr", "[]"));
let newPetArr = [];
const saveBtn = document.getElementById("export-btn");
const fileLoad = document.getElementById("input-file");
const loadBtn = document.getElementById("import-btn");

const sideBarTitle = document.getElementById("sidebar-title");

const sideBar = document.getElementById("sidebar");
sideBarTitle.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});

// change arr to json
const saveFileContent = JSON.stringify(petArr);

function saveStaticDataToFile() {
  let blob = new Blob([saveFileContent], { type: "application/json" });
  saveAs(blob, "pet.json");
}

function getFileContents() {
  let fileForUpload = document.getElementById("input-file").files[0];
  console.log(fileForUpload);
  if (fileForUpload) {
    var reader = new FileReader();
    reader.readAsText(fileForUpload, "UTF-8");
    reader.onload = function (evt) {
      newPetArr = JSON.parse(evt.target.result);
      petArr = petArr.filter((item) => {
        let flag = true;
        for (const data of newPetArr) {
          if (data.id === item.id) flag = false;
        }
        return flag;
      });
      petArr = [...petArr, ...newPetArr];
      saveToStorage("petArr", JSON.stringify(petArr));
      //  code vaof day
    };
    reader.onerror = function (evt) {
      document.getElementById("fileContents").innerHTML = "error reading file";
    };
  }
  if (!fileForUpload) alert("Choose a file!");
  else alert(`you has been upload ${fileForUpload.name}`);
  console.log();
}

saveBtn.addEventListener("click", saveStaticDataToFile);
loadBtn.addEventListener("click", getFileContents);
