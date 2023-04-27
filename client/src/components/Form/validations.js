
const validate = (input) => {
    let errors = {};
    let difficulty = Number(input.difficulty);
    let duration = Number(input.duration);

    if(!input.name) errors.name = 'Please complete';
    else if (/[^A-Za-z0-9]+/g.test(input.name)) errors.name = 'The name cannot contain special characters or accent mark' // may, min,num,  no carac.espec, tildes 

    if (!input.difficulty) errors.difficulty = 'Please select one'
    else if (difficulty <= 0 || difficulty > 5) errors.difficulty = 'Dificulty must be from 1 to 5';

    if (!input.duration) errors.duration = 'Please select one';
    else if(duration <= 0 || duration > 24) errors.duration = 'Duration must be from 1 to 24';

    if(!input.season || input.season === 'vacio') errors.season = 'Please select one';

    if (!input.countries || input.countries.length === 0) errors.countries = 'Please select one';

    return errors;  
}

export default validate;