const ordersApi= localStorage.getItem('orders-api') ? JSON.parse(localStorage.getItem('orders-api')) : []


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

function openModal(id){
  const getOrder= ordersApi.find( order => order.id == id)  
  let backModal=document.getElementById("myModal")
  let tbodyElement=document.getElementById('tbody-modal')
  backModal.style.display='block'
 console.log(getOrder)
  getOrder.items.forEach((order, index) => {
    
    let trElement=document.createElement('tr')
    index %2 == 1 ? trElement.className='greyRow' : trElement.className=''
    trElement.id=order.id
    trElement.innerHTML=`
    <th scope="row">${index +1}</th>
    <td >${order.title}</td>    
    <td >${order.descuento ? order.price *0.8 :order.price}</td>
    <td >${order.quantity}</td>
    <td >$ ${order.descuento ? order.price *0.8 * order.quantity :order.price * order.quantity}</td>     
  `
    tbodyElement.appendChild(trElement)    
  });

}
function closeModal(){
  let tbodyElement=document.getElementById('tbody-modal')
  const backModal=document.getElementById("myModal")
  backModal.style.display='none'
  tbodyElement.innerHTML=''
  
}

async function getOrders() {
  localStorage.removeItem('productos-api') 
  loadingStart();
  try {
    const response = await fetch('https://api-nucba.herokuapp.com/orders');    
    return response.json();
  } catch (error) {
    console.log(error)    
    return error;
  }
}

function renderTable(orders){
  loadingFinish();
  localStorage.setItem('orders-api', JSON.stringify(orders))
  let tbodyElement=document.getElementById('tbody')
  
  orders.forEach((order, index) => {
    
    let trElement=document.createElement('tr')
    index %2 === 1 ? trElement.className='greyRow' : trElement.className=''
    trElement.id=order.id
    trElement.innerHTML=`
    <th scope="row">${index +1}</th>
    <td >${order.user.email}</td>
    <td> <button class='items_btn' onclick={openModal('${order.id}')}>Ver items</button></td>
    <td >${order.createdAt.slice(0, 10)}</td>
    <td >$ ${order.total}</td>    
  `
    tbodyElement.appendChild(trElement)    
  });
}

getOrders().then(r=> renderTable(r))
const closeBtn=document.querySelector('.close').onclick=()=>closeModal()
const noBtn=document.getElementById('noBtn').onclick=()=>closeModal()
const myModal=document.getElementById('myModal').onclick=()=>closeModal()

const span = document.getElementsByClassName("close")[0].onclick=()=>closeModal()