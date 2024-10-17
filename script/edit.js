"use strict";

/**** DATA ****/
const petArr = JSON.parse(getFromStorage("petArr", "[]"));
const healthyPet = JSON.parse(getFromStorage("healthyPet", "[]"));
const breedArr = JSON.parse(getFromStorage("breedArr", "[]"));
let breedArrRender = [];

/**** SELECT ELEMENTS ****/
const tableBody = document.getElementById("tbody");
const editField = document.getElementById("container-form");

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const sideBar = document.getElementById("sidebar");
sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});

/**** FUNCTIONS ****/
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
    <td>${item.date}</td>
    <td><button type="button" class="btn btn-warning" onclick="startEditPet('${
      item.id
    }')">Edit</button>
    </td>`;
    tableBody.appendChild(row);
  }
}
renderTableData(petArr);

const renderBreed = function (breedArrRender) {
  breedInput.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.innerHTML = "Select Breed";
  breedInput.appendChild(defaultOption);
  for (let i = 0; i < breedArrRender.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${breedArrRender[i].name}`;
    breedInput.appendChild(option);
  }
};
renderBreed(breedArr);

function checkHealthy(pet) {
  return pet.vaccinated && pet.dewormed && pet.sterilized;
}

const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

function startEditPet(petId) {
  editField.classList.remove("hide");
  const editPetIndex = petArr.findIndex(function (item) {
    return item.id === petId;
  });
  idInput.value = petArr[editPetIndex].id;
  nameInput.value = petArr[editPetIndex].name;
  ageInput.value = petArr[editPetIndex].age;
  typeInput.value = petArr[editPetIndex].type;
  weightInput.value = petArr[editPetIndex].weight;
  lengthInput.value = petArr[editPetIndex].lengthPet;
  colorInput.value = petArr[editPetIndex].color;
  breedInput.value = petArr[editPetIndex].breed;
  vaccinatedInput.checked = petArr[editPetIndex].vaccinated;
  dewormedInput.checked = petArr[editPetIndex].dewormed;
  sterilizedInput.checked = petArr[editPetIndex].sterilized;
}

function validate(data) {
  if (data.name === "") {
    alert("Please input for name!");
    return false;
  }
  if (data.age === 0) {
    alert("Please input for age!");
    return false;
  }
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }
  if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }
  if (data.weight === 0) {
    alert("Please input for weight!");
    return false;
  }
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }
  if (data.lengthPet === 0) {
    alert("Please input for length!");
    return false;
  }
  if (data.lengthPet < 1 || data.lengthPet > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  }
  return true;
}

const typeInputChange = function () {
  let type = typeInput.value;
  if (type === "Dog")
    breedArrRender = breedArr.filter((item) => item.type === "Dog");
  else if (type === "Cat")
    breedArrRender = breedArr.filter((item) => item.type === "Cat");
  renderBreed(breedArrRender);
};
/**** BUTTON ACTION ****/

submitBtn.addEventListener("click", function (e) {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: Number(ageInput.value),
    type: typeInput.value,
    weight: Number(weightInput.value),
    lengthPet: Number(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    inputDate: new Date(),
    calculateDate: function () {
      const day = this.inputDate.getDate();
      const month = this.inputDate.getMonth() + 1;
      const year = this.inputDate.getFullYear();
      this.date = `${day}/${month}/${year}`;
    },
    calculateBMI: function () {
      const rate = this.type === "Dog" ? 703 : 886;
      const tmp = (this.weight * rate) / this.lengthPet ** 2;
      this.bmi = tmp.toFixed(2);
    },
  };
  data.calculateDate();
  data.calculateBMI();
  const editPetIndex = petArr.findIndex(function (item) {
    return item.id === data.id;
  });
  if (validate(data)) {
    petArr[editPetIndex] = data;
    saveToStorage("petArr", JSON.stringify(petArr));
    clearInput();
    renderTableData(petArr);
    if (checkHealthy(data)) {
      healthyPet[editPetIndex] = data;
      saveToStorage("healthyPet", JSON.stringify(healthyPet));
    }
  }
  editField.classList.add("hide");
  clearInput();
});
