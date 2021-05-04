let productMainContainer=document.getElementById('cart_main_container')
const cartStorage=localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[]

function delteProduct(id){
  console.log(id)
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
function createShoppingCart(data){
  data.forEach(product =>{
    createCart(product)
  })
}
document.addEventListener('DOMContentLoaded', createShoppingCart(cartStorage))

console.log(cartStorage)