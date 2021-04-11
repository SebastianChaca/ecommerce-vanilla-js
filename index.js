async function getProducts() {
  const response = await fetch('http://localhost:1337/products');

  return response.json();
}

const p = getProducts();
console.log(p);
