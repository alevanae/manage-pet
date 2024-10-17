"use strict";
/**** DATA ****/
const petArr = JSON.parse(getFromStorage("petArr", "[]"));
const healthyPet = JSON.parse(getFromStorage("healthyPet", "[]"));
const breedArr = JSON.parse(getFromStorage("breedArr", "[]"));
let breedArrRender = [];
console.log(petArr);

/**** SELECT ELEMENTS */
const findBtn = document.getElementById("find-btn");
const inputId = document.getElementById("input-id");
const inputName = document.getElementById("input-name");
const inputType = document.getElementById("input-type");
const inputBreed = document.getElementById("input-breed");
const inputVaccinated = document.getElementById("input-vaccinated");
const inputDewormed = document.getElementById("input-dewormed");
const inputSterilized = document.getElementById("input-sterilized");
const tableBody = document.getElementById("tbody");

const sideBar = document.getElementById("sidebar");
sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});

/**** FUNCTIONS ****/
const searchId = function (data, id) {
  return data.id.includes(id);
};
const searchName = function (data, name) {
  return data.name.includes(name);
};
const searchType = function (data, type) {
  if (type === "Select Type") type = "";
  return data.type.includes(type);
};
const searchBreed = function (data, breed) {
  if (breed === "Select Breed") breed = "";
  return data.breed.includes(breed);
};

function renderTableData(petArr) {
  tableBody.innerHTML = "";
  for (const item of petArr) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${item.id}</th>
    <td>${item.name}</td>
    <td>${item.age}</td>
    <td>${item.type}</td>
    <td>${item.weight} kg</td>
    <td>${item.lengthPet} cm</td>
    <td>${item.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${item.color}"></i>
    </td>
    <td><i class="bi ${
      item.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      item.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      item.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${item.date}</td>`;
    tableBody.appendChild(row);
  }
}
const renderBreed = function (breedArrRender) {
  inputBreed.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.innerHTML = "Select Breed";
  inputBreed.appendChild(defaultOption);
  for (let i = 0; i < breedArrRender.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${breedArrRender[i].name}`;
    inputBreed.appendChild(option);
  }
};
renderBreed(breedArr);

const clearInput = function () {
  inputId.value = "";
  inputName.value = "";
  inputType.value = "Select Type";
  inputBreed.value = "Select Breed";
  inputDewormed.checked = false;
  inputSterilized.checked = false;
  inputVaccinated.checked = false;
};
/**** BUTTON ****/
findBtn.addEventListener("click", function () {
  let result = [];
  let finalResult = [];
  for (const item of petArr) {
    if (
      searchId(item, inputId.value) &&
      searchName(item, inputName.value) &&
      searchType(item, inputType.value) &&
      searchBreed(item, inputBreed.value)
    )
      result.push(item);
  }
  if (inputVaccinated.checked)
    result = result.filter((item) => item.vaccinated === true);
  if (inputSterilized.checked)
    result = result.filter((item) => item.sterilized === true);
  if (inputDewormed.checked)
    result = result.filter((item) => item.dewormed === true);
  result.sort((a, b) => {
    if (a.id > b.id) return 1;
    else return -1;
  });
  renderTableData(result);
  clearInput();
});

const typeInputChange = function () {
  let type = inputType.value;
  if (type === "Dog")
    breedArrRender = breedArr.filter((item) => item.type === "Dog");
  else if (type === "Cat")
    breedArrRender = breedArr.filter((item) => item.type === "Cat");
  else breedArrRender = breedArr;
  renderBreed(breedArrRender);
};

//
