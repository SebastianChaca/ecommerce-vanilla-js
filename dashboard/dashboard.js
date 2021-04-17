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




// const storage= localStorage.getItem('productos-api') ? JSON.parse(localStorage.getItem('productos-api')) : []
function handleEdit(id){
  console.log(id)
}
function handleDelete(id){
  console.log(id)
  let noBtn=document.querySelector('.noBtn')
  let modal = document.getElementById("myModal");
  let btn = document.getElementById("delete");
  let span = document.getElementsByClassName("close")[0];
  btn.onclick = function() {
    modal.style.display = "block";
  }
  noBtn.onclick=function() {
    modal.style.display = "none";
    }
  span.onclick = function() {
  modal.style.display = "none";
  }
  window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
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
        <button onclick={handleDelete('${producto.id}')}  id='delete'><img src='img/dashboard/deleteIcon.png' ></button>        
      </div>    
    </td>
    
  `
    tbodyElement.appendChild(trElement)    
  });
}
getProducts().then(r=> renderTable(r))




