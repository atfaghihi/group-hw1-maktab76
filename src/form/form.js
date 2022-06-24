const API_URL = "https://62b585bada3017eabb1c867a.mockapi.io/api";
const name = document.getElementById("name");
const family = document.getElementById("family");
const birthday = document.getElementById("birthday");
const nationalId = document.getElementById("nationalId");
const fathersName = document.getElementById("fathersName");
const job = document.getElementById("job");
const education = document.getElementById("education");
const maritalStatus = document.getElementById("maritalStatus");
const country = document.getElementById("country");
const state = document.getElementById("state");
const city = document.getElementById("city");
const street = document.getElementById("street");
const block = document.getElementById("block");
const no = document.getElementById("no");
const floor = document.getElementById("floor");
const unit = document.getElementById("unit");
const married = document.getElementById("married");
const single = document.getElementById("single");
let params = null;
const spinner=document.getElementById('spinner');
const submitButton = document.getElementById("submitButton");
const btnPageHome = document.getElementById("btnPageHome");
const formElement = document.querySelector("#form-data");
const beforeBtn = document.getElementById("beforeId");
const afterBtn = document.getElementById("afterId");




document.addEventListener("DOMContentLoaded", () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  params = Object.fromEntries(urlSearchParams.entries());
  //mode edit
  if (params.id) {
    beforeBtn.innerHTML = "Edit this information";

    fetch(`${API_URL}/users/${params.id}`)
      .then((response) => response.json())

      .then((data) => {
        name.value = data.name;
        name.dataset.value = data.id;
        family.value = data.family;
        birthday.value = new Date(data.birthday).toDateString();
        nationalId.value = data.nationalId;
        fathersName.value = data.fathersName;
        job.value = data.job;
        education.value = data.education;
        country.value = data.country;
        state.value = data.state;
        city.value = data.city;
        street.value = data.street;
        block.value = data.block;
        no.value = data.no;
        floor.value = data.floor;
        unit.value = data.unit;
        single.checked = data.maritalStatus ? false : true;
        married.checked = data.maritalStatus ? true : false;
      })

      .catch((error) => {
        console.log(error);
      });

    handleSubmit("PUT");
  } else {
    
    handleSubmit("POST");
  }
});
function handleSubmit(methodAction) {

 
    formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    submitButton.disabled=true;
    beforeBtn.style.display='none';
    afterBtn.style.display = "block";
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);
    const url = methodAction === "PUT" ?  `${API_URL}/users/${params.id}` : `${API_URL}/users`
  
   
    fetch(url, {
      method: methodAction,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (data) => 
        
        window.location.href = `../index.html?page=${params.page}`
      );
  });
}
btnPageHome.addEventListener("click", ()=>{
  if (params.page) window.location.href = `../index.html?page=${params.page}`;
  else window.location.href = `../index.html`;
})
  


