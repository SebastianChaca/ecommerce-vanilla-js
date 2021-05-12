let logOutBtn=document.getElementById('logoutBtn')
let userName=document.getElementById('username')
let hambugerBtn=document.getElementById('hamburger_btn')
let backdropModal=document.getElementById('backdrop')
let sidebar=document.getElementById('sidebar')
let closeSibarBtn=document.getElementById('btn_close')
let ingresarElement=document.getElementById('ingresar')
let navContainerElement=document.querySelector('.navbar__content')
let cartBtn=document.getElementById('nav_btn')
let logOutSidebar=document.getElementById('li_logout')
let loginSidebar=document.getElementById('login_sidebar')
let logOutBtnSidebar=document.getElementById('logout_sidebar')
let btnComprarDetail=document.getElementById('comprar_btn')
let loginDetail=document.getElementById('login_detail')
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
    loginSidebar.style.display='none'
    logOutSidebar.style.display='block'
    btnComprarDetail.style.display='block'
    loginDetail.style.display='none'
    
  }else{
    userName.style.display='none'
    ingresarElement.style.display='flex'
    loginSidebar.style.display='flex'
    logOutSidebar.style.display='none'
    navContainerElement.style.gridTemplateColumns='120px 200px 200px 200px'
    btnComprarDetail.style.display='none'
    loginDetail.style.display='block'
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
function logOut(){
  localStorage.removeItem('user')
  logOutBtn.style.display='none'
  userName.style.display='none'
  ingresarElement.style.display='flex'
  logOutSidebar.style.display='none'
  loginSidebar.style.display='flex'
  navContainerElement.style.gridTemplateColumns='120px 200px 200px 200px'
}

cartBtn.addEventListener('click', ()=>{
  window.location.href='/productcart.html'
})

document.addEventListener('DOMContentLoaded', getCartQuantity(), getUser())
hambugerBtn.addEventListener('click', ()=>openSidebar())
closeSibarBtn.addEventListener('click', ()=>closeSibar())
backdropModal.addEventListener('click', ()=>closeSibar())

logOutBtnSidebar.addEventListener('click', ()=>logOut())
logOutBtn.addEventListener('click', ()=>logOut())