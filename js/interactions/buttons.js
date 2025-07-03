import * as ui from './ui.js';
import * as api from '../api/api-fetch.js';
import * as applications from '../data/applications.js';

const moodButton = document.querySelector(".mood-button");
const sortButton = document.querySelector(".sort-button");
const sortOptions = document.querySelector(".sort-options");
const sortByStatus = document.querySelector("#sort-by-status");
const sortByDate = document.querySelector("#sort-by-date");

/* Dark mode button */
moodButton.addEventListener("click", () => {
    moodButton.classList.toggle("mood-button--active");
});

// Sort Options Button
sortButton.addEventListener("click", (event) => {
    sortOptions.classList.toggle('active');
    event.stopPropagation();
});

document.querySelector("#search-input").addEventListener("input", async (event) => {
    const term = event.target.value;
    const data = await api.getApplications();
    ui.showData(data, term);
});

async function sortApplication(criterio) {
    const data = await api.getApplications();

    let sorted = [...data];
    console.log(sorted);

    if (criterio === "status") {
        sorted.sort((a, b) => a.status.localeCompare(b.status));
    }

    if (criterio === "date") {
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    ui.showData(sorted);
}

sortByDate.addEventListener("change", () => {
    sortByStatus.checked = false;
    sortApplication("date");
});

sortByStatus.addEventListener("change", () => {
    sortByDate.checked = false;
    sortApplication("status");
});

// Sort Options Button End

function editButton(event) {
    const editBtn = event.target.closest('.button--edit');
    if (editBtn) {
        document.querySelector('.modal__header').innerHTML =  `
            <form method="dialog" class="modal__close-button">
                <button>x</button>
            </form>
            <h2>EDIT APPLICATION</h2>
        `;

        ui.addModalContent();
        
        document.querySelector('#input-job').value = editBtn.dataset.jobtitle;
        document.querySelector('#input-company').value = editBtn.dataset.company;
        document.querySelector('#date-input').value = editBtn.dataset.date;
        document.querySelector('#status-input').value = editBtn.dataset.status;
        document.querySelector('.notes--input').value = editBtn.dataset.notes;

        const oldSaveButton = document.querySelector('.save--button');
        oldSaveButton.textContent = "Save Changes";

        const newSaveButton = oldSaveButton.cloneNode(true);
        oldSaveButton.replaceWith(newSaveButton);

        document.querySelector('.save--button').addEventListener("click", async () => {
            const id = editBtn.dataset.id;
            const data = applications.extractData(true);
    
            const response = await api.editApplication(id, data);

            if (!response) {
                return alert("Error editing the application");
            } 
            
            ui.resetInputs();
            ui.showData();
            document.querySelector("#modal").close();
        });
        document.querySelector('#modal').showModal();
    }
}

function deleteButton(event) {
    const deleteBtn = event.target.closest('.button--delete');
    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
     
        if (!confirm("Are you sure you want to delete this application?")) return;

        api.deleteApplication(id).then(success => {
            if (success) {
                ui.showData();
            } else {
                alert("Failed to delete application");
            }
        })
    }
}

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

    editButton(event);
    deleteButton(event);
});


document.addEventListener('click', (event) => {
    const isMenuBtn = event.target.closest('.menu-btn');
    const isDropdown = event.target.closest('.dropdown-menu');

    if (!isMenuBtn && !isDropdown) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});

document.getElementById("add-button").addEventListener("click", () => {
    document.querySelector('.modal__header').innerHTML =  `
            <form method="dialog" class="modal__close-button">
                <button>x</button>
            </form>
            <h2>ADD NEW APPLICATION</h2>
    `;

    ui.addModalContent();

    const oldSaveButton = document.querySelector('.save--button');
    oldSaveButton.textContent = "Save";

    // Clonar botón para eliminar listeners previos
    const newSaveButton = oldSaveButton.cloneNode(true);
    oldSaveButton.replaceWith(newSaveButton);

    newSaveButton.addEventListener("click", async () => {
        const data = applications.extractData();

        const success = await api.addApplication(data);
        if (!success) {
            return alert("Error adding new application");
        } 

        ui.resetInputs();
        ui.showData();
        document.querySelector("#modal").close();
    });

    document.querySelector('#modal').showModal();
});


document.querySelector('.reset--button').addEventListener("click", () => {
    ui.resetInputs();
});

document.querySelector('.save--button').addEventListener("click", () => {
    const data = applications.extractData();
    
    if (!data) {
        return;
    }

    if (!api.addApplication(data)) {
        return alert("Error");
    } 

    ui.resetInputs();
    ui.showData();
    document.querySelector("#modal").close();
});