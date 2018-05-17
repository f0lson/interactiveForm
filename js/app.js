//===============================
// Global Variables
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
    label.innerHTML = msg;
    input.style.borderColor = validGreen;
}
const invalid = ( label, input, msg ) => {
    input.style.borderColor = errorRed;
    label.style.color = errorRed;
    label.innerHTML = msg;
}
const realTimeValidation = ( element ) => {
    element.addEventListener(`keyup`, () => {
        let parent = element.parentNode;
        let elementValue = element.value;
        let label = element.previousElementSibling;

        if ( element.type === `email` ) {
            let emailTest = (string) => {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string);
            }
            if ( emailTest(elementValue) ) {
                valid(label, element, `Email:`);
                let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
                label.appendChild(required);
                parent.classList.remove(`real-time-invalid`);
                parent.classList.add(`real-time-valid`);
                return true;
            } else {
                invalid(label, element, `Email:* (Please enter a valid email)`);
                parent.classList.remove(`real-time-valid`);
                parent.classList.add(`real-time-invalid`);
                return false;
            }
        }
        if ( element.type === `text` ) {
            if ( element.id === `name` ) {
                // NAME INPUT
                if ( elementValue.length === 0 ) {
                    invalid(label, element, `Name:* (This field cannot be left blank)`);
                    parent.classList.remove(`real-time-valid`);
                    parent.classList.add(`real-time-invalid`);
                    return false;
                } else {
                    valid(label, element, `Name:`);
                    let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
                    label.appendChild(required);
                    parent.classList.remove(`real-time-invalid`);
                    parent.classList.add(`real-time-valid`);
                    return true;
                }
            }
            if ( element.id === `cc-num` ) {
                let ccNumTest = (string) => {return /(^\d{13,16}$)/.test(string)};
                if ( ccNumTest(elementValue) ) {
                    valid(label, element, `Card Number:`);
                    let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
                    label.appendChild(required);
                    parent.classList.remove(`real-time-invalid`);
                    parent.classList.add(`real-time-valid`);
                    return true;
                } else {
                    //UPDATE WITH iNVALID FUNCTION
                    element.placeholder = `Must be a 13-16 digit number`;
                    invalid(label, element, `Card Number:*`);
                    parent.classList.remove(`real-time-valid`);
                    parent.classList.add(`real-time-invalid`);
                    return false;
                }
            }
            if ( element.id === `zip`) {
                let ccZipTest = (string) => {return /^\d{5}$/.test(string);}
                if ( ccZipTest(elementValue) ) {
                    parent.classList.remove(`real-time-invalid`);
                    parent.classList.add(`real-time-valid`);
                    valid(label, element, `Zip Code:`);
                    let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
                    label.appendChild(required);
                    return true;
                } else {
                    invalid(label, element, `Zip Code:*`);
                    parent.classList.remove(`real-time-valid`);
                    parent.classList.add(`real-time-invalid`);
                    element.placeholder = `Must be 5 digits`;
                    return false;
                }
            }
            if ( element.id === `cvv` ) {
                let ccCVVTest = (string) => { return /^\d{3}$/.test(string);}
                if ( ccCVVTest(elementValue) ) {
                    parent.classList.remove(`real-time-invalid`);
                    parent.classList.add(`real-time-valid`);
                    valid(label, element, `CVV:`);
                    let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
                    label.appendChild(required);
                } else {
                    invalid(label, element, `CVV:*`);
                    parent.classList.remove(`real-time-valid`);
                    parent.classList.add(`real-time-invalid`);
                    element.placeholder = `Must be 3 digits`;
                    return false;
                }
            }
        }
    });
}

// function to check if the input fields are valid
// will return true if input = valid
// will return false if input = invalid
const checkInputs = ( element ) => {
    let testInput = element;
    let testInputValue = testInput.value;
    let testInputParent = testInput.parentNode;
    let label = testInput.previousElementSibling;
    if ( testInput.type === `email` ) {
        let emailTest = (string) => {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string);
        }
        if ( emailTest(testInputValue) ) {
            valid(label, testInput, `Email:`);
            let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
            label.appendChild(required);
            return true;
        } else if ( testInputValue.length === 0 ) {
            invalid(label, testInput, `Email:* (This field cannot be left blank)`);
            return false;
        } else {
            invalid(label, testInput, `Email:* (Please enter a valid email)`);
            return false;
        }
        console.log(`email`);
    }
    if ( testInput.type === `text` ) {
        if ( testInput.id === `name` ) {
            // NAME INPUT
            if ( testInputValue.length === 0 ) {
                invalid(label, testInput, `Name:* (This field cannot be left blank)`);
                return false;
            } else if ( testInputValue === "" ) {
                invalid(label, testInput, `Name:* (This field cannot be left blank)`);
                return false;
            }  else {
                valid(label, testInput, `Name:`);
                let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
                label.appendChild(required);
                return true;
            }
        }
        if ( testInput.id === `other-title` ) {
            let jobRoleLabel = document.querySelector(`label[for=title]`);
            if ( testInputValue.length === 0 || testInputValue === ` ` ) {
                invalid(jobRoleLabel, testInput, `Job Role:* (Please specify your job role)`);
                return false;
            } else {
                valid(jobRoleLabel, testInput, `Job Role:`);
                let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
                jobRoleLabel.appendChild(required);
                return true;
            }
        }
        if ( testInput.id === `cc-num` ) {
            let ccNumTest = (string) => {return /(^\d{13,16}$)/.test(string)};
            if ( ccNumTest(testInputValue) ) {
                valid(label, testInput, `Card Number:`);
                let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
                label.appendChild(required);
                return true;
            } else {
                testInput.placeholder = `Must be a 13-16 digit number`;
                invalid(label, testInput, `Card Number:*`);
                return false;
            }
        }
        if ( testInput.id === `zip`) {
            let ccZipTest = (string) => {return /^\d{5}$/.test(string);}
            if ( ccZipTest(testInputValue) ) {
                valid(label, testInput, `Zip Code:`);
                let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
                label.appendChild(required);
                return true;
            } else {
                invalid(label, testInput, `Zip Code: *`);
                testInput.placeholder = `Must be 5 digits`;
                return false;
            }
        }
        if ( testInput.id === `cvv` ) {
            let ccCVVTest = (string) => { return /^\d{3}$/.test(string);}
            if ( ccCVVTest(testInputValue) ) {
                valid(label, testInput, `CVV:`);
                let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
                label.appendChild(required);
                return true;
            } else {
                invalid(label, testInput, `CVV:`);
                testInput.placeholder = `Must be 3 digits`;
                return false;
            }
        }
    }
}

