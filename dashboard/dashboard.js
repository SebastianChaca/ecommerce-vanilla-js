// let formElement=document.getElementById('form')


let nombre=document.getElementById('nombre')
let precio=document.getElementById('precio')
let descripcion=document.getElementById('descripcion')
let stock=document.getElementById('stock')
let categoria=document.getElementById('categoria')
let shorDescription=document.getElementById('descritpionCorta')
let descuento=document.getElementById('descuento')
let novedad=document.getElementById('novedad')
let rate=document.getElementById('rate')

novedad.value=false
descuento.value=false

novedad.addEventListener('click',()=>{
 novedad.checked ? novedad.value = true : novedad.value=false
 
})
descuento.addEventListener('click',()=>{
  descuento.checked ? descuento.value = true :descuento.value=false 
 })



const storage= localStorage.getItem('productos') ? JSON.parse(localStorage.getItem('productos')) : []
function renderTable(storage){
  let tbodyElement=document.getElementById('tbody')
  
  storage.forEach(producto => {
    
   
    
    let trElement=document.createElement('tr')
    trElement.innerHTML=`
    <th scope="row">1</th>
    <td>${producto.nombre}</td>
    <td>${producto.precio}</td>
    <td>${producto.stock}</td>
    <td><button>Editar</button></td>
    <td><button>Eliminar</button></td>
  `
    tbodyElement.appendChild(trElement)
    
    
    
  });
}
document.addEventListener('DOMContentLoaded', renderTable(storage) )

document.querySelector('#form').addEventListener('submit', (e)=>{
  e.preventDefault()
  const producto={
    nombre: nombre.value,
    precio: precio.value,
    descripcion: descripcion.value,
    stock: stock.value,
    rate: rate.value,
    categoria: categoria.value,
    descripcionCorta: shorDescription.value,
    novedad: novedad.value,
    descuento: descuento.value
  }
  
  storage.push(producto)
  localStorage.setItem('productos', JSON.stringify(storage))
  nombre.value=''
  precio.value=''
  descripcion.value=''
  stock.value=''
  rate.value=''
  categoria.value=''
  shorDescription.value=''
  novedad.value=''
  descuento.value=''
  
  
  renderTable([producto])
  
})


