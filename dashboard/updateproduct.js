function alert(){  
  let alertContainer=document.getElementById('alert')
  
  alertContainer.style.display='flex'
  let alertMsg=document.getElementById('alert_msg')
  alertMsg.innerHTML=`Producto editado`
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

async function updateProduct(data){
  starLoading()
  
 try {
  const response = await fetch(`http://localhost:1337/products/${selectedId}`,{
    method: 'PUT',
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


const productosStorage= JSON.parse(localStorage.getItem('productos-api'))
const selectedId=JSON.parse(localStorage.getItem('current-id'))
const selectedProduct= productosStorage.find( producto => producto.id === selectedId)
console.log(selectedProduct)
let nombre=document.getElementById('nombre')
nombre.value=selectedProduct.title
let precio=document.getElementById('precio')
precio.value=selectedProduct.price
let descripcion=document.getElementById('descripcion')
descripcion.value=selectedProduct.description
let stock=document.getElementById('stock')
stock.value=selectedProduct.stock
let categoria=document.getElementById('categoria')
categoria.value=selectedProduct.categoria
let shortDescription=document.getElementById('descritpionCorta')
shortDescription.value=selectedProduct.shortDescription
let descuento=document.getElementById('descuento')
descuento.checked=selectedProduct.descuento
let novedad=document.getElementById('novedad')
novedad.checked=selectedProduct.novedad
let rate=document.getElementById('rate')
rate.value=selectedProduct.rate
let img= document.getElementById('img-id')
img.src= selectedProduct.image ? selectedProduct.image.url : selectedProduct.imageFromDash
novedad.value=selectedProduct.novedad
descuento.value=selectedProduct.descuento

novedad.addEventListener('click',()=>{
 novedad.checked ? novedad.value = true : novedad.value=false
 
})
descuento.addEventListener('click',()=>{
  descuento.checked ? descuento.value = true : descuento.value=false 
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
    shortDescrition: shortDescription.value,
    novedad: novedad.value,
    descuento: descuento.value,}
  
 
  updateProduct(producto).then(()=>{
    // nombre.value=''
    // precio.value=''
    // descripcion.value=''
    // stock.value=''
    // rate.value=''
    // categoria.value=''
    // shortDescription.value=''
    // novedad.value=''
    // descuento.value=''
    // novedad.checked=false
    // descuento.checked=false
    alert()
  })
 
  
  
})