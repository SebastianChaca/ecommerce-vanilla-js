const formElement= document.getElementById('form')
const nombreError=document.getElementById('nombre_error')
const apellidoError=document.getElementById('apellido_error')
const emailError=document.getElementById('e-mail_error')
const passwordError=document.getElementById('password_error')
const submitBtn=document.getElementById('submitBtn')

submitBtn.disabled=true

const nombre=document.getElementById('nombre')
const apellido=document.getElementById('apellido')
const email=document.getElementById('email')
const password=document.getElementById('password')


formElement.addEventListener('change', ()=>{  
  if(nombre.value && apellido.value && email.value && password.value){
    submitBtn.disabled=false
    submitBtn.style.backgroundColor='rgb(25, 103, 211)'
  }})



formElement.addEventListener('submit', (e)=>{
  e.preventDefault()
  
  if(password.value.length < 7){
    passwordError.style.visibility='visible'
    passwordError.innerHTML='Ingrese una contraseña mas larga'

    setTimeout(()=>{      
      passwordError.style.visibility='hidden'
    },3000)
  }
})