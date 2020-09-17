// Global Variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const flexContainer = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");



// Fetch data from API
fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
.then(response => response.results)
.then(displayEmployees)
.catch(err => console.log(err))


function displayEmployees (employeeData) {
    employees = employeeData;

    // Store the employee HTML as we create it
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
                    <div class="card" data-index="${index}">
                     <img class="avatar" src="${picture.large}"/>
                     <div class="text-container">
                     <h2 class="name">${name.first} ${name.last}</h2>
                        <p class="email">${email}</p>
                        <p class="address">${city}</p>
                 </div>
            </div>
                        `
});
    flexContainer.innerHTML = employeeHTML;
}

        

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    
    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
        <hr />
          <p>${phone}</p>
           <p class="address">${street.number}, ${state} ${postcode}</p>
            <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}


flexContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== flexContainer) {
    // select the card element based on its proximity to actual element clicked
     
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
    });
    
    modalClose.addEventListener('click', () => {
        overlay.classList.add("hidden");
        });
        