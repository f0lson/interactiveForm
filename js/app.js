//===============================
// Variables
//===============================
// the <form> element
const form = document.getElementsByTagName(`form`)[0];
// the name <input> field
const name = document.querySelector(`#name`);
// the email <input> field
const email = document.querySelector(`input[type=email]`);
// the job title <select>
const userTitle = document.querySelector(`select#title`);
// the other job description <input>
const otherJobInput = document.querySelector(`#other-title`);
// the design <select>
const designSelect = document.querySelector(`select#design`);
// the <div> housing the color <label> & <select>
const colorDiv = document.querySelector(`#color-div`);
// the activities <fieldset>
const activities = document.querySelector(`.activities`);
// all of the activity <input> checkboxes
const activityCheckboxes = activities.querySelectorAll(`input[type=checkbox]`);
// the payment <fieldset>
const paymentDiv = document.querySelector(`#payment-section`);
// the payment <select>
const paymentSelect = document.querySelector(`#payment`);
// the cc <div>
const ccDiv = paymentDiv.querySelector(`#credit-card`);
// the cc number <input>
const ccNum = paymentDiv.querySelector(`#cc-num`);
// the cc zip code <input>
const ccZip = paymentDiv.querySelector(`#zip`);
// the cc CVV code <input>
const ccCVV = paymentDiv.querySelector(`#cvv`);
// the paypal payment information
const paypal = paymentDiv.querySelector(`#paypal`);
// the bitcoin payment inpformation
const bitcoin = paymentDiv.querySelector(`#bitcoin`);
// the value of the cost of the activities
let cost = 0;
// cost paragraph
const costP = document.querySelector(`.total-cost`);
// register button
const registerBtn = document.querySelector(`button[type=submit]`);


const validGreen = `#10ac84`;
const errorRed = `#e74c3c`;


//===============================
// Functions
//===============================

// function to create new element
const createElement = ( element, prop1, val1, prop2, val2 ) => {
    let newElement = document.createElement(element);
    newElement[prop1] = val1;
    newElement[prop2] = val2;
    return newElement;
}

// function to hide element on the page
const hideElement = ( element ) => {
    element[`style`][`display`] = `none`;
}

// funciton to show the Element
// accepts 2 arguments:
// 1. element = element we want to show
// 2. value = how we want to display element (block, flex, etc...)
const showElement = ( element, value ) => {
    element[`style`][`display`] = value;
}

// function to add to cost for activities
const addToCost = ( number ) => {
    cost += number;
    costSpan.textContent = cost;
}

// function to subtract from cost for activities
const subtractFromCost = ( number ) => {
    cost -= number;
    costSpan.textContent = cost;
}
const valid = ( label, input, msg ) => {
    label.style.color = `#000`;
    label.textContent = msg;
    input.style.borderColor = validGreen;
    return true;
}

const invalid = ( label, input, msg ) => {
    input.style.borderColor = errorRed;
    label.style.color = errorRed;
    label.textContent = msg;
    return false;
}

const realTimeValidation = ( element ) => {
    element.addEventListener(`input`, () => {
        let parent = element.parentNode;
        let parentClass = parent.className;
        if ( element.validity.valid ) {
            if ( parentClass === `col-6 col` ) {
                parent.classList.remove(`invalid`);
                parent.classList.add(`valid`);
                console.log(`contains col`);
            } else if ( parentClass === `col-3 col` ) {
                parent.classList.remove(`invalid`);
                parent.classList.add(`valid`);
            } else {
                parent.classList.remove(`invalid`);
                parent.classList.add(`valid`);
            }
        } else if ( !element.validity.valid ) {
            if ( parentClass === `col-6 col` ) {
                parent.classList.remove(`valid`);
                parent.classList.add(`invalid`);
                console.log(`contains col`);
            } else if ( parentClass === `col-3 col` ) {
                parent.classList.remove(`valid`);
                parent.classList.add(`invalid`);
            } else {
                parent.classList.remove(`valid`);
                parent.classList.add(`invalid`);
            }
        }

    });
}


// checking to see if at least 1 activity is selected
const checkActivities = () => {
    let checkedBox = 0;
    let activitiesLabel = document.querySelector(`.activities legend`);
    for ( let i = 0; i < activityCheckboxes.length; i++ ) {
        let activity = activityCheckboxes[i];
        if ( activity.checked === true ) {
            checkedBox++;
            activitiesLabel.style.color = `#000`;
            activitiesLabel.textContent = `Register for Activities`;
        }
    }
    if ( checkedBox < 1 ) {
        activitiesLabel.textContent = `Register for Activities (Please select at least 1 activity)`;
        activitiesLabel.style.color = errorRed;
        return false;
    } else {
        return true;
    }
}

// putting focus on the name <input>
// -- non-JS fallback: autofocus attribute on element
name.focus();

// hiding the color <div>
if ( designSelect.value === `Select Theme` ) {
    colorDiv.className = `is-hidden`;
}

// hiding the other job title <input>
hideElement(otherJobInput);

// hiding the paypal & bitcoin <div>s
hideElement(paypal);
hideElement(bitcoin);

// create span element to house activities sum
const costSpan = createElement(`span`, `class`, `cost`, `textContent`, cost);

// append to the cost paragraph
costP.appendChild(costSpan);

// hide the cost
hideElement(costP);

// adding real-time validation
realTimeValidation(name);
realTimeValidation(email);

// -------------------------------------
// FORM CHANGE EVENT HANDLER
// -------------------------------------

