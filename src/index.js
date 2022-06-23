/// VARIABLE PUBLIC

const API_URL = 'https://62b3028e20cad3685c9927bf.mockapi.io/api';

const limit = 10;
let currentPage = 1;


const Tbody = document.getElementById('tbody');
const ulPagination =document.querySelector('#pagination');



document.addEventListener('DOMContentLoaded', () => {
    getInfo(currentPage);
});

function getInfo(page) {
    fetch(`${API_URL}/cw14/?page=${page}&limit=${limit}`)
    .then((response) => response.json())
    .then((data) => {data.forEach(createTable)
      
        const {length} = data ;
        createPagination();
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
    </tr>`
    Tbody.innerHTML += initHtml;
}

//page//
function createPagination(count=30){
    
 const pageCount = Math.ceil(count/limit);
 console.log(count);
let lis ='';
for(let i=1; i<=pageCount ;i++ ){
    lis += `<li class= 'page-item ${i=== currentPage ? 'active' :'' }'> 
    <a  href="#" class="page-link" >${i}</a> </li>` ;
    
}

ulPagination.innerHTML =lis;

}