import { getApplications } from "../api/api-fetch.js";

function asignStatusLabel(status) {
    switch (status) {
        case "Pending":
            return "status";
        break;

        case "Process":
            return "status--en-proceso";
        break;

        case "Rejected":
            return "status--rechazado";
        break;

        case "Accepted":
            return "status--aceptado";
        break;
    }
}

export async function showData(data = null, searchTerm = "") {
    const tBody = document.querySelector('tbody');
    tBody.innerHTML = "";
    const apps = data || await getApplications();
    
    const filtered = apps.filter(app => {
        const term = searchTerm.toLocaleLowerCase();

        return (
            app.jobTitle.toLowerCase().includes(term) ||
            app.company.toLowerCase().includes(term) ||
            app.notes.toLowerCase().includes(term) ||
            app.status.toLowerCase().includes(term)
        );
    });

    filtered.forEach(app => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="table__column">${app.id}</td>
            <td class="table__column">${app.jobTitle}</td>
            <td class="table__column">${app.company}</td>
            <td class="table__column">${app.date}</td>
            <td class="table__column">
                <strong class="status ${asignStatusLabel(app.status)}">${app.status}</strong>
            </td>
            <td class="table__column">${app.notes}</td>
            <td class="table__column">
                <button class="menu-btn" id="menuToggle">☰</button>
                <div class="dropdown-menu" id="menu">
                    <button class="dropdown__button button--edit"
                    data-id="${app.id}"
                    data-jobTitle="${app.jobTitle}"
                    data-company="${app.company}"
                    data-date="${app.date}"
                    data-status="${app.status}"
                    data-notes="${app.notes}">Edit</button>
                    <button class="dropdown__button button--delete"
                    data-id="${app.id}">Delete</button>
                </div>
            </td>
        `;

        tBody.appendChild(row);
    })
}

export function addModalContent() {
    document.querySelector('.modal__content').innerHTML = `
        <label for="input-job" class="modal__input-label">Job Name</label>
        <input type="text" inputmode="text" placeholder="Programmer" class="modal__input input--job" id="input-job">
        <span class="modal__error">The Job field is required</span>

        <label for="input-company" class="modal__input-label">Company</label>
        <input type="text" inputmode="text" placeholder="Microsoft" class="modal__input input--company" id="input-company">
        <span class="modal__error">The Company field is required</span>

        <label for="date-input" class="modal__input-label">Aplied Date</label>
        <input type="date" class="modal__input date--input" id="date-input">
        <span class="modal__error">The Aplied Date field is required</span>

        <label for="status-input" class="modal__input-label">Status</label>
        <select class="modal__input status--input" id="status-input">
            <option value="Pending" selected>Pending</option>
            <option value="Process">In Process</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
        </select>
        <span class="modal__error">The status field is required</span>

        <label for="note-input" class="modal__input-label">Notes</label>
        <textarea class="modal__input notes--input" placeholder="Write notes..."></textarea>
    `;
}

export function resetInputs() {
    document.querySelectorAll('.modal__input').forEach(input => {
        input.value = "";
    });
}