const api = 'https://685e08e67b57aebd2af7c8a1.mockapi.io/applications';

export async function getApplications() {
    try {

        const response = await fetch(api);

        if (!response.ok) {
            throw new Error("Error to fetch data");
        }

        return await response.json();
    } catch(error) {
        console.log(error);
        return false;
    }
}

export async function addApplication(application) {
    try {
    
        let newAplication = {
            jobTitle: application.job,
            company: application.company,
            date: application.date,
            status: application.status,
            notes: application.notes
        };

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAplication)
        });

        if (!response.ok) {
            throw new Error("Error for add the new application");
        }

        return true;

    } catch(error) {
        console.log(error);
        return false;
    }
}

export async function deleteApplication(id) {
    try {
        const response = await fetch(`${api}/${id}`, {
            method: 'DELETE'
        });

        if (!response) {
            throw new Error("Error deleting the application");
        }

        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}