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

// Variables
const form = document.querySelector(`form`);
const name = document.querySelector(`#name`);
const email = document.querySelector(`input[type=email]`);
const userTitle = document.querySelector(`select#title`);
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
const tuesday1 = [];
const tuesday9 = [];
let cost = 0;
const costP = document.querySelector(`.total-cost`);
const costSpan = createElement(`span`, `class`, `cost`, `textContent`, cost);
costP.appendChild(costSpan);

const addToCost = ( number ) => {
    cost += number;
    costSpan.textContent = cost;
}

const subtractFromCost = ( number ) => {
    cost -= number;
    costSpan.textContent = cost;
}

const addInputValidation = ( element ) => {
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

// -------------------------------------
// FORM SUBMIT EVENT HANDLER
// -------------------------------------

form.addEventListener(`submit`, ( e ) => {
    e.preventDefault();
    let designValue = designSelect.value;
    let designLabel = document.querySelector(`label[for=design]`);
    if ( designValue === `Select Theme` ) {
        console.log(designLabel);
        designLabel.textContent = `Design: Please select a theme`;
        designLabel.style.color = `#ee5253`;
    }
});

document.addEventListener(`DOMContentLoaded`, () => {

    // add focus to name input on load
    name.focus();

    addInputValidation(name);
    addInputValidation(email);

    // hiding the color div
    if ( designSelect.value === `Select Theme` ) {
        colorDiv.className = `is-hidden`;
    }

    // hiding cc, paypal, & bitcoin
    hideElement(ccDiv);
    hideElement(paypal);
    hideElement(bitcoin);

    // sorting activities
    for ( let i = 0; i < activityCheckboxes.length; i++ ) {
        let activity = activityCheckboxes[i];

        if ( activity.name === `js-frameworks` || activity.name === `express` ) {
            tuesday9.push(activity);
        }
        if ( activity.name === `js-libs` || activity.name === `node`  ){
            tuesday1.push(activity);
        }
    }

    hideElement(costP);

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
                // create a new input
                let otherInput = createElement(`input`, `type`, `text`, `placeholder`, `Your job here`);
                // give it a class name
                otherInput.className = `other-job`;
                // select the fieldset
                let basicInfo = document.querySelector(`.basic-info`);
                basicInfo.appendChild(otherInput);
            } else if ( value.toLowerCase() !== `other` ) {
                let inputToRemove = document.querySelector(`.other-job`);
                if ( inputToRemove ) {
                    let basicInfo = document.querySelector(`.basic-info`);
                    basicInfo.removeChild(inputToRemove);
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

        // PAYMENT SECTION
        if ( e.target.id === paymentSelect.id ) {

            let ccInputs = ccDiv.children;
            console.log(ccInputs.length);

            if ( e.target.value === `credit card` ) {
                showElement(ccDiv, `block`);
                addInputValidation(ccNum);
                addInputValidation(ccZip);
                addInputValidation(ccCVV);
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


        //-------------------------------------
        // SO MUCH ROOM FOR ACTIVITIES!!!
        //-------------------------------------

        if ( e.target.type === `checkbox` ) {

            let checkbox = e.target;
            let checked = checkbox.checked;

            // if box = checked do the following:
            if ( checked ) {

                showElement(costP, `block`);

                if ( e.target.name === `js-frameworks`) {
                    tuesday9[1].disabled = `true`;
                    addToCost(100);
                    console.log(`express disabled`);
                } else if ( e.target.name === `express` ) {
                    tuesday9[0].disabled = `true`;
                    addToCost(100);
                    console.log(`frameworks disabled`);
                } else if ( e.target.name === `node` ) {
                    tuesday1[0].disabled = `true`;
                    addToCost(100);
                    console.log(`js-libs disabled`);
                } else if ( e.target.name === `js-libs`) {
                    tuesday1[1].disabled = `true`;
                    addToCost(100);
                    console.log(`node disabled`);
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
                    for ( let i = 0; i < tuesday9.length; i++ ) {
                        tuesday9[i].disabled = false;
                    }
                    subtractFromCost(100);
                } else if ( e.target.name === `express` ) {
                    for ( let i = 0; i < tuesday9.length; i++ ) {
                        tuesday9[i].disabled = false;
                    }
                    subtractFromCost(100);
                } else if ( e.target.name === `js-libs` ) {
                    for ( let i = 0; i < tuesday1.length; i++ ) {
                        tuesday1[i].disabled = false;
                    }
                    subtractFromCost(100);
                } else if ( e.target.name === `node` ) {
                    for ( let i = 0; i < tuesday1.length; i++ ) {
                        tuesday1[i].disabled = false;
                    }
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
    });
});
