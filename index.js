
async function getAnswer(){
  setBtn('Chequeando respuesta...')
  const response = await fetch('http://localhost:1337/answers/607410055a0a2f4370d1003b');
 
  return response.json();
}
function setBtn(text){
  let button= document.getElementById('btn')
  button.innerHTML=text
}
function checkAnswer(r, password){
  
  if (password ===r.Answer){
    window.location.href="mainpage.html"
}else{
  setBtn('Respuesta incorrecta')
  setTimeout(()=>{
    setBtn('Entrar')
  },2000)
 }
}
document.getElementById('form').addEventListener('submit', (e)=>{
  e.preventDefault()
  const password= document.getElementById('password').value  
  getAnswer().then(r => checkAnswer(r, password))
 
})