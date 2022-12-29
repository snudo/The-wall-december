document.getElementsByClassName("form_template")[0].addEventListener("submit", validateFormInputs); /*document.getElementsByClassName("form_template")[0].addEventListener("submit", validateFormInputs);*/

/*
    *DOCU: This function check and validates form inputs of signin and signup
    *Triggered: document.getElementsByClassName("form_template")[0].addEventListener("submit", validateFormInputs);
    *Last Updated: December 29, 2022
    *Author: Stan Bernie Nudo
*/
function validateFormInputs(event){
    event.preventDefault();
    let template_form = this;

    /*Loop through form inputs and validate*/
    template_form.querySelectorAll(".form_inputs").forEach(inputs => {
        (inputs.value.length) ? inputs.classList.remove("error_input") : inputs.classList.add("error_input");
    });

    /*Check form input error remaining*/
    if(!template_form.querySelectorAll(".error_input").length){
        template_form.reset();
        window.location.href = "/web_frontend/views/dashboard/post_dashboard.html";
    }
}