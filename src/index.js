/// VARIABLE PUBLIC

const API_URL = 'https://62b3028e20cad3685c9927bf.mockapi.io/api';

const limit = 10;
let currentPage = 1;


const usersTable = document.getElementById('tbody');
const ulPagination =document.querySelector('#paginationUsers');
const pageLoading =document.querySelector('#loading');
const editIcon = document.querySelectorAll('#edit');
const deleteIcon = document.querySelectorAll('#delete');


document.addEventListener('DOMContentLoaded', () => {
    getUser(currentPage);
});

function getUser() {
    usersTable.innerHTML = "";
    pageLoading.style.display ="block";
    fetch(`${API_URL}/cw14/?page=${currentPage}&limit=${limit}`)
    .then((response) => response.json())
    
    .then((data) => {
        const {count , items} = data ;
        items.forEach(createTable)
        createPagination(count);
        pageLoading.style.display ="none";
    });

}


function createTable(data) {
    let initHtml = `<tr data-id="${data.id}">
    <td>
    ${data.id}
    </td>
    <td>
    ${data.name}
    </td>
    <td>
    ${data.family}
    </td>
    <td>
    ${ new Date(data.birthday ).toDateString()}
    </td>
    <td>
    ${data.nationalId}
    </td>
    <td>
    ${data.fathersName}
    </td>
    <td>
    ${data.job}
    </td>
    <td>
    ${data.education}
    </td>
    <td>
    ${data.maritalStatus ? "married" :'single'} 
    </td>
    <td>
    ${data.country}
    </td>
    <td>
    ${data.state}
    </td>
    <td>
    ${data.city}
    </td>
    <td>
    ${data.street}
    </td>
    <td>
    ${data.block}
    </td>
    <td>
    ${data.no}
    </td>
    <td>
    ${data.floor}
    </td>
    <td>
    ${data.unit}
    </td>
    <td id="edit" ><img src="https://img.icons8.com/cute-clipart/64/228BE6/edit.png" width=40 height =40/>
    </td>
    <td id="delete" onclick="confirmDeleteData(${data.id})"><img src="https://img.icons8.com/cute-clipart/64/228BE6/filled-trash.png" width=40 height =40/></td>
    </tr>`
    usersTable.innerHTML += initHtml;
}

//page//
function createPagination(count){
    
 const pageCount = Math.ceil(count/limit);
let lis ='';
for(let i=1; i<=pageCount ;i++ ){
    lis += `<li class= 'page-item ${i=== currentPage ? 'active' :'' }'> 
    <a  href="#" class="page-link" >${i}</a> </li>` ;
    
}

ulPagination.innerHTML =lis;

}


//addEventListener
ulPagination.addEventListener("click",(event)=>{
    const listItem = document.querySelectorAll(".page-item");
    listItem.forEach((items)=>{
        items.classList.remove("active");
    });
    event.target.parentElement.classList.add("active");
    currentPage = Number(event.target.innerText);
    getUser();
} 
);

//delete 
// deleteIcon.forEach((item)=>{
    // item.addEventListener("click",(event)=>{
        // //console.log(event.target.innerText);
    // });
// })
// function confirmDeleteData(id){
    // fetch
// }