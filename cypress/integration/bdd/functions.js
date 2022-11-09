import {Given, And, Then, When} from "cypress-cucumber-preprocessor/steps"
import Login from "../../pages/Login"

const login = new Login();

Given('User access to W3Schoool page', ()=>{
    login.navigate();
    login.clickAcceptCookie();
})

When('User access to login page', ()=> {

login.openLoginPage()

})

And('User is clicks to login button', ()=>{
    login.clickLoginBtn();
})

Then('Email is empty error is shows', ()=> {
    login.validateEmailIsEmptyErrorMessage();
})

And('User is input invalid emaill', ()=>{
    login.inputUsername("testing");
    
})

Then('Invalid email error is shows', ()=> {
    login.validateInvalidEmailErrorMessage();
})

And('User is input username only',  ()=>{
    login.inputUsername("thanhtai@gmail.com");
})

Then('Password is require error is shows', ()=> {
    login.validatePasswordIsEmptyErrorMessage();
})