form.addEventListener(`change`, (e) => {
    // creating, appending, and removing of `Other` input[type=text]
    if (e.target.id === userTitle.id) {
        // storing the value of the select
        let value = e.target.value;
        // if the value is `other` then:
        if ( value.toLowerCase() === `other` ) {
            // OTHERINPUT
            showElement(otherJobInput, `block`);

        } else if ( value.toLowerCase() !== `other` ) {
            if ( otherJobInput ) {
                hideElement(otherJobInput);
            }
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
            // set the first 3 options to display block
            for (var i = 0; i < 3; i++) {
                colorOptions[i].style.display = `block`;
                // this will set the contents of the select to display the 1st item
                colorSelect.selectedIndex = 0;
            }
            // hide the last 3 options
            for (var i = 3; i < 6; i++) {
                colorOptions[i].style.display = `none`;
            }
        } else if ( e.target.value === `heart js` ) {
            // remove the `is-hidden` class
            colorDiv.className = ``;
            // hide the first 3 options
            for (var i = 0; i < 3; i++) {
                colorOptions[i].style.display = `none`
            }
            // display the last 3 options
            for (var i = 3; i < 6; i++) {
                colorOptions[i].style.display = `block`;
                // this will set the contents of the select to display the 4th item
                colorSelect.selectedIndex = 3;
            }
        } else {
            // if it's not puns or heart theme, hide the colorDiv
            colorDiv.className = `is-hidden`;
        }

    }

    // breaking down the activities
    let main = activityCheckboxes[0];
    let jsFrameworks = activityCheckboxes[1];
    let jsLibs = activityCheckboxes[2];
    let express = activityCheckboxes[3];
    let node = activityCheckboxes[4];
    let buildTools = activityCheckboxes[5];
    let npm = activityCheckboxes[6];

    // -------------------------------------
    // Activities
    // -------------------------------------

    if ( e.target.type === `checkbox` ) {

        let checkbox = e.target;
        let checked = checkbox.checked;

        // if box = checked do the following:
        if ( checked ) {

            // show the cost element
            showElement(costP, `block`);

            // if js frameworks is checked
            if ( e.target.name === `js-frameworks`) {
                // disable conflicting activity
                express.disabled = `true`;
                // gray out label
                express.parentNode.style.color = `gray`;
                // add cost of event to cost variable
                addToCost(100);
            } else if ( e.target.name === `express` ) {
                jsFrameworks.disabled = `true`;
                jsFrameworks.parentNode.style.color = `gray`;
                addToCost(100);
            } else if ( e.target.name === `node` ) {
                jsLibs.disabled = `true`;
                jsLibs.parentNode.style.color = `gray`;
                addToCost(100);
            } else if ( e.target.name === `js-libs`) {
                node.disabled = `true`;
                node.parentNode.style.color = `gray`;
                addToCost(100);
            } else if ( e.target.name === `all` ) {
                addToCost(200);
            } else if ( e.target.name === `build-tools` ) {
                addToCost(100);
            } else if ( e.target.name === `npm` ) {
                addToCost(100);
            }

        // When box = unchecked
        } else {
            if ( e.target.name === `js-frameworks` ) {
                express.disabled = false;
                express.parentNode.style.color = `#000`;
                subtractFromCost(100);
            } else if ( e.target.name === `express` ) {
                jsFrameworks.disabled = false;
                jsFrameworks.parentNode.style.color = `#000`;
                subtractFromCost(100);
            } else if ( e.target.name === `js-libs` ) {
                node.disabled = false;
                node.parentNode.style.color = `#000`;
                subtractFromCost(100);
            } else if ( e.target.name === `node` ) {
                jsLibs.disabled = false;
                jsLibs.parentNode.style.color = `#000`;
                subtractFromCost(100);
            } else if ( e.target.name === `all` ) {
                subtractFromCost(200);
            } else if ( e.target.name === `build-tools` ) {
                subtractFromCost(100);
            } else if ( e.target.name === `npm` ) {
                subtractFromCost(100);
            }
        }
    }

    // if there are no activities checked, then cost = 0 and needs to be hidden
    if ( cost === 0 ) {
        hideElement(costP);
    }


    // -------------------------------------
    // Payment
    // -------------------------------------
    if ( e.target.id === paymentSelect.id ) {

        if ( e.target.value === `credit card` ) {
            showElement(ccDiv, `block`);
            ccNum.required = true;
            ccZip.required = true;
            ccCVV.required = true;
            hideElement(paypal);
            hideElement(bitcoin);
        } else if ( e.target.value === `paypal` ) {
            if ( ccDiv ) {
                ccNum.required = false;
                ccZip.required = false;
                ccCVV.required = false;
            }
            showElement(paypal, `block`);
            hideElement(ccDiv);
            hideElement(bitcoin);
        } else if ( e.target.value === `bitcoin` ) {
            if ( ccDiv ) {
                ccNum.required = false;
                ccZip.required = false;
                ccCVV.required = false;
            }
            showElement(bitcoin, `block`);
            hideElement(ccDiv);
            hideElement(paypal);
        }
    }
});

registerBtn.addEventListener(`click`, (e) => {
    e.preventDefault();

    // running tests on inputs
    let nameTest = checkInputs(name);
    let emailTest = checkInputs(email);

    let activitiesTest = checkActivities();

    if ( paymentSelect.selectedIndex === 1 ) {
        let ccNumTest = checkInputs(ccNum);
        let ccZipTest = checkInputs(ccZip);
        let ccCVVTest = checkInputs(ccCVV);
    }

    if ( otherJobInput ) {
        let otherTest = checkInputs(otherJobInput);
    }

    if ( nameTest && activitiesTest ) {
        console.log(`valid`);
        alert(`Form successfully submitted!`);
        registerBtn.classList.remove(`invalid-btn`);
        form.submit();
    } else {
        registerBtn.classList.add(`invalid-btn`);
        registerBtn.addEventListener(`animationend`, () => {
            registerBtn.classList.remove(`invalid-btn`);
        });
        console.log(`invalid form`);
    }
});
