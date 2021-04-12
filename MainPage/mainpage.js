

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
    console.log('novedad' + newArray)
    return newArray;
  } else {
    const newArray = products.filter((product) => product.categoria === type);
    return newArray;
  }
}
function showMore(){
  
  let show=document.getElementById('show')
    if (show.className=== 'showNone'){
      show.className='showMore'
    }else{
      show.className='showNone'
    }
  
}
function createProduct(products, id, titleContent) {
  let container = document.querySelector('.container');
  let galleryContainer = document.createElement('div');

  let gallery = document.createElement('div');
  gallery.id = id;
  gallery.className = 'gallery';

  let title = document.createElement('div');
  title.className = 'titulo';
  title.innerHTML = `
  <h2>${titleContent}</h2>
  `;
 
  let seeMoreBtn = document.createElement('div');
  seeMoreBtn.className = 'btn__container';
  let btnMore = document.createElement('button');
  btnMore.onclick=()=>{ showMore()}
  btnMore.innerHTML = `
  <h4>Mostrar más...</h4>
  <img src="/Img/arrowDown.png" alt="" />
  `;
  seeMoreBtn.appendChild(btnMore);

  
  products.forEach((product, index) => {
    const priceDiscount = product.price * 0.8;
    let divContainer = document.createElement('div');
    divContainer.className = `${index >3 ? 'content showNone':'content'}`;
    divContainer.id=`${index >3 ? 'show':''}`;
    divContainer.innerHTML = `
    <img src=${product.image[0].url} />
    <h3>${product.title}</h3>
    <p>${product.shortDescription}</p>
    <hr />
    <div class="price_container">    
    <h6 class=${
      id === 'product_discount' ? 'price' : 'offPrice'
    }>$${priceDiscount}</h6>
    <h6 class=${id === 'product_discount' ? 'crossedPrice' : 'price'}>$${
      product.price
    }</h6>
    </div>
    <div class="btns__card">
    <button class="btn__cart">
      <img src="/Img/miniShopIcon.png" alt="" /> <p>AGREGAR</p> 
    </button>
    <button class="btn__detail">
      <img src="/Img/infoIcon.png" alt="" /><p>DETALLE</p>
    </button>
  </div>
    `;

    gallery.appendChild(divContainer);
  });
  galleryContainer.appendChild(title);
  galleryContainer.appendChild(gallery);
  galleryContainer.appendChild(seeMoreBtn);
  container.appendChild(galleryContainer);
}
function createSections(r) {
  loadingFinish();
  createProduct(
    filterArray(r, 'descuento'),
    'product_discount',
    'Productos en descuento'
  ),
  createProduct(filterArray(r, 'novedad'), 'product_novedad', 'Novedades');
  createProduct(filterArray(r, 'Whisky'), 'product_category', 'Whikys');
  createProduct(filterArray(r, 'Puro'), 'product_puros', 'Puros');
}
getProducts().then((r) => console.log(r));
getProducts().then((r) => createSections(r));




