function loadingStart() {
  let loading = document.getElementById('loading');
  let tableContainer= document.querySelector('.table_container')
  tableContainer.style.display='none'
  loading.className = 'loading';
}
function loadingFinish() {
  let loading = document.getElementById('loading');
  let tableContainer= document.querySelector('.table_container') 
  tableContainer.style.display='flex'
  loading.className = 'noLoading';
}

async function getProducts() {
  localStorage.removeItem('productos-api') 
  loadingStart();
  try {
    const response = await fetch('https://api-nucba.herokuapp.com/products');    
    return response.json();
  } catch (error) {
    console.log(error)    
    return error;
  }
}

function handleEdit(id){
  localStorage.setItem('current-id', JSON.stringify(id))
  window.location.href="dashboard/updateproduct.html"
}

function openModal(id){
  localStorage.removeItem('current-id')
  localStorage.setItem('current-id', JSON.stringify(id))
  let backModal=document.getElementById("myModal")
  backModal.style.display='block'
}
function closeModal(){
  localStorage.removeItem('current-id')
  const backModal=document.getElementById("myModal")
  backModal.style.display='none'
  
}
function alert(){  
  let alertContainer=document.getElementById('alert')
  alertContainer.style.display='flex'  
  let alertMsg=document.getElementById('alert_msg')
  alertMsg.innerHTML=`Producto eliminado`
  setTimeout(()=>{
    alertContainer.style.display='none'   

  },3000)
}
async function deleteProduct(id){  
  localStorage.removeItem('productos-api')
  loadingStart()  
  try {
    const response = await fetch(`https://api-nucba.herokuapp.com/products/${id}`,{
      method:'DELETE'
    });    
    return response.json();
  } catch (error) {
    console.log(error)    
    return error;
  }
}
function handleDelete(){
  const id= JSON.parse(localStorage.getItem('current-id')) 
  localStorage.removeItem('productos-api')
  deleteProduct(id).then( ()=> {
    let tbodyElement=document.getElementById('tbody')
    tbodyElement.innerHTML=''
    // loadingFinish()
    // let trElement=document.getElementById(r.id).remove()
  }).then(()=>getProducts()).then(r=> renderTable(r)).then(alert())
}
function renderTable(productos){
  loadingFinish();
  localStorage.setItem('productos-api', JSON.stringify(productos))
  let tbodyElement=document.getElementById('tbody')
  
  productos.forEach((producto, index) => {
    
    let trElement=document.createElement('tr')
    index %2 === 1 ? trElement.className='greyRow' : trElement.className=''
    trElement.id=producto.id
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
        <button onclick={handleEdit('${producto.id}')} class='edit'><img src='/Img/dashboard/editIcon.png' ></button>
        <button onclick={openModal('${producto.id}')}  class='delete'><img src='/Img/dashboard/deleteIcon.png' ></button>        
      </div>    
    </td>
    
  `
    tbodyElement.appendChild(trElement)    
  });
}
getProducts().then(r=> renderTable(r))
const closeBtn=document.querySelector('.close').onclick=()=>closeModal()
const noBtn=document.getElementById('noBtn').onclick=()=>closeModal()
const myModal=document.getElementById('myModal').onclick=()=>closeModal()
const deleteBtn=document.getElementById('siBtn').onclick=()=>handleDelete()
const span = document.getElementsByClassName("close")[0].onclick=()=>closeModal()




