const productDetail= localStorage.getItem('product-detail')? JSON.parse(localStorage.getItem('product-detail')):[]
const productCart=localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[]
const productQuantity= productCart.find( p => p.product.id == productDetail.id)
const titleElement=document.getElementById('product_title')
const shortTitleElement=document.getElementById('product_shortTitle')
const priceElement=document.getElementById('product_price')
const imageElement=document.getElementById('product_image')
const descriptionElement=document.getElementById('product_description')
const rateElement=document.getElementById('product_rate')
const quantityElement=document.getElementById('product_quantity')
const totalPriceElement=document.getElementById('product_totalPRice')
const righBtn=document.getElementById('rigthArrow')
const leftBtn=document.getElementById('leftArrow')
const addToCart=document.getElementById('addToCart')
let quantity=productQuantity ? productQuantity.quantity : 1
let totalPrice=productQuantity? productQuantity.quantity * productDetail.price : productDetail.price 
function sumarItem(){
  if (quantity < productDetail.stock ){
    quantity= quantity +1
    totalPrice= quantity * productDetail.price
    quantityElement.innerText=`${quantity}`
    totalPriceElement.innerText=`$${totalPrice }`
  }
}
function restarItem(){
  if(quantity > 1){
    quantity= quantity -1
    totalPrice= quantity * productDetail.price
    quantityElement.innerText=`${quantity}`
    totalPriceElement.innerText=`$${totalPrice }`
  }
}

righBtn.addEventListener('click', sumarItem)
leftBtn.addEventListener('click', restarItem)





document.addEventListener('DOMContentLoaded', ()=>{
  console.log(productDetail)  
  titleElement.innerHTML=`${productDetail.title}`
  shortTitleElement.innerHTML=`${productDetail.shortDescription}`
  priceElement.innerHTML=`$${productDetail.price}`
  imageElement.src=`${productDetail.image ? productDetail.image.url : productDetail.imageFromDash}`
  descriptionElement.innerText=`${productDetail.description}`
  rateElement.src=`/Img/ratestar${productDetail.rate}.png`
  quantityElement.innerText=`${quantity}`
  totalPriceElement.innerText=`$${totalPrice }`
})