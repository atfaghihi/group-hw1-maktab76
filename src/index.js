// pagination variables
const limit = 10;
let currentPage = 1;
const usersTable = document.getElementById("tbody");
const ulPagination = document.querySelector("#paginationUsers");

// button variables
const pageLoading = document.querySelector("#loading");
const editIcon = document.querySelectorAll("#edit");
const deleteIcon = document.querySelectorAll("#delete");

// modal variables
const addButton = document.querySelector("#addButton");
const refresh = document.getElementById("refresh");

// search variables
const searchInput = document.getElementById("search");
const debounceSearchUser = _.debounce(searchUsers, 500);
const searchWrapper = document.getElementById("searchWrapper");

// handle DOM
document.addEventListener("DOMContentLoaded", () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  params = Object.fromEntries(urlSearchParams.entries());
  if (params.page) {
    currentPage = Number(params.page);
  }
  getUser();
});

//handle listUSer
function getUser() {
  usersTable.innerHTML = "";
  pageLoading.style.display = "block";
  fetch(`${API_URL}/users/?page=${currentPage}&limit=${limit}`)
    .then((response) => response.json())

    .then((data) => {
      const { count, items } = data;
      items.forEach(createTable);
      createPagination(count);
      pageLoading.style.display = "none";
    });
}
function createTable(data) {
  let initHtml = 
    `<tr data-id="${data.id}">
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.family}</td>
    <td>${new Date(data.birthday).toDateString()}</td>
    <td>${data.nationalId}</td>
    <td>${data.fathersName}</td>
    <td>${data.job}</td>
    <td>${data.education}</td>
    <td>${data.maritalStatus ? "married" : "single"} </td>
    <td>${data.country}</td>
    <td>${data.state}</td>
    <td>${data.city}</td>
    <td>${data.street}</td>
    <td>${data.block}</td>
    <td>${data.no}</td>
    <td>${data.floor}</td>
    <td>${data.unit}</td>
    <td id="edit" onClick="editUser(${
      data.id
    })" ><img src="https://img.icons8.com/cute-clipart/64/228BE6/edit.png" width=40 height =40/>
    </td>
    <td  onclick="confirmDeleteData(${
      data.id
    })"> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">
    Delete
  </button></td>
      </tr>`;
  usersTable.innerHTML += initHtml;
}

// handle page
function createPagination(count) {
  const pageCount = Math.ceil(count / limit);
  let lis = "";
  for (let i = 1; i <= pageCount; i++) {
    lis += `<li class= 'page-item ${i === currentPage ? "active" : ""}'> 
    <a  href="#" class="page-link" >${i}</a> </li>`;
  }

  ulPagination.innerHTML = lis;
}

// block delete
ulPagination.addEventListener("click", (event) => {
  const listItem = document.querySelectorAll(".page-item");
  listItem.forEach((items) => {
    items.classList.remove("active");
  });
  event.target.parentElement.classList.add("active");
  currentPage = Number(event.target.innerText);
  getUser();
});

function confirmDeleteData(id) {
  fetch(`${API_URL}/users/${id}`)
    .then((response) => response.json())

    .then((data) => {
      name.innerText = data.name;
      name.dataset.value = data.id;
      family.innerText = data.family;
      birthday.innerText = new Date(data.birthday).toDateString();
      nationalId.innerText = data.nationalId;
      fathersName.innerText = data.fathersName;
      job.innerText = data.job;
      education.innerText = data.education;
      country.innerText = data.country;
      state.innerText = data.state;
      city.innerText = data.city;
      street.innerText = data.street;
      block.innerText = data.block;
      no.innerText = data.no;
      floor.innerText = data.floor;
      unit.innerText = data.unit;
      maritalStatus.innerText = data.maritalStatus ? "married" : "single";
    })
    .catch((error) => {
      console.log(error);
    });
}
function handleUser() {
  let idUser = name.dataset.value;
  console.log(idUser);
  fetch(`${API_URL}/users/${idUser}`, {
    method: "DELETE",
  })
    .then((response) => response.json())

    .then((data) => {
      getUser();
    });
}

addButton.addEventListener("click", () => {
  window.location.href = "./form/form.html";
});

function editUser(id) {
  window.location.href = `./form/form.html?id=${id}&page=${currentPage}`;
}

refresh.addEventListener("click", () => {
  getUser();
});

// block search
function searchUsers(user) {
  console.log(user);
  fetch(`${API_URL}/users?search=${user}`, {})
    .then((response) => response.json())
    .then((data) => {
      const { items } = data;
      items.forEach(creatSearchViews);
    });
}
function creatSearchViews(users) {
  let html = `
   <p class="d-flex justify-content-around bg-info rounded-1 text-white py-1">
      <span>${users.id}</span>
      <span>${users.name}</span>
      <span>${users.family}</span>
      <span>${users.country}</span>
      <span>${users.city}</span>
   </p>`;
  searchWrapper.innerHTML = html;
}
searchInput.addEventListener("input", (event) => {
  console.log(event.target.value);
  debounceSearchUser(event.target.value);
  searchWrapper.style.display = "block";
});
searchInput.addEventListener("blur", () => {
  searchWrapper.innerHTML = "";
  searchWrapper.style.display = "none";
});
