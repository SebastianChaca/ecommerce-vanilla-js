let cartStorage=localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[]
let userStorage=localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):[]
let productMainContainer=document.getElementById('cart_main_container')
let emptyCartElement=document.getElementById('cart_empty')
let cartDetailElement=document.getElementById('cart_detail')
let mainContainerELement=document.getElementById('main_container')
let cartDetailQuantity=document.getElementById('cart_detail_quantity')
let cartDetailTotal=document.getElementById('cart_detail_total')
let cartQuantityElement=document.getElementById('cart_quantity')
let comprarBtnElement=document.getElementById('comprar_btn')

function starLoading(){  
  comprarBtnElement.style.backgroundColor='rgb(190, 203, 226)'
  comprarBtnElement.disabled=true
  let imgElement=document.createElement('img')
  imgElement.id='imgBtn'
  imgElement.src='../Img/dashboard/loading.gif'
  comprarBtnElement.innerHTML=''
  comprarBtnElement.appendChild(imgElement)
}

function stopLoading(){
 
  let btnImage=document.getElementById('imgBtn')
  comprarBtnElement.removeChild(btnImage)
  comprarBtnElement.innerHTML='Comprar'
  comprarBtnElement.disabled=false
  comprarBtnElement.style.backgroundColor='rgb(49, 81, 186)'
}



function getCartTotalQuantity(cart){
  let totalQuantity= 0
    cart.forEach(prod =>{
      totalQuantity= totalQuantity + prod.quantity
    })
    return totalQuantity
}
function getCartTotalPrice(cart){
  let totalPrice=0
  cart.forEach(prod =>{      
      totalPrice= prod.descuento ? totalPrice + prod.price * prod.quantity * 0.8 : totalPrice + prod.price * prod.quantity
  })
  return totalPrice
}
function clearCart(){
  localStorage.removeItem('cart')
}
function updateCartQuantity(){
  const cartStorage= localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): []
  
  if (cartStorage.length < 1){
    cartQuantityElement.innerHTML='0'
  }else{    
    cartQuantityElement.innerHTML=`${getCartTotalQuantity(cartStorage)}`
  }
}

function deleteProduct(id){ 
  cartStorage.forEach( (p, index )=> {
    if(p.id === id){
      cartStorage.splice(index, 1)
    }
  })
  localStorage.setItem('cart', JSON.stringify(cartStorage))
  let card= document.getElementById(id)
  card.remove()
  getCartDetail()
  updateCartQuantity()
  if( cartStorage.length === 0){
    checkEmptyCart()
  }
  
}

function createCart(data){
  let cartContainer=document.createElement('div')
  cartContainer.className='cart_container'
  cartContainer.id=data.id
  cartContainer.innerHTML=`
    <div class='cart_image' >
      <img src=${data.image ? data.image.url : data.imageFromDash} alt="product">
    </div>  
    <div class='cart_title'>
      <h4>
        ${data.title}
      </h4>
      <p>
        ${data.shortDescription}
      </p>
    </div>
    <div class='cart_quantity'>
      <p>${data.quantity}</p>
    </div>
    <div class='cart_price'>
      <p>$${data.descuento ? data.price * 0.8 : data.price}</p>
    </div>
    <div class='cart_remove'>
    <button onclick={deleteProduct('${data.id}')}>
      <img src="./Img/dashboard/deleteIcon.png" alt="delete">
    </button>
    </div>
 `
  productMainContainer.appendChild(cartContainer)
}
function checkEmptyCart(){
  emptyCartElement.style.display='block'
  cartDetailElement.style.display='none'
  mainContainerELement.style.display='none'
  
}
function createShoppingCart(data){
  if(cartStorage.length > 0){
    data.forEach(product =>{
      createCart(product)
    })
  }else{
    checkEmptyCart()
  }
}
function getCartDetail(){  
    cartDetailQuantity.innerHTML=`Cantidad de items: ${getCartTotalQuantity(cartStorage)}`
    cartDetailTotal.innerHTML=`Total: $${ getCartTotalPrice(cartStorage)}`
}
function cleanCart(cart){
  const items= cart.map( cart =>{     
    delete cart.description    
    delete cart.rate
    delete cart.novedad
    delete cart.__v
    if (cart.descuento){
      parseInt(cart.price) * 0.8
    }
    return cart
  })
  return items
}
const updateStock=(cart) => {   
 cart.forEach(async product => {
    
    let Stock= parseInt(product.stock) - product.quantity
    console.log(product)
      const response =await fetch(`https://api-nucba.herokuapp.com/products/${product.id}`,{
        method:'PUT',
        body:JSON.stringify({stock: Stock}),
        headers: {
          'Content-Type': 'application/json'        
        }      
    })  
    return response.json()        
  })       
}
async function createOrder(items, total, token){
  starLoading()
  try {
    const response = await fetch('https://api-nucba.herokuapp.com/orders',{
      method:'POST',
      headers:{
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({items, total})
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
function orderInStorage(cart){
  localStorage.removeItem('product-order')
  localStorage.setItem('product-order', JSON.stringify(cart))
}

document.addEventListener('DOMContentLoaded', createShoppingCart(cartStorage), getCartDetail())
comprarBtnElement.addEventListener('click', ()=>{
  const items= cleanCart(cartStorage)
  const total= getCartTotalPrice(cartStorage)
 
  createOrder(items, total, userStorage.token)
    .then(()=>updateStock(cartStorage))
    .then(()=>orderInStorage(cartStorage))
    .then(()=> clearCart())
    .then(()=>stopLoading())
    .then(()=> window.location.href='/comprafinalizada.html')
  
})
