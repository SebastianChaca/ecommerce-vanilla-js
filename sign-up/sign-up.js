const formElement= document.getElementById('form')
const usernameError=document.getElementById('username_error')
const emailError=document.getElementById('e-mail_error')
const confirmPasswordError=document.getElementById('confirmPassword_error')
const submitBtn=document.getElementById('submitBtn')

submitBtn.disabled=true

const username=document.getElementById('username')
const email=document.getElementById('email')
const password=document.getElementById('password')
const confirmPassword=document.getElementById('confirmPassword')

function setUserStorage(username){
  localStorage.removeItem('user')
  const user={username , isLoggedIn: true}
  localStorage.setItem('user', JSON.stringify(user))
}

function starLoading(){  
  submitBtn.style.backgroundColor='rgb(190, 203, 226)'
  submitBtn.disabled=true
  let imgElement=document.createElement('img')
  imgElement.id='imgBtn'
  imgElement.src='../Img/dashboard/loading.gif'
  submitBtn.innerHTML=''
  submitBtn.appendChild(imgElement)
}


async function signUp(username, email, password){
  starLoading()
  try {
    const response = await fetch('https://api-nucba.herokuapp.com/auth/local/register',{
      method:'POST',
      body: JSON.stringify({
        username,
        email,
        password       
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response.json()
  } catch (error) {
    console.log(error)
  }
}



formElement.addEventListener('change', ()=>{  
  if(username.value && email.value && password.value && confirmPassword.value){
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
  }else if(password.value != confirmPassword.value){
    confirmPasswordError.style.visibility='visible'
    confirmPasswordError.innerHTML='Las contraseñas deben coincidir'
    setTimeout(()=>{      
      confirmPasswordError.style.visibility='hidden'
    },3000)
  }
  else{
    signUp(username.value, email.value, password.value).then(()=>{
      setUserStorage(username.value)
      window.location.href="index.html"
    })
   
    
  }
})