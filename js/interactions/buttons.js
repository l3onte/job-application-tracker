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
toggleButtons.forEach(button => {
    button.addEventListener("click", (event) => {

        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });

        const dropdown = event.target.nextElementSibling;

        if (dropdown) {
            dropdown.classList.toggle('active');
        }

        event.stopPropagation();

    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
    });
});
// Actions Buttons end

function addModalContent() {
    document.querySelector('.modal__content').innerHTML = `
        <label for="input-job" class="modal__input-label">Job Name</label>
        <input type="text" inputmode="text" placeholder="Programmer" class="modal__input input--job" id="input-job">
        
        <label for="input-company" class="modal__input-label">Company</label>
        <input type="text" inputmode="text" placeholder="Microsoft" class="modal__input input--company" id="input-company">
        <label for="date-input" class="modal__input-label">Aplied Date</label>
        <input type="date" class="modal__input date--input" id="date-input">
        <label for="status-input" class="modal__input-label">Status</label>
        <select class="modal__input status--input" id="status-input">
            <option value="pending" selected>Pending</option>
            <option value="process">In Process</option>
            <option value="rejected">Rejected</option>
            <option value="accepted">Accepted</option>
        </select>
        <label for="note-input" class="modal__input-label">Notes</label>
        <textarea class="modal__input notes--input" placeholder="Write notes..."></textarea>
    `;
}

document.querySelectorAll('.button--edit').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.modal__header').innerHTML =  `
            <form method="dialog" class="modal__close-button">
                <button>x</button>
            </form>
            <h2>EDIT APPLICATION</h2>
        `;

        addModalContent();
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

    addModalContent();

    document.querySelector('.save--button').textContent = "Save";
    document.querySelector('#modal').showModal();
});