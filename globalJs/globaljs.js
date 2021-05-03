let logOutBtn=document.getElementById('logoutBtn')
let userName=document.getElementById('username')
let hambugerBtn=document.getElementById('hamburger_btn')
let backdropModal=document.getElementById('backdrop')
let sidebar=document.getElementById('sidebar')
let closeSibarBtn=document.getElementById('btn_close')
let ingresarElement=document.getElementById('ingresar')
let navContainerElement=document.querySelector('.navbar__content')
function openSidebar(){
  backdropModal.className='backdrop'
  sidebar.className='sidebar show-sidebar'
}
function closeSibar(){
  backdropModal.className=''
  sidebar.className='sidebar'
}

function getUser(){
  const usernameStorage= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): ''
  if(usernameStorage.username){
    userName.innerHTML=`Bienvenido ${usernameStorage.username}`
    ingresarElement.style.display='none'
    logOutBtn.style.display='block'
    navContainerElement.style.gridTemplateColumns='120px 200px 200px 300px 200px'
  }else{
    userName.style.display='none'
    ingresarElement.style.display='flex'
  }

}

function getCartQuantity(){
  const cartStorage= localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): []
  let cartQuantityElement=document.getElementById('cart_quantity')
  if (cartStorage.length < 1){
    cartQuantityElement.innerHTML='0'
  }else{
    let totalQuantity= 0
    cartStorage.forEach(prod =>{
      totalQuantity= totalQuantity + prod.quantity
    })
    
    cartQuantityElement.innerHTML=`${totalQuantity}`
  }
}


document.addEventListener('DOMContentLoaded', getCartQuantity(), getUser())
hambugerBtn.addEventListener('click', ()=>openSidebar())
closeSibarBtn.addEventListener('click', ()=>closeSibar())
backdropModal.addEventListener('click', ()=>closeSibar())


logOutBtn.addEventListener('click', ()=>{
  localStorage.removeItem('user')
  logOutBtn.style.display='none'
  userName.style.display='none'
  ingresarElement.style.display='flex'
  navContainerElement.style.gridTemplateColumns='120px 200px 200px 200px'
})