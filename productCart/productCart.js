let productMainContainer=document.getElementById('cart_main_container')
let cartStorage=localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[]
let emptyCartElement=document.getElementById('cart_empty')
let cartDetailElement=document.getElementById('cart_detail')
let mainContainerELement=document.getElementById('main_container')
function deleteProduct(id){ 
  cartStorage.forEach( (p, index )=> {
    if(p.id === id){
      cartStorage.splice(index, 1)
    }
  })
  localStorage.setItem('cart', JSON.stringify(cartStorage))
  let cardsContainer=document.getElementById('cart_main_container').getElementsByClassName("cart_container")  
  while (cardsContainer.length > 0) {
    cardsContainer[0].parentNode.removeChild(cardsContainer[0]);
  }
  createShoppingCart(cartStorage)  
}

function createCart(data){
  let cartContainer=document.createElement('div')
  cartContainer.className='cart_container'
  cartContainer.innerHTML=`
    <div class='cart_image'>
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
      <p>$${data.price}</p>
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
document.addEventListener('DOMContentLoaded', createShoppingCart(cartStorage))

