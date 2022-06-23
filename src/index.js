/// VARIABLE PUBLIC

const API_URL = 'https://62b3028e20cad3685c9927bf.mockapi.io/api';

const limit = 10;
let page = 1;


const Tbody = document.getElementById('tbody');




document.addEventListener('DOMContentLoaded', () => {
    getInfo(1);
});

function getInfo(page) {
    fetch(`${API_URL}/cw14/?page=${page}&limit=${limit}`)
    .then((response) => response.json())
    .then((data) => data.forEach(createTable));
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
    ${data.birthday}
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
    ${data.maritalStatus}
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