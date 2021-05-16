function alert(){  
  let alertContainer=document.getElementById('alert')
  alertContainer.style.display='flex'  
  let alertMsg=document.getElementById('alert_msg')
  alertMsg.innerHTML=`Producto creado`
  setTimeout(()=>{
    alertContainer.style.display='none'   

  },3000)
}

function starLoading(){
  let btnElement= document.getElementById('btn')
  btnElement.style.backgroundColor='rgb(190, 203, 226)'
  btnElement.disabled=true
  let imgElement=document.createElement('img')
  imgElement.id='imgBtn'
  imgElement.src='../Img/dashboard/loading.gif'
  btnElement.innerHTML=''
  btnElement.appendChild(imgElement)
}
function stopLoading(){
  let btnElement= document.getElementById('btn')
  let btnImage=document.getElementById('imgBtn')
  btnElement.removeChild(btnImage)
  btnElement.innerHTML='Crear'
  btnElement.disabled=false
  btnElement.style.backgroundColor='rgb(11,49,104)'
}
async function createSection(data){
  starLoading()
  try {
   const response = await fetch('http://localhost:1337/sections',{
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     
     },
     body: JSON.stringify(data)
   })
   
   return response.json()
  } catch (error) {
    
   console.log(error)
  }
 }

 const tituloElement= document.getElementById('titulo')
 const categoriaElement=document.getElementById('categoria')


 document.querySelector('#form').addEventListener('submit', (e)=>{
 
  e.preventDefault()
  const section={
    titulo:tituloElement.value,
    categoria:categoriaElement.value
  }
  createSection(section).then(()=> stopLoading()).then(()=>{
    tituloElement.value=''
    categoriaElement.value=''

  })
  

})