export function extractData() {
    const inputs = document.querySelectorAll('.modal__input');

    let application = {
        job: inputs[0].value,
        company: inputs[1].value,
        date: inputs[2].value,
        status: inputs[3].value,
        notes: inputs[4].value
    };  

    return application;
}