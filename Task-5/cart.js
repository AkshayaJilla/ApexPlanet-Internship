let cart = [];

export function addToCart(product){

cart.push(product);

document.getElementById("cart-count").innerText = cart.length;

alert(product.name + " added to cart");

}

export function getCart(){

return cart;

}