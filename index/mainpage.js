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

function alert(title){
  let alertContainer=document.getElementById('alert')
  alertContainer.style.display='flex'
  let alertMsg=document.getElementById('alert_msg')
  alertMsg.innerHTML=`${title} agregado al carrito`
  setTimeout(()=>{
    alertContainer.style.display='none'
  },3000)
}


function addToCart(id){
  const storage=JSON.parse(localStorage.getItem('productos-api'))
  const product= storage.find(p => p.id=== id)
  const cartStorage= localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): []
  const productValidation= cartStorage.find(p=> p.product.id == product.id)
 
  if (productValidation){
    const newCartStorage=cartStorage.map( p => {
      if(p.product.id == productValidation.product.id){
        return {...p, quantity: p.quantity + 1}
      }
      return p
    })    
    localStorage.setItem('cart', JSON.stringify(newCartStorage))    
  }else{
    cartStorage.push({product, quantity: 1})
    localStorage.setItem('cart', JSON.stringify(cartStorage))   
  }
  getCartQuantity()
  alert(product.title)  
}
function addToDetail(id){
  const productsStorage= localStorage.getItem('productos-api')? JSON.parse(localStorage.getItem('productos-api')):[]
  const productDetail= productsStorage.find(p => p.id == id)
  localStorage.setItem('product-detail', JSON.stringify(productDetail))
  window.location.href='/productdetail.html'
}

function createCard(product, gallery){     
  let divContainer = document.createElement('div');
  divContainer.className = 'content';    
  divContainer.innerHTML = `  
  <img src=${product.image ? product.image.url : product.imageFromDash ? product.imageFromDash : '/Img/notfound.png'} />
  <h3>${product.title}</h3>
  <p>${product.shortDescription}</p>
  <div class='star__container'>
      <img  src='/Img/ratestar${product.rate}.png'>
  </div>
  <hr />
  <div class="price_container">    
    <h6 class=${
      product.descuento ? 'price' : 'offPrice'
    }>$${product.price * 0.8}</h6>
    <h6 class=${product.descuento  ? 'crossedPrice' : 'price'}>$${
      product.price
    }</h6>
  </div>
  <div class="btns__card">
    <button class="btn__cart" onclick={addToCart('${product.id}')}>
      <img src="/Img/miniShopIcon.png" alt="shop icon" /> <p>AGREGAR</p> 
    </button>
    <button class="btn__detail" onclick={addToDetail('${product.id}')}>
      <img src="/Img/infoIcon.png" alt="detail icon" /><p>DETALLE</p>
    </button>
  </div>
  `; 
  
  gallery.appendChild(divContainer);
  
  
}
function loadingStart() {
  let loading = document.getElementById('loading');
  loading.className = 'loading';
}
function loadingFinish() {
  let loading = document.getElementById('loading');
  loading.className = 'noLoading';
}
function handleError(){
  let error=document.getElementById('error')
  error.className='error'
}
async function getProducts() {
  loadingStart();
  localStorage.removeItem('productos-api') 
  try {
    const response = await fetch('http://localhost:1337/products');
    
    return response.json();
  } catch (error) {
    loadingFinish();
    handleError()
    return error;
  }
}

function filterArray(products, type) {
  if (type === 'descuento') {
    const newArray = products.filter((product) => {
      return product.descuento === true;
    });
    
    return newArray;
  } else if (type === 'novedad') {
    const newArray = products.filter((product) => product.novedad === true);
    
    return newArray;
  } else {
    const newArray = products.filter((product) => product.categoria === type);
    return newArray;
  }
}
let open=false
function showMore(products, card, id){  
 
  if (!open){
    let titleContainer= document.getElementById('mostrarMas__Title')
    let imgContainer=document.getElementById(id +1)
    imgContainer.src='/Img/arrowUp.png'
    titleContainer.innerHTML='Mostrar Menos'
    products.slice(4,8).forEach((product) => {   
      createCard(product, card)
    });
    open=true
  }else{
    let titleContainer= document.getElementById('mostrarMas__Title')
    let imgContainer=document.getElementById(id + 1)
    imgContainer.src='/Img/arrowDown.png'
    titleContainer.innerHTML='Mostrar Mas'
    let cardsContainer=document.getElementById(id).getElementsByClassName("content")    
    while (cardsContainer.length > 0) {
      cardsContainer[0].parentNode.removeChild(cardsContainer[0]);
    }    
    products.slice(0,4).forEach((product) => {   
      createCard(product, card)
    });
    open=false
    
  }
  
}

function createProduct(products, id,titleContent) {
  let container = document.querySelector('.container');
  let cardContainer = document.createElement('div');
  cardContainer.id=id
  let card = document.createElement('div');  
  card.className = 'gallery';

  let title = document.createElement('div');
  title.className = 'titulo';
  title.innerHTML = `<h2>${titleContent}</h2>`;
 
  let seeMoreBtn = document.createElement('div');
  seeMoreBtn.className = 'btn__container';
  let btnMore = document.createElement('button');
  btnMore.onclick=()=> showMore(products, card, id)
  let imgId=id + 1
  btnMore.innerHTML = `
  <h4 id='mostrarMas__Title'>Mostrar más...</h4>
  <img id=${imgId} src="/Img/arrowDown.png" alt="" />
  `;
  seeMoreBtn.appendChild(btnMore);
  
  products.slice(0,4).forEach((product) => {   
    createCard(product, card, id)    
  });
  cardContainer.appendChild(title);
  cardContainer.appendChild(card);
  cardContainer.appendChild(seeMoreBtn);
  container.appendChild(cardContainer);
}
function createSections(r) {
  localStorage.setItem('productos-api', JSON.stringify(r))
  
  createProduct(
    filterArray(r, 'descuento'),
    'product__descuento',
    'Productos en descuento'
  ),
  createProduct(filterArray(r, 'novedad'),'product__novedad', 'Novedades');
  createProduct(filterArray(r, 'Whisky'),  'product__whiskys','Whikys');
  createProduct(filterArray(r, 'Puro'), 'product__puros','Puros');
}

getProducts().then((r) => createSections(r)).then(()=>loadingFinish());




