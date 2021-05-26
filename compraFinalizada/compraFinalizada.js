const order = localStorage.getItem('product-order') ? JSON.parse(localStorage.getItem('product-order')) : []
let productMainContainer=document.getElementById('cart_main_container_order')
let compraFinalizadaElement=document.getElementById('compra_exitosa')
function createOrder(data){
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
    </div>
 `
  productMainContainer.appendChild(cartContainer)
}

function createOrderList(data){
 if (data.length > 0){
   data.forEach(product =>{
     createOrder(product)
   })

 }else{
   compraFinalizadaElement.innerHTML='Se produjo un error'
 }
 
}

document.addEventListener('DOMContentLoaded', createOrderList(order))