import * as ui from './ui.js';
import * as api from '../api/api-fetch.js';
import * as applications from '../data/applications.js';

const moodButton = document.querySelector(".mood-button");
const toggleButtons = document.querySelectorAll('.menu-btn');
const sortButton = document.querySelector(".sort-button");
const sortOptions = document.querySelector(".sort-options");
    
/* Dark mode button */
moodButton.addEventListener("click", () => {
    moodButton.classList.toggle("mood-button--active");
});

// Sort Options Button
sortButton.addEventListener("click", (event) => {
    sortOptions.classList.toggle('active');
    event.stopPropagation();
});
// Sort Options Button End

// Actions Buttons
document.querySelector('tbody').addEventListener('click', (event) => {
    const button = event.target.closest('.menu-btn');

    if (button) {
        // Oculta todos los menús abiertos primero
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });

        // Toggle el que se acaba de hacer clic
        const dropdown = button.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown-menu')) {
            dropdown.classList.toggle('active');
        }

        event.stopPropagation();
    }

    const editBtn = event.target.closest('.button--edit');
    if (editBtn) {
        document.querySelector('.modal__header').innerHTML =  `
            <form method="dialog" class="modal__close-button">
                <button>x</button>
            </form>
            <h2>EDIT APPLICATION</h2>
        `;

        ui.addModalContent();
        
        document.querySelector('.save--button').textContent = "Save Changes";
        document.querySelector('#modal').showModal();
    }
});


document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
    });
});
// Actions Buttons end

document.querySelectorAll('.button--edit').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.modal__header').innerHTML =  `
            <form method="dialog" class="modal__close-button">
                <button>x</button>
            </form>
            <h2>EDIT APPLICATION</h2>
        `;

        ui.addModalContent();

        document.querySelector('.save--button').textContent = "Save Changes";
        document.querySelector('#modal').showModal();
    }); 
});

document.getElementById("add-button").addEventListener("click", () => {
    document.querySelector('.modal__header').innerHTML =  `
            <form method="dialog" class="modal__close-button">
                <button>x</button>
            </form>
            <h2>ADD NEW APPLICATION</h2>
    `;

    ui.addModalContent();

    document.querySelector('.save--button').textContent = "Save";
    document.querySelector('#modal').showModal();
});

document.querySelector('.reset--button').addEventListener("click", () => {
    ui.resetInputs();
});

document.querySelector('.save--button').addEventListener("click", () => {
    const data = applications.extractData();
    
    if (!api.addApplication(data)) {
        return alert("Error");
    } 

    ui.resetInputs();
    ui.showData();
});