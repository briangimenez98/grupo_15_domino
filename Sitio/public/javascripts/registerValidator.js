const $ = id => document.getElementById(id);

let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;


window.addEventListener('load', () => {


    /* validaciones */

    $('nombre').addEventListener('blur', () => {
        if(!$('nombre').value.trim()){
            $('nombre').classList.add('is-invalid')
            $('error-nombre').innerHTML = "Debes poner un nombre"
        }else{
            $('nombre').classList.remove('is-invalid')
            $('nombre').classList.add('is-valid')
            $('error-nombre').innerHTML = null
        }
    })

    $('apellido').addEventListener('blur', () => {
        if(!$('apellido').value.trim()){
            $('apellido').classList.add('is-invalid')
            $('error-apellido').innerHTML = "Debes poner un apellido"
        }else{
            $('apellido').classList.remove('is-invalid')
            $('apellido').classList.add('is-valid')
            $('error-apellido').innerHTML = null
        }
    })

    $('email').addEventListener('blur', () => {
        if(!regExEmail.test($('email').value)){
            $('email').classList.add('is-invalid')
            $('error-email').innerHTML = "Debes ingresar un email válido"
        }else{
            $('email').classList.remove('is-invalid')
            $('email').classList.add('is-valid')
            $('error-email').innerHTML = null
        }
    })

    $('contraseña').addEventListener('focus', () => {
        $('error-contraseña').innerHTML = "La contraseña debe tener entre 6 y 15 caractres, un número y una mayúscula"

    })

    $('contraseña').addEventListener('blur', () => {
        if(!regExPass.test($('contraseña').value)){
            $('contraseña').classList.add('is-invalid')
            $('error-contraseña').innerHTML = "La contraseña debe cumplir con estándares"
        }else{
            $('contraseña').classList.remove('is-invalid')
            $('contraseña').classList.add('is-valid')
            $('error-contraseña').innerHTML = null
        }
    })

    $('birthday').addEventListener('blur', () => {
        if(!$('birthday').value){
            $('birthday').classList.add('is-invalid')
            $('error-birthday').innerHTML = "Debes poner una fecha de nacimiento"
        }else{
            $('birthday').classList.remove('is-invalid')
            $('birthday').classList.add('is-valid')
            $('error-birthday').innerHTML = null
        }
    })

    $('acepta').addEventListener('click', () => {
        $('acepta').classList.toggle('is-valid')
        $('acepta').classList.remove('is-invalid')
        $('error-acepta').innerHTML = null
    })


    /* envio del formulario */

$('form-register').addEventListener('submit', e => {
    e.preventDefault();

    let elementosForm = $('form-register').elements;
    let error = false;

    for (let i = 0; i < elementosForm.length - 2; i++) {
        
        if(!elementosForm[i].value){
            elementosForm[i].classList.add('is-invalid')
            $('error-empty').innerHTML = 'Los campos señalados son obligatorios';
            error = true
        }
    }

    if(!$('acepta').checked){
        $('acepta').classList.add('is-invalid')
        $('error-acepta').innerHTML = "Debes aceptar los términos y condiciones";
        error = true
    }
    if(!error){
        $('form-register').submit()
    }
    console.log(elementosForm);
})

})
