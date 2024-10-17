"use strict";

// select element
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
const tableBody = document.getElementById("tbody");
const sideBar = document.getElementById("sidebar");
const sideBarTitle = document.getElementById("sidebar-title");
const tableHead = document.getElementById("thead");

/******DATA*****/
const petArr = JSON.parse(getFromStorage("petArr", "[]"));
const breedArr = JSON.parse(getFromStorage("breedArr", "[]"));
let breedArrRender = [];

petArr.sort((a, b) => {
  if (a.id > b.id) return 1;
  else return -1;
});

/******FUNCTIONS****/
function validateId(id) {
  for (const item of petArr) {
    if (item.id === id) return false;
  }
  return true;
}

// Clear input
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

// Validate data
function validate(data) {
  if (data.id === "") {
    alert("Please input for id!");
    return false;
  }
  if (!validateId(data.id)) {
    alert("ID must be unique!");
    return false;
  }
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

// hien table
function renderTableData(petArr) {
  tableHead.innerHTML = `<tr>
  <th scope="col">ID</th>
  <th scope="col">Name</th>
  <th scope="col">Age</th>
  <th scope="col">Type</th>
  <th scope="col">Weight</th>
  <th scope="col">Length</th>
  <th scope="col">Breed</th>
  <th scope="col">Color</th>
  <th scope="col">Vaccinated</th>
  <th scope="col">Dewormed</th>
  <th scope="col">Sterilized</th>
  <th scope="col">Date Added</th>
  <th scope="col">Action</th>
</tr>`;

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
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${
      item.id
    }')">Delete</button>
    </td>`;
    tableBody.appendChild(row);
  }
}
renderTableData(petArr);

function renderTableDataWithBMI(petArr) {
  tableHead.innerHTML = `<tr>
  <th scope="col">ID</th>
  <th scope="col">Name</th>
  <th scope="col">Age</th>
  <th scope="col">Type</th>
  <th scope="col">Weight</th>
  <th scope="col">Length</th>
  <th scope="col">Breed</th>
  <th scope="col">Color</th>
  <th scope="col">Vaccinated</th>
  <th scope="col">Dewormed</th>
  <th scope="col">Sterilized</th>
  <th scope="col">BMI</th>
  <th scope="col">Date Added</th>
  <th scope="col">Action</th>
</tr>`;
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
    <td class="BMI">${item.bmi}</td>
    <td>${item.date}</td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${
      item.id
    }')">Delete</button>
    </td>`;
    tableBody.appendChild(row);
  }
}

// Render breed
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

// delete item
const deletePet = (petId) => {
  if (confirm(`Are you sure to delete ${petId}?`)) {
    const deletePetIndex = petArr.findIndex(function (item) {
      return item.id === petId;
    });

    petArr.splice(deletePetIndex, 1);
    saveToStorage("petArr", JSON.stringify(petArr));
    renderTableData(petArr);
  }
};

// check healthy
function checkHealthy(pet) {
  return pet.vaccinated && pet.dewormed && pet.sterilized;
}

// onchange Type input lead to change breed
const typeInputChange = function () {
  let type = typeInput.value;
  if (type === "Dog")
    breedArrRender = breedArr.filter((item) => item.type === "Dog");
  else if (type === "Cat")
    breedArrRender = breedArr.filter((item) => item.type === "Cat");
  renderBreed(breedArrRender);
};

/******BUTTON******/
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
  if (validate(data)) {
    petArr.push(data);
    saveToStorage("petArr", JSON.stringify(petArr));
    clearInput();
    renderTableData(petArr);
  }
});

// Healthy Pet
const healthyPetBtn = document.getElementById("healthy-btn");
healthyPetBtn.addEventListener("click", function (e) {
  if (healthyPetBtn.textContent === "Show Healthy Pet") {
    healthyPetBtn.textContent = "Show all Pet";
    let healthyPet = [];
    for (const data of petArr) {
      if (checkHealthy(data)) {
        healthyPet.push(data);
      }
    }
    renderTableData(healthyPet);
  } else {
    healthyPetBtn.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
});

// Calculate BMI
const calculateBMIBtn = document.getElementById("bmi-btn");
calculateBMIBtn.addEventListener("click", function (e) {
  renderTableDataWithBMI(petArr);
});

// sidebar
sideBarTitle.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});

// select type -> breed change
