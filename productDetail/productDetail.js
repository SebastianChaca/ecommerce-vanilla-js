const productDetail= localStorage.getItem('product-detail')? JSON.parse(localStorage.getItem('product-detail')):[]
const titleElement=document.getElementById('product_title')
const shortTitleElement=document.getElementById('product_shortTitle')
const priceElement=document.getElementById('product_price')
const imageElement=document.getElementById('product_image')
const descriptionElement=document.getElementById('product_description')
const rateElement=document.getElementById('product_rate')
const quantityElement=document.getElementById('product_quantity')
const totalPriceElement=document.getElementById('product_totalPRice')
const productCart=localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[]
const productQuantity= productCart.find( p => p.product.id == productDetail.id)

document.addEventListener('DOMContentLoaded', ()=>{
  
  titleElement.innerHTML=`${productDetail.title}`
  shortTitleElement.innerHTML=`${productDetail.shortDescription}`
  priceElement.innerHTML=`$${productDetail.price}`
  imageElement.src=`${productDetail.image ? productDetail.image.url : productDetail.imageFromDash}`
  descriptionElement.innerText=`${productDetail.description}`
  rateElement.src=`/Img/ratestar${productDetail.rate}.png`
  quantityElement.innerText=`${productQuantity ? productQuantity.quantity : 1}`
  totalPriceElement.innerText=`$${productQuantity? productQuantity.quantity * productDetail.price : productDetail.price  }`
})