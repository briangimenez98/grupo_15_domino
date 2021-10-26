const $ = id => document.getElementById(id);

let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;

window.addEventListener('load', () => {

    /*validaciones*/
    $('email').addEventListener('blur', () => {
        if(!regExEmail.test($('email').value)){
            $('email').classList.add('is-invalid')
            $('error-email').innerHTML = "Debes ingresar un Email"
        }else{
            $('email').classList.remove('is-invalid')
            $('email').classList.add('is-valid')
            $('error-email').innerHTML = null
        }
    })

    $('password').addEventListener('blur', () => {
        if(!regExPass.test($('password').value)){
            $('password').classList.add('is-invalid')
            $('error-password').innerHTML = "Debes ingresar una contraseña correcta"
        }else{
            $('password').classList.remove('is-invalid')
            $('password').classList.add('is-valid')
            $('error-password').innerHTML = null
        }
    })

    /* envio formulario */

    $('form-login').addEventListener('submit', e => {
        e.preventDefault();

    let elementosForm = $('form-login').elements;
    let error = false;
    for (let i = 0; i < elementosForm.length - 2; i++) {
        
        if(!elementosForm[i].value){
            elementosForm[i].classList.add('is-invalid')
            $('error-empty').innerHTML = 'Los campos señalados son obligatorios';
            error = true
        }
    }
    })







})