// check to see if the user has selected a t-shirt design
let checkDesign = () => {
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
        // create the required asterisk
        let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
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
            let required = createElement(`span`, `textContent`, `*`, `className`, `required`);
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

// -------------------------------------
// FORM CHANGE EVENT HANDLER
// -------------------------------------

// on the change event
form.addEventListener(`change`, (e) => {
    // if the id of the target element = id of the userTitle select:
    if (e.target.id === userTitle.id) {
        // storing the value of the select
        let value = e.target.value;
        // if the value is `other` then:
        if ( value.toLowerCase() === `other` ) {
            // show the other job role input
            showElement(otherJobInput, `block`);
        } else if ( value.toLowerCase() !== `other` ) {
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

    // -------------------------------------
    // Activities
    // -------------------------------------

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

    // -------------------------------------
    // Payment
    // -------------------------------------
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
    // CC selected but didn't select "Other" for job role
    if ( paymentSelect.selectedIndex === 1 && userTitle.selectedIndex !== 5 ) {
        let nameTest = checkInputs(name);
        let emailTest = checkInputs(email);
        let activitiesTest = checkActivities();
        let designTest = checkDesign();
        let ccNumTest = checkInputs(ccNum);
        let ccZipTest = checkInputs(ccZip);
        let ccCVVTest = checkInputs(ccCVV);
        // test everything but the otherJobInput
        // if all return true:
        if ( nameTest && emailTest && designTest && activitiesTest && ccNumTest && ccZipTest && ccCVVTest ) {
            // alert dialog box appears that says "Form successfully submitted!"
            alert(`You've successfully registered!`);
            // remove the invalid-btn class from the btn
            registerBtn.classList.remove(`invalid-btn`);
            // submit the form
            form.submit();
        } else {
            // if not all of them return true:
            // add the invalid-btn class which will make the btn shake and turn red
            registerBtn.classList.add(`invalid-btn`);
            // after the animation is complete
            registerBtn.addEventListener(`animationend`, () => {
                // remove the invalid-btn class
                registerBtn.classList.remove(`invalid-btn`);
            });
        }
    // no cc and no other job role
    } else if ( paymentSelect.selectedIndex !== 1 && userTitle.selectedIndex !== 5) {
        // run tests on default required fields:
        let nameTest = checkInputs(name);
        let emailTest = checkInputs(email);
        let activitiesTest = checkActivities();
        let designTest = checkDesign();

        // if all tests return true:
        if ( nameTest && emailTest && designTest && activitiesTest ) {
            // alert user form has been successfully submitted
            alert(`You've successfully registered!`);
            // remove the invalid-btn class
            registerBtn.classList.remove(`invalid-btn`);
            // submit the form
            form.submit();
        } else {
            // if not all of them return true:
            // add the invalid-btn class which will make the btn shake and turn red
            registerBtn.classList.add(`invalid-btn`);
            // after the animation is complete
            registerBtn.addEventListener(`animationend`, () => {
                // remove the invalid-btn class
                registerBtn.classList.remove(`invalid-btn`);
            });
        }
        // other job but not credit card
    } else if ( paymentSelect.selectedIndex !== 1 && userTitle.selectedIndex === 5 ){
        let nameTest = checkInputs(name);
        let emailTest = checkInputs(email);
        let activitiesTest = checkActivities();
        let designTest = checkDesign();
        let otherJobTest = checkInputs(otherJobInput);
        if ( nameTest && emailTest && designTest && activitiesTest && otherJobTest) {
            alert(`You've successfully registered!`);
            registerBtn.classList.remove(`invalid-btn`);
            form.submit();
        } else {
            registerBtn.classList.add(`invalid-btn`);
            registerBtn.addEventListener(`animationend`, () => {
                registerBtn.classList.remove(`invalid-btn`);
            });
        }
    } else if ( paymentSelect.selectedIndex === 1 && userTitle.selectedIndex === 5 ){
        let nameTest = checkInputs(name);
        let emailTest = checkInputs(email);
        let activitiesTest = checkActivities();
        let designTest = checkDesign();
        let otherJobTest = checkInputs(otherJobInput);
        let ccNumTest = checkInputs(ccNum);
        let ccZipTest = checkInputs(ccZip);
        let ccCVVTest = checkInputs(ccCVV);
        if ( nameTest && emailTest && designTest && activitiesTest && otherJobTest && ccNumTest && ccZipTest && ccCVVTest ) {
            alert(`You've successfully registered!`);
            registerBtn.classList.remove(`invalid-btn`);
            form.submit();
        } else {
            registerBtn.classList.add(`invalid-btn`);
            registerBtn.addEventListener(`animationend`, () => {
                registerBtn.classList.remove(`invalid-btn`);
            });
        }
    }
});
