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

async function getSections(){
  loadingStart()
  try {
    const response = await fetch('http://localhost:1337/sections')
    return response.json();
  } catch (error) {
    loadingFinish();
    handleError()
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

function renderTable(sections){
 
  localStorage.setItem('productos-sections', JSON.stringify(sections))
  let tbodyElement=document.getElementById('tbody')
  
  sections.forEach((section, index) => {
    
    let trElement=document.createElement('tr')
    index %2 === 1 ? trElement.className='greyRow' : trElement.className=''
    trElement.id=section.id
    trElement.innerHTML=`
    <th scope="row">${index +1}</th>
    <td >${section.Titulo}</td>
    <td>${section.Categoria}</td>
   
    <td> 
      <div class='icons_container'>
        <button onclick={handleEdit('${section.id}')} class='edit'><img src='/Img/dashboard/editIcon.png' ></button>
        <button onclick={openModal('${section.id}')}  class='delete'><img src='/Img/dashboard/deleteIcon.png' ></button>        
      </div>    
    </td>
    
  `
    tbodyElement.appendChild(trElement)    
  });
}


getSections().then((r)=>renderTable(r)).then(()=> loadingFinish())

