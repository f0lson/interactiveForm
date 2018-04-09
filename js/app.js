const form = document.querySelector('form');
const userTitle = document.querySelector(`select#title`);

const createElement = ( element, prop1, val1, prop2, val2, ) => {
    let newElement = document.createElement(element);
    newElement[prop1] = val1;
    newElement[prop2] = val2;
    return newElement;
}

userTitle.addEventListener(`change`, (e) => {
    if ( e.target.value.toLowerCase() === 'other' ) {
        let userOtherJobTitle = createElement('input', 'type', 'text', 'placeholder', 'Please enter your job title');
        let fieldset = form.querySelectorAll('fieldset')[0];
        fieldset.appendChild(userOtherJobTitle);
    }
});
