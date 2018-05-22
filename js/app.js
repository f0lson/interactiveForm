//===============================
// Global Variables
//===============================
const form = document.getElementsByTagName(`form`)[0];
const name = document.querySelector(`#name`);
const email = document.querySelector(`input[type=email]`);
const userTitle = document.querySelector(`select#title`);
const otherJobInput = document.querySelector(`#other-title`);
const designSelect = document.querySelector(`select#design`);
const colorDiv = document.querySelector(`#color-div`);
const activities = document.querySelector(`.activities`);
const activityCheckboxes = activities.querySelectorAll(`input[type=checkbox]`);
const paymentDiv = document.querySelector(`#payment-section`);
const paymentSelect = document.querySelector(`#payment`);
const ccDiv = paymentDiv.querySelector(`#credit-card`);
const ccNum = paymentDiv.querySelector(`#cc-num`);
const ccZip = paymentDiv.querySelector(`#zip`);
const ccCVV = paymentDiv.querySelector(`#cvv`);
const paypal = paymentDiv.querySelector(`#paypal`);
const bitcoin = paymentDiv.querySelector(`#bitcoin`);
let cost = 0;
const costP = document.querySelector(`.total-cost`);
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
// required asterisk
const required = createElement(`span`, `textContent`, `*`, `className`, `required`);

// function to hide element on the page
const hideElement = ( element ) => {
    element[`style`][`display`] = `none`;
}
// funciton to show the Element
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
// marking an input as valid
const valid = ( input, msg ) => {
    let parent = input.parentNode;
    let label = input.previousElementSibling;
    parent.classList.remove(`real-time-invalid`);
    parent.classList.add(`real-time-valid`);
    label.innerHTML = msg;
    label.style.color = `#000`;
    label.appendChild(required);
    input.style.borderColor = validGreen;
}
// marking an input as invalid
const invalid = ( input, msg ) => {
    let parent = input.parentNode;
    let label = input.previousElementSibling;
    parent.classList.remove(`real-time-valid`);
    parent.classList.add(`real-time-invalid`);
    label.style.color = errorRed;
    label.innerHTML = msg;
    input.style.borderColor = errorRed;
}
// will submit form when all tests return valid
const validForm = () => {
    alert(`You've successfully registered!`);
    registerBtn.classList.remove(`invalid-btn`);
    form.submit();
}
// error msg and submit btn error animation
const invalidForm = () => {
    registerBtn.classList.add(`invalid-btn`);
    registerBtn.addEventListener(`animationend`, () => {
        registerBtn.classList.remove(`invalid-btn`);
    });
}
// function for real-time validation on input elements
const realTimeValidation = ( element ) => {
    element.addEventListener(`keyup`, () => {
        let elementValue = element.value;
        if ( element.type === `email` ) {
            let emailTest = (string) => {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string);
            }
            if ( emailTest(elementValue) ) {
                valid(element, `Email:`);
                return true;
            } else {
                invalid(element, `Email:* (Please enter a valid email)`);
                return false;
            }
        }
        if ( element.type === `text` ) {
            if ( element.id === `name` ) {
                // NAME INPUT
                if ( elementValue.length === 0 ) {
                    invalid(element, `Name:* (This field cannot be left blank)`);
                    return false;
                } else {
                    valid(element, `Name:`);
                    return true;
                }
            }
            if ( element.id === `cc-num` ) {
                let ccNumTest = (string) => {return /(^\d{13,16}$)/.test(string)};
                if ( ccNumTest(elementValue) ) {
                    valid(element, `Card Number:`);
                    return true;
                } else {
                    element.placeholder = `Must be a 13-16 digit number`;
                    invalid(element, `Card Number:*`);
                    return false;
                }
            }
            if ( element.id === `zip`) {
                let ccZipTest = (string) => {return /^\d{5}$/.test(string);}
                if ( ccZipTest(elementValue) ) {
                    valid(element, `Zip Code:`);
                    return true;
                } else {
                    invalid(element, `Zip Code:*`);
                    element.placeholder = `Must be 5 digits`;
                    return false;
                }
            }
            if ( element.id === `cvv` ) {
                let ccCVVTest = (string) => { return /^\d{3}$/.test(string);}
                if ( ccCVVTest(elementValue) ) {
                    valid(element, `CVV:`);
                } else {
                    invalid(element, `CVV:*`);
                    element.placeholder = `Must be 3 digits`;
                    return false;
                }
            }
        }
    });
}

