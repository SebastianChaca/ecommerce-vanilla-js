const formElement= document.getElementById('form')
const passwordError=document.getElementById('password_error')
const emailError=document.getElementById('e-mail_error')
const submitBtn=document.getElementById('submitBtn')

submitBtn.disabled=true

const email=document.getElementById('email')
const password=document.getElementById('password')

function setUserStorage(data){
  localStorage.removeItem('user')
  const user={username: data.user.username , isLoggedIn: true, token:data.jwt}
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

function stopLoading(){
 
  let btnImage=document.getElementById('imgBtn')
  submitBtn.removeChild(btnImage)
  submitBtn.innerHTML='Log in'
  submitBtn.disabled=false
  submitBtn.style.backgroundColor='rgb(95, 132, 157)'
}


async function logIn(identifier, password){
  starLoading()
  try {
    const response = await fetch('https://api-nucba.herokuapp.com/auth/local',{
      method:'POST',
      body: JSON.stringify({
        identifier,
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
  if(email.value && password.value){
    submitBtn.disabled=false
    submitBtn.style.backgroundColor='rgb(25, 103, 211)'
  }})



formElement.addEventListener('submit', (e)=>{
  e.preventDefault()
  const identifier= email.value
  logIn(identifier, password.value).then(r => {
    if (r.error){
      stopLoading()
      emailError.style.visibility='visible'
      emailError.innerHTML='Credenciales Invalidas'
    }else{
      
      setUserStorage(r)
      window.location.href="index.html"
    }
  }) 
})