function loadingStart() {
  let loading = document.getElementById('loading');
  let tableContainer= document.querySelector('.table_container')
  let sidebar= document.querySelector('.sidebar')
  sidebar.style.height='100vh'
  tableContainer.style.display='none'
  loading.className = 'loading';
}
function loadingFinish() {
  let loading = document.getElementById('loading');
  let tableContainer= document.querySelector('.table_container')
  let sidebar= document.querySelector('.sidebar')
  sidebar.style.height=''
  tableContainer.style.display='flex'
  loading.className = 'noLoading';
}
function handleError(){
  let error=document.getElementById('error')
  error.className='error'
}
async function getProducts() {
  localStorage.removeItem('productos-api') 
  loadingStart();
  try {
    const response = await fetch('http://localhost:1337/products');    
    return response.json();
  } catch (error) {
    
    handleError()
    return error;
  }
}



// let formElement=document.getElementById('form')


// let nombre=document.getElementById('nombre')
// let precio=document.getElementById('precio')
// let descripcion=document.getElementById('descripcion')
// let stock=document.getElementById('stock')
// let categoria=document.getElementById('categoria')
// let shorDescription=document.getElementById('descritpionCorta')
// let descuento=document.getElementById('descuento')
// let novedad=document.getElementById('novedad')
// let rate=document.getElementById('rate')

// novedad.value=false
// descuento.value=false

// novedad.addEventListener('click',()=>{
//  novedad.checked ? novedad.value = true : novedad.value=false
 
// })
// descuento.addEventListener('click',()=>{
//   descuento.checked ? descuento.value = true :descuento.value=false 
//  })



// const storage= localStorage.getItem('productos-api') ? JSON.parse(localStorage.getItem('productos-api')) : []
function handleEdit(id){
  console.log(id)
}
function renderTable(productos){
  loadingFinish();
  localStorage.setItem('productos-api', JSON.stringify(productos))
  let tbodyElement=document.getElementById('tbody')
  
  productos.forEach((producto, index) => {
    
    let trElement=document.createElement('tr')
    index %2 === 1 ? trElement.className='greyRow' : trElement.className=''
    trElement.innerHTML=`
    <th scope="row">${index +1}</th>
    <td >${producto.title}</td>
    <td>${producto.price}</td>
    <td>${producto.stock}</td>
    <td>${producto.categoria}</td>
    <td>${producto.rate}</td>
    <td>${producto.novedad}</td>
    <td>${producto.descuento}</td>
    <td> 
      <div class='icons_container'>
        <button onclick={handleEdit('${producto.id}')} id='edit'><img src='img/dashboard/editIcon.png' ></button>
        <button id='delete'><img src='img/dashboard/deleteIcon.png' ></button>        
      </div>    
    </td>
    
  `
    tbodyElement.appendChild(trElement)    
  });
}
getProducts().then(r=> renderTable(r))

// document.querySelector('#form').addEventListener('submit', (e)=>{
//   e.preventDefault()
//   const producto={
//     nombre: nombre.value,
//     precio: precio.value,
//     descripcion: descripcion.value,
//     stock: stock.value,
//     rate: rate.value,
//     categoria: categoria.value,
//     descripcionCorta: shorDescription.value,
//     novedad: novedad.value,
//     descuento: descuento.value
//   }
  
//   storage.push(producto)
//   localStorage.setItem('productos', JSON.stringify(storage))
//   nombre.value=''
//   precio.value=''
//   descripcion.value=''
//   stock.value=''
//   rate.value=''
//   categoria.value=''
//   shorDescription.value=''
//   novedad.value=''
//   descuento.value=''
  
  
//   renderTable([producto])
  
// })