// function to check if the input fields are valid
const checkInputs = ( element ) => {
    let testInput = element;
    let testInputValue = testInput.value;
    let label = testInput.previousElementSibling;
    if ( testInput.type === `email` ) {
        let emailTest = (string) => {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string);
        }
        if ( emailTest(testInputValue) ) {
            valid(testInput, `Email:`);
            return true;
        } else if ( testInputValue.length === 0 ) {
            invalid(testInput, `Email:* (This field cannot be left blank)`);
            return false;
        } else {
            invalid(testInput, `Email:* (Please enter a valid email)`);
            return false;
        }
    }
    if ( testInput.type === `text` ) {
        if ( testInput.id === `name` ) {
            //
            if ( testInputValue.length === 0 ) {
                invalid(testInput, `Name:* (This field cannot be left blank)`);
                return false;
            } else if ( testInputValue === "" ) {
                invalid(testInput, `Name:* (This field cannot be left blank)`);
                return false;
            }  else {
                valid(testInput, `Name:`);
                return true;
            }
        }
        if ( testInput.id === `cc-num` ) {
            let ccNumTest = (string) => {return /(^\d{13,16}$)/.test(string)};
            if ( ccNumTest(testInputValue) ) {
                valid(testInput, `Card Number:`);
                return true;
            } else {
                testInput.placeholder = `Must be a 13-16 digit number`;
                invalid(testInput, `Card Number:*`);
                return false;
            }
        }
        if ( testInput.id === `zip`) {
            let ccZipTest = (string) => {return /^\d{5}$/.test(string);}
            if ( ccZipTest(testInputValue) ) {
                valid(testInput, `Zip Code:`);
                return true;
            } else {
                invalid(testInput, `Zip Code: *`);
                testInput.placeholder = `Must be 5 digits`;
                return false;
            }
        }
        if ( testInput.id === `cvv` ) {
            let ccCVVTest = (string) => { return /^\d{3}$/.test(string);}
            if ( ccCVVTest(testInputValue) ) {
                valid(testInput, `CVV:`);
                return true;
            } else {
                invalid(testInput, `CVV:*`);
                testInput.placeholder = `Must be 3 digits`;
                return false;
            }
        }
    }
}

// check to see if the user has selected a t-shirt design
const checkDesign = () => {
    // store a reference to the design label
    let designLabel = designSelect.previousElementSibling;
    // if the design select is at index 0:
    if ( designSelect.selectedIndex === 0 ) {
        // change the design label text content to the error msg
        designLabel.textContent = `Design:* (Please select a design)`;
        // set the label's color to errorRed
        designLabel.style.color = errorRed;
        // return false
        return false;
        // if the design select is not at index 0
    } else {
        // reset the label text content to `Design:`
        designLabel.textContent = `Design:`;
        // reset the label color to the default
        designLabel.style.color = `#000`;
        // append required asterisk to design label
        designLabel.appendChild(required);
        // return true
        return true;
    }
}

