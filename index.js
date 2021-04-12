
async function getAnswer(){
  setBtn('Chequeando respuesta...')
  const response = await fetch('http://localhost:1337/products/6073e670c8f1670d707b605b');
  return response.json();
}
function setBtn(text){
  let button= document.getElementById('btn')
  button.innerHTML=text
}
function checkAnswer(r, password){
  
  if (password ===r.shortDescription ){
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