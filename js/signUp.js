"use strict";
/**
 * This script render the html for sign up page.
 * It also makes the verifications before validating user sign up.
 */

const formContainer = document.getElementById("form-container");

const output = `
        <form id="form" name="signupForm">
            <div>
                <label for="name"><b>Name</b>
                    <input type="text" placeholder="Enter your Name" name="name" required>
                </label>

                <label for="firstName"><b>First Name</b>
                    <input type="text" placeholder="Enter your First Name" name="firstName" required>
                </label>

                <label for="email"><b>Email</b>
                    <input type="text" placeholder="Enter Email" name="email" required>
                </label>

                <div class="clearfix">
                    <button type="submit" class="button">Sign Up</button>
                </div>
            </div>
        </form>
`;

formContainer.innerHTML = output;

let form = document.getElementById("form");

/** Use the same names from form element created in output variable.*/
let name = form.name;
let firstName = form.firstName;
let email = form.email;

/**
 * Verify that email format is valid. (no space + @)
 * @return boolean true if ok.
 * */
function validateEmail() {
    let enteredEmail = email.value;
    let atPosition = enteredEmail.indexOf("@");
    let dotPosition = enteredEmail.lastIndexOf(".");

    /** \s means "any whitespace character" (spaces, tabs, vertical tabs, formfeeds, line breaks, etc.),
     * and will find that character anywhere in the string.*/
    if (/\s/.test(enteredEmail)){
        alert("Please enter a valid e-mail address ! No Spaces !");
        return false;
    }
    if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= enteredEmail.length) {
        alert("Please enter a valid e-mail address !");
        return false;
    }
    return true;
}

/**
 * Verify that all fields are completed.
 * @return boolean true if ok.
 * */
function validateNames() {
    if (name == null || name === "") {
        alert("Name can't be blank");
        return false;
    }
    if (firstName == null || firstName === "") {
        alert("First Name can't be blank");
        return false;
    }
    return true;
}

/**
 * When the user submit the form, we make verifications on his inputs and print his credentials if OK.
 * @return boolean true if submission is successful.
 */
form.onsubmit = function () {
    if (validateEmail() && validateNames()){
        formContainer.innerHTML = `
            <div>
            <p id="info"> You are now registered ! </p>
            <li>
                <label class="registrationLabel" for="name"><b>Name: ${name.value}</b>
                </label>
            </li>
            <li>
                <label class="registrationLabel" for="firstName"><b>First Name: ${firstName.value}</b>
                </label>
            </li>
            <li>
                <label class="registrationLabel" for="email"><b>Email: ${email.value}</b>
                </label>
            </li>   
            </div>
            `;
        return true;
    }else{
        return false;
    }
};