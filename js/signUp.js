"use strict";
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
                    <button type="submit" class="signupbtn">Sign Up</button>
                </div>
            </div>
        </form>
`;

formContainer.innerHTML = output;

let form = document.getElementById("form");

let name = form.name;
let firstName = form.firstName;
let email = form.email;


function validateEmail() {
    let x = email.value;
    let atposition = x.indexOf("@");
    let dotposition = x.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
        alert("Please enter a valid e-mail address !");
        return false;
    }
}

function validateNames() {
    if (name == null || name == "") {
        alert("Name can't be blank");
        return false;
    }
    if (firstName == null || firstName == "") {
        alert("First Name can't be blank");
        return false;
    }
}

form.onsubmit = function () {
    validateEmail();
    validateNames();
    formContainer.innerHTML = `
    <div>
    <p id="info"> You are now registered ! </p>
    <li>
        <label for="name"><b>Name: ${name.value}</b>
        </label>
    </li>
    <li>
        <label for="firstName"><b>First Name: ${firstName.value}</b>
        </label>
    </li>
    <li>
        <label for="email"><b>Email: ${email.value}</b>
        </label>
    </li>   
    </div>
    `;

};