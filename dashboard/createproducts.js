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
}

async function createProduct(data){
  starLoading()
 try {
  const response = await fetch('http://localhost:1337/products',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    
    },
    body: JSON.stringify(data)
  })
  stopLoading()
  return response.json()
 } catch (error) {
   stopLoading()
  console.log(error)
 }
}

let nombre=document.getElementById('nombre')
let precio=document.getElementById('precio')
let descripcion=document.getElementById('descripcion')
let stock=document.getElementById('stock')
let categoria=document.getElementById('categoria')
let shorDescription=document.getElementById('descritpionCorta')
let descuento=document.getElementById('descuento')
let novedad=document.getElementById('novedad')
let rate=document.getElementById('rate')
let image=document.getElementById('file')
novedad.value=false
descuento.value=false

novedad.addEventListener('click',()=>{
 novedad.checked ? novedad.value = true : novedad.value=false
 
})
descuento.addEventListener('click',()=>{
  descuento.checked ? descuento.value = true :descuento.value=false 
 })

 document.querySelector('#form').addEventListener('submit', (e)=>{
 
  e.preventDefault()
  const producto={
    title: nombre.value,
    price: precio.value,
    description: descripcion.value,
    stock: stock.value,
    rate: rate.value,
    categoria: categoria.value,
    shortDescrition: shorDescription.value,
    novedad: novedad.value,
    descuento: descuento.value,}
    
  createProduct(producto).then(()=>{
    nombre.value=''
    precio.value=''
    descripcion.value=''
    stock.value=''
    rate.value=''
    categoria.value=''
    shorDescription.value=''
    novedad.value=''
    descuento.value=''
    novedad.checked=false
    descuento.checked=false
    alert()
  })
 
  
  
})