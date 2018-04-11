// Variables
const form = document.querySelector(`form`);
const name = document.querySelector(`#name`);
const userTitle = document.querySelector(`select#title`);
const designSelect = document.querySelector(`select#design`);
const colorDiv = document.querySelector(`#color-div`);
const activities = document.querySelector(`.activities`);
const paymentDiv = document.querySelector(`#payment-section`);
const paymentSelect = document.querySelector(`#payment`);
const ccDiv = paymentDiv.querySelector(`#credit-card`);
const paypal = paymentDiv.querySelector(`#paypal`);
const bitcoin = paymentDiv.querySelector(`#bitcoin`)

// function to create new element
const createElement = (element, prop1, val1, prop2, val2, ) => {
    let newElement = document.createElement(element);
    newElement[prop1] = val1;
    newElement[prop2] = val2;
    return newElement;
}

// function to hide element on the page
const hideElement = ( element ) => {
    element[`style`][`display`] = `none`;

}

// function to show the element
// accepts 2 arguments:
//  1. element = element we want to show
//  2. value = how we want to display element (block, flex, etc..)
const showElement = ( element, value ) => {
    element[`style`][`display`] = value ;
}


// -------------------------------------
// FORM SUBMIT EVENT HANDLER
// -------------------------------------

form.addEventListener(`submit`, (e) => {
    e.preventDefault();
});

document.addEventListener(`DOMContentLoaded`, () => {

    // add focus to name input on load
    name.focus();

    // hiding the color div
    if ( designSelect.value === `Select Theme` ) {
        colorDiv.className = `is-hidden`;
    }

    // hiding cc, paypal, & bitcoin
    hideElement(ccDiv);
    hideElement(paypal);
    hideElement(bitcoin);

    // -------------------------------------
    // FORM CHANGE EVENT HANDLER
    // -------------------------------------

    form.addEventListener(`change`, (e) => {
        // creating, appending, and removing of `Other` input[type=text]
        if (e.target.id === userTitle.id) {
            let otherJobTitle = createElement(`input`, `type`, `text`, `placeholder`, `Please enter your job title`)
            let parent = document.querySelectorAll(`fieldset`)[0];

            if (e.target.value.toLowerCase() === `other`) {
                parent.appendChild(otherJobTitle);
                let otherJobInput = parent.querySelector(`input:last-child`);
                otherJobInput.required = true;
                console.log(`appending`);
            } else {
                let otherJobInput = parent.querySelector(`input:last-child`);
                if ( otherJobInput ) {
                    parent.removeChild(otherJobInput);
                }
                console.log(`removing`);
            }
        }
        // t-shirt select
        if ( e.target.id === designSelect.id ) {
            let colorSelect = document.querySelector(`#color`);
            let colorOptions = colorSelect.children;

            // hide all of the options
            for (var i = 0; i < colorOptions.length; i++) {
                colorOptions[i].style.display = `none`;
                console.log(`all options hidden`);
            }

            // if the select`s value = js puns
            if ( e.target.value === `js puns` ) {
                // remove the `is-hidden` class on
                colorDiv.className = ``;
                for (var i = 0; i < 3; i++) {
                    colorOptions[i].style.display = `block`
                    colorSelect.selectedIndex = 0;
                }
                for (var i = 3; i < 6; i++) {
                    colorOptions[i].style.display = `none`;
                }
            } else if ( e.target.value === `heart js` ) {
                colorDiv.className = ``;
                for (var i = 0; i < 3; i++) {
                    colorOptions[i].style.display = `none`
                }
                for (var i = 3; i < 6; i++) {
                    colorOptions[i].style.display = `block`;
                    colorSelect.selectedIndex = 3;
                }
            } else {
                colorDiv.className = `is-hidden`;
            }

        }

        // PAYMENT SECTION
        if ( e.target.id === paymentSelect.id ) {

            let ccInputs = ccDiv.children;
            console.log(ccInputs.length);

            if ( e.target.value === `credit card` ) {
                showElement(ccDiv, `block`);
                hideElement(paypal);
                hideElement(bitcoin);
                console.log(`credit card info shown`);
            } else if ( e.target.value === `paypal` ) {
                showElement(paypal, `block`);
                hideElement(ccDiv);
                hideElement(bitcoin);
                console.log(`paypal info shown`);
            } else if ( e.target.value === `bitcoin` ) {
                showElement(bitcoin, `block`);
                hideElement(ccDiv);
                hideElement(paypal);
                console.log(`bitcoin info shown`);
            } else {
                hideElement(ccDiv);
                hideElement(paypal);
                hideElement(bitcoin);
                console.log(`all payment divs hidden`);
            }
        }

        // SO MUCH ROOM FOR ACTIVITIES!!!

        if ( e.target.type === `checkbox` ) {

            let checkbox = e.target;
            let checked = checkbox.checked;
            let activityCheckboxes = activities.querySelectorAll(`input[type=checkbox]`);

            if ( checked ) {
                if ( e.target.value === `1`) {
                    for ( let i = 0; i < activityCheckboxes.length; i++ ) {
                        if ( activityCheckboxes[i][`value`] === `1` )
                        activityCheckboxes[i][`disabled`] = true;
                    }
                    e.target.disabled = false;
                    console.log(`1 PM speakers`);
                } else if ( e.target.value === `9` ) {
                    for ( let i = 0; i < activityCheckboxes.length; i++ ) {
                        if ( activityCheckboxes[i][`value`] === `9` )
                        activityCheckboxes[i][`disabled`] = true;
                    }
                    e.target.disabled = false;
                    console.log(`9 AM speakers`);
                }
                console.log(`checked`);
            } else {    
                console.log(`unchecked`);
            }
        }
    });
});
