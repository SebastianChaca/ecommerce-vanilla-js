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
  localStorage.removeItem('productos-sections')
  loadingStart()
  try {
    const response = await fetch('https://api-nucba.herokuapp.com/sections')
    return response.json();
  } catch (error) {
    loadingFinish();
    handleError()
    return error;
  }
}
async function deleteSection(id){  
  localStorage.removeItem('productos-section')
  loadingStart()  
  try {
    const response = await fetch(`https://api-nucba.herokuapp.com/sections/${id}`,{
      method:'DELETE'
    });    
    return response.json();
  } catch (error) {
    console.log(error)    
    return error;
  }
}
function handleEdit(id){
  localStorage.setItem('current-id', JSON.stringify(id))
  window.location.href="/dashboard/updatesection.html"
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
function handleDelete(){
  const id= JSON.parse(localStorage.getItem('current-id')) 
  localStorage.removeItem('productos-api')
  deleteSection(id).then( ()=> {
    let tbodyElement=document.getElementById('tbody')
    tbodyElement.innerHTML=''
    // loadingFinish()
    // let trElement=document.getElementById(r.id).remove()
  }).then(()=>getSections()).then(r=> renderTable(r)).then(()=>loadingFinish()).then(alert())
}
function renderTable(sections){
  console.log(sections)
  localStorage.setItem('productos-sections', JSON.stringify(sections))
  let tbodyElement=document.getElementById('tbody')
  
  sections.forEach((section, index) => {
    
    let trElement=document.createElement('tr')
    index %2 === 1 ? trElement.className='greyRow' : trElement.className=''
    trElement.id=section.id
    trElement.innerHTML=`
    <th scope="row">${index +1}</th>
    <td >${section.titulo}</td>
    <td>${section.categoria}</td>
   
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
const closeBtn=document.querySelector('.close').onclick=()=>closeModal()
const noBtn=document.getElementById('noBtn').onclick=()=>closeModal()
const myModal=document.getElementById('myModal').onclick=()=>closeModal()
const deleteBtn=document.getElementById('siBtn').onclick=()=>handleDelete()
const span = document.getElementsByClassName("close")[0].onclick=()=>closeModal()
