export function extractData() {
    const inputs = document.querySelectorAll('.modal__input');
    const errorMessage = document.querySelectorAll('.modal__error');

    let application = {
        job: inputs[0].value,
        company: inputs[1].value,
        date: inputs[2].value,
        status: inputs[3].value,
        notes: inputs[4].value
    };  

    errorMessage.forEach(error => {
        if (error) {
            error.classList.remove('modal__error--active');
        }
    });
    
    let hasError = false;


    inputs.forEach(input => {
        const error = input.nextElementSibling; 
        if (!error) return; 

        if (input.value.trim() === "") {
            error.classList.add('modal__error--active');
            hasError = true;
        } else {
            error.classList.remove('modal__error--active');
        }
    });


    if (hasError) {
        return null;
    }

    return application;
}