// checking to see if at least 1 activity is selected
const checkActivities = () => {
    // tracking how many boxes are checked
    let checkedBox = 0;
    // storing reference to activities label
    let activitiesLabel = document.querySelector(`.activities legend`);
    // iterating thru all of the activity checkboxes
    for ( let i = 0; i < activityCheckboxes.length; i++ ) {
        // reference to current activity in array
        let activity = activityCheckboxes[i];
        // if the activity is checked
        if ( activity.checked === true ) {
            // add 1 to the checkedBox variable
            checkedBox++;
            // resetting the label's default styles and textcontent & adding required asterisk
            activitiesLabel.style.color = `#184f68`;
            activitiesLabel.textContent = `Register for Activities`;
            activitiesLabel.appendChild(required);
        }
    }
    // if there's less than 1 box checked then:
    if ( checkedBox < 1 ) {
        // update label with error message
        activitiesLabel.textContent = `Register for Activities* (Please select at least 1 activity)`;
        // set error msg color to errorRed
        activitiesLabel.style.color = errorRed;
        // return false because nothing has been checked
        return false;
        // if there's 1 or more boxes checked:
    } else {
        // return true
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
realTimeValidation(ccNum);
realTimeValidation(ccZip);
realTimeValidation(ccCVV);

//===============================
// Event Handlers
//===============================

// on the change event
form.addEventListener(`change`, (e) => {
    // if the id of the target element = id of the userTitle select:
    if (e.target.id === userTitle.id) {
        // if the value is `other` then:
        if ( userTitle.selectedIndex === 5 ) {
            // show the other job role input
            showElement(otherJobInput, `block`);
        } else if ( userTitle.selectedIndex !== 5 ) {
            let jobLabel = document.querySelector(`label[for=title]`);
            jobLabel.style.color = `#000`;
            jobLabel.textContent = `Job Role`;
            jobLabel.appendChild(required);
            // hide the other job input
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

    // Activities:
    // if the element is changed and the type = checkbox, then:
    if ( e.target.type === `checkbox` ) {
        // store a reference to the specific checkbox
        let checkbox = e.target;
        // store the boolean value of whether or not the box is checked
        // should return true if the box has been checked and false if it has not
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
                // if the express activity is checked:
            } else if ( e.target.name === `express` ) {
                // disable the conflicting activity (jsFrameworks)
                jsFrameworks.disabled = `true`;
                // gray out conflicting activity label
                jsFrameworks.parentNode.style.color = `gray`;
                // add 100 to the total cost
                addToCost(100);
                // if the node activity is checked:
            } else if ( e.target.name === `node` ) {
                // disable the conflicting activity (jsLibs)
                jsLibs.disabled = `true`;
                // gray out conflicting label
                jsLibs.parentNode.style.color = `gray`;
                // add 100 to the total cost
                addToCost(100);
                // if jsLibs = checked
            } else if ( e.target.name === `js-libs`) {
                // disable conflicting activity
                node.disabled = `true`;
                // gray out conflicting activity label
                node.parentNode.style.color = `gray`;
                // add 100 to the total cost
                addToCost(100);
            } else if ( e.target.name === `all` ) {
                // if target's name === `all`
                // add 200 to the total cost
                addToCost(200);
            } else if ( e.target.name === `build-tools` ) {
                // if the target's name === `build-tools`
                // add 100 to the total cost
                addToCost(100);
            } else if ( e.target.name === `npm` ) {
                // if the target's name === `npm`
                // add 100 to the total cost
                addToCost(100);
            }

        // When box = unchecked
        } else {
        // if the following targets have these names and return false, then do the following:
            // 1. undisable the conflicting activityCheckboxes (if one exists)
            // 2. change the conflicting activity label color back to default (if one exists)
            // 3. subtract activity cost from the total
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
    // payment section
    if ( e.target.id === paymentSelect.id ) {
        // if the payment select's value is set to credit card:
        if ( e.target.value === `credit card` ) {
            // show the cc div
            showElement(ccDiv, `block`);
            // hide the paypal & bc info
            hideElement(paypal);
            hideElement(bitcoin);
            // if the value is set to paypal
        } else if ( e.target.value === `paypal` ) {
            // show the paypal element
            showElement(paypal, `block`);
            // hide the cc and bc elements
            hideElement(ccDiv);
            hideElement(bitcoin);
            // if value is set to bitcoin
        } else if ( e.target.value === `bitcoin` ) {
            // show bc element
            showElement(bitcoin, `block`);
            // hide cc and paypal elements
            hideElement(ccDiv);
            hideElement(paypal);
        }
    }
});

// when the register button is clicked:
registerBtn.addEventListener(`click`, (e) => {
    // prevent the form from submitting by default
    e.preventDefault();
    // tests
    let nameTest = checkInputs(name);
    let emailTest = checkInputs(email);
    let activitiesTest = checkActivities();
    let designTest = checkDesign();

    // cc selected
    if ( paymentSelect.selectedIndex === 1 ) {
        let ccNumTest = checkInputs(ccNum);
        let ccZipTest = checkInputs(ccZip);
        let ccCVVTest = checkInputs(ccCVV);
        if ( nameTest && emailTest && designTest && activitiesTest && ccNumTest && ccZipTest && ccCVVTest ) {
            validForm();
        } else {
            invalidForm();
        }
    // no cc and no "other" job role
    } else if ( paymentSelect.selectedIndex !== 1 ) {
        if ( nameTest && emailTest && designTest && activitiesTest ) {
            validForm();
        } else {
            invalidForm();
        }
    }
});
