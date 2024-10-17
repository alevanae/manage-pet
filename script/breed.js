"use strict";

/**** DATA ****/
const breedArr = JSON.parse(getFromStorage("breedArr", "[]"));

// Select element
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const bodyTable = document.getElementById("tbody");

/* html
<tr>
	<th>#</th>
	<td>Breed</td>
	<td>Type</td>
	<td><button type="button" class="btn btn-danger" onclick="deletePet('1234')">Delete</button>
  </td>
</tr>
*/
const sideBarTitle = document.getElementById("sidebar-title");
const sideBar = document.getElementById("sidebar");
sideBarTitle.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});
/**** FUNCTIONS ****/
const validateData = function (data) {
  if (data.name === "") {
    alert("Please input for breed!");
    return false;
  }
  if (data.type === "Select Type") {
    alert("Please input for type!");
    return false;
  }
  return true;
};

const renderBreedTable = function (data) {
  bodyTable.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope='row'>${i + 1}</th>
    <td>${data[i].name}</td>
    <td>${data[i].type}</td>
    <td><button type="button" class="btn btn-danger" onclick="deleteBreed(${i})">Delete</button>
    </td>`;
    bodyTable.appendChild(row);
  }
};
renderBreedTable(breedArr);

const deleteBreed = function (breedId) {
  breedArr.splice(breedId, 1);
  saveToStorage("breedArr", JSON.stringify(breedArr));
  renderBreedTable(breedArr);
};

const clearInput = function () {
  breedInput.value = "";
  typeInput.value = "Select Type";
};

/**** GET DATA ****/
submitBtn.addEventListener("click", function () {
  const data = {
    name: breedInput.value,
    type: typeInput.value,
  };
  if (validateData(data)) {
    breedArr.push(data);
    saveToStorage("breedArr", JSON.stringify(breedArr));
    renderBreedTable(breedArr);
  }
  clearInput();
});
