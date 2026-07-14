import { products } from "./products.js";
import { addToCart } from "./cart.js";

const productContainer = document.getElementById("products");

function displayProducts(items){

productContainer.innerHTML="";

items.forEach(product=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<button>Add to Cart</button>

`;

card.querySelector("button").addEventListener("click",()=>{

addToCart(product);

});

productContainer.appendChild(card);

});

}

displayProducts(products);

const search=document.getElementById("search");

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

const filtered=products.filter(product=>

product.name.toLowerCase().includes(value)

);

displayProducts(filtered);

});
