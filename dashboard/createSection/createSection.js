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
   const response = await fetch('https://api-nucba.herokuapp.com/sections',{
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
 const getOptions = (data) => {
  const options = data.map(cat => {
      return cat.categoria;
    } 
  );
  const uniqueOptions = Array.from(new Set(options));
  uniqueOptions.push('descuento')
  return uniqueOptions;
};
const productsStorage=JSON.parse(localStorage.getItem('productos-api'))
 const tituloElement= document.getElementById('titulo')

 const categoriasSelect= document.getElementById('categorias')

 document.querySelector('#form').addEventListener('submit', (e)=>{
 
  e.preventDefault()
  const section={
    titulo:tituloElement.value,
    categoria:categoriasSelect.value
  }
  createSection(section).then(()=> stopLoading()).then(()=>{
    tituloElement.value=''
    

  })
  

})

document.addEventListener('DOMContentLoaded', ()=>{
  const options=getOptions(productsStorage)
  

  options.map(option=>{
   const selectElement=document.createElement('option')
   selectElement.value=option
   selectElement.innerHTML=option
   categoriasSelect.appendChild(selectElement)
  })

})