let productMainContainer=document.getElementById('cart_main_container')
let cartStorage=localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[]
let emptyCartElement=document.getElementById('cart_empty')
let cartDetailElement=document.getElementById('cart_detail')
let mainContainerELement=document.getElementById('main_container')
let cartDetailQuantity=document.getElementById('cart_detail_quantity')
let cartDetailTotal=document.getElementById('cart_detail_total')

let cartQuantityElement=document.getElementById('cart_quantity')

function updateCartQuantity(){
  const cartStorage= localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): []
  
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
  let totalQuantity= 0
  let totalPrice=0
   cartStorage.forEach(prod =>{
      totalQuantity= totalQuantity + prod.quantity
      totalPrice= prod.descuento ? totalPrice + prod.price * prod.quantity * 0.8 : totalPrice + prod.price * prod.quantity
    })
    cartDetailQuantity.innerHTML=`Cantidad de items: ${totalQuantity}`
    cartDetailTotal.innerHTML=`Total: $${totalPrice}`
}
document.addEventListener('DOMContentLoaded', createShoppingCart(cartStorage), getCartDetail())

