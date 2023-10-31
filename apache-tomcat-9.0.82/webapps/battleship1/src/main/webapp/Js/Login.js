function _(id){
    return document.getElementById(id);
}

const serverURL = "http://localhost:8080/";

let mode = "login";
let userName;
let password; 
let passwordAttempts;

function getUsername(){
    return _("username").value;
}

function getPassword(){
    return _("password").value;
}

_("login").addEventListener('click', function(){
    // console.log("jbjlj")
    checkValidity(); 

    if (checkValidity() && mode == "login") {

        userName = getUsername();
        password = getPassword();
        checkServerSideLoginValidity();

    } else if (checkValidity() && mode == "signup") {

        userName = getUsername(); 
        password = getPassword(); 
        checkServerSideSignupValidity();

    } else if (checkValidity()) flushPage();

})

_("signup").addEventListener('click', goToSignupPage);

function goToSignupPage(){

    document.querySelector(".card-head").textContent = "Sign up";
    document.querySelector(".signup-link").style.display = "none";
    _("password2").style.display = "block";
    _("login").textContent = "Sign up";
    mode = "signup";

}

function flushPage(){

    document.querySelector(".first").textContent = "";
    document.querySelector(".second").textContent = "";
    document.querySelector(".third").textContent = "";

}

function checkValidity(){

    if (mode == "login"){
        if (_("username").value.length < 4) {usernameIsNotValid("Please enter a valid username."); return false;}
        else if (_("password").value.length < 8) {passwordIsNotValid("Please enter a valid password."); return false;}
        else return true;
    }
    else {
        if (_("username").value.length < 4) {usernameIsNotValid("Please enter a valid username."); return false;}
        else if (_("password").value.length < 8) {passwordIsNotValid("That is not a valid password. Retry."); return false;}
        else if (_("password2").value.length < 8 || _("password").value != _("password2").value) {checkPasswordIsNotValid("Password should be the same in both boxes."); return false}     
        else return true;  
    }

}

function checkServerSideLoginValidity(){

    const response = loginUserNameAndPassword({username: userName, password: password});
    if (response.validUsername && response.validPassword) goToMainPage();
    else if (response.validUserName && passwordAttempts < 5) incorrectPassword("Your password is incorrect. Please try again.");
    else if (passwordAttempts >= 5) incorrectPassword("You've attempted maximum amount of tries. Please change your password with the link sent in the mail.");
    else if (response.validPassword) usernameNotFound("Username does not exist.");
    else {
        usernameIsNotValid("User name aint it.");
        passwordIsNotValid("Your password does not matter anymore. ");
    }

}
function checkServerSideSignupValidity(){

    const response = signupUser({username: userName, password: password});

    if (response.userNameExists) {
        usernameIsNotValid("This user already exists.");
    }
    else if (response.weakPassword) {
        passwordIsNotValid("Your password is too weak. Re-enter another password.");
    } else {
        goToMainPage();
    }

}

function usernameIsNotValid(warningMessage){
    document.querySelector(".first").textContent = warningMessage;
}

function passwordIsNotValid(warningMessage){
    document.querySelector(".second").textContent = warningMessage;
}

function checkPasswordIsNotValid(warningMessage){
    document.querySelector(".third").textContent = warningMessage;
}

function usernameNotFound(warningMessage){
    document.querySelector(".first").textContent = warningMessage;
}

function incorrectPassword(warningMessage){
    document.querySelector(".second").textContent = warningMessage;
    passwordAttempts += 1;
}

function goToMainPage(){
        window.location.href = 'Main.html';
}


async function loginUserNameAndPassword(data) {

    try{

        const response = await fetch(serverURL, {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Yeah could not find shit.");
        }

        return response.json;

    } catch (error) {

        console.log('There was an error with the fetch operation: ', error);
        return null;

    }


}

async function signupUser(data) {

    const response = await fetch(serverURL, {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }); 
    
    return response.json;

}


