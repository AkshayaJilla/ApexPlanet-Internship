
const products = [

{
name:"Laptop",
category:"Electronics",
price:60000,
rating:5,
image:"laptop.jpg"
},

{
name:"Smart Phone",
category:"Electronics",
price:30000,
rating:4,
image:"phone.jpg"
},

{
name:"Headphones",
category:"Electronics",
price:2500,
rating:4,
image:"headphones.jpg"
},

{
name:"T-Shirt",
category:"Clothing",
price:700,
rating:3,
image:"t shirt.jpg"
},

{
name:"Shoes",
category:"Clothing",
price:2500,
rating:5,
image:"shoes.jpg"
},

{
name:"Watch",
category:"Accessories",
price:4500,
rating:4,
image:"watch.jpg"
},

{
name:"Backpack",
category:"Accessories",
price:1800,
rating:5,
image:"bag.jpg"
},
];


/* ======================================
   DISPLAY PRODUCTS
====================================== */

const productContainer =
document.getElementById("productContainer");


function displayProducts(data){

productContainer.innerHTML="";

if(data.length===0){

productContainer.innerHTML="<h3>No Products Found</h3>";

return;

}

data.forEach(product=>{

productContainer.innerHTML+=`

<div class="product-card">

<img src="${product.image}" alt="">

<div class="product-info">

<h3>${product.name}</h3>

<p>${product.category}</p>

<p class="price">₹${product.price}</p>

<p class="rating">
${"⭐".repeat(product.rating)}
</p>

</div>

</div>

`;

});

}


/* ======================================
   FILTERS
====================================== */

const search =
document.getElementById("search");

const categoryFilter =
document.getElementById("categoryFilter");

const ratingFilter =
document.getElementById("ratingFilter");

const sortOption =
document.getElementById("sortOption");


function filterProducts(){

let filtered=[...products];


// SEARCH

filtered=filtered.filter(product=>

product.name.toLowerCase().includes(

search.value.toLowerCase()

)

);


// CATEGORY

if(categoryFilter.value!="All"){

filtered=filtered.filter(product=>

product.category===categoryFilter.value

);

}


// RATING FILTER

if(ratingFilter.value!="0"){

filtered=filtered.filter(product=>

product.rating>=Number(ratingFilter.value)

);

}


// SORTING

switch(sortOption.value){

case "priceLow":

filtered.sort((a,b)=>a.price-b.price);

break;


case "priceHigh":

filtered.sort((a,b)=>b.price-a.price);

break;


case "rating":

filtered.sort((a,b)=>b.rating-a.rating);

break;

}


displayProducts(filtered);

}


search.addEventListener("input",filterProducts);

categoryFilter.addEventListener("change",filterProducts);

ratingFilter.addEventListener("change",filterProducts);

sortOption.addEventListener("change",filterProducts);


displayProducts(products);


/* ======================================
   TODO APP
====================================== */

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];


const taskInput=
document.getElementById("taskInput");

const addTask=
document.getElementById("addTask");

const taskList=
document.getElementById("taskList");


function saveTasks(){

localStorage.setItem(

"tasks",

JSON.stringify(tasks)

);

}


function renderTasks(){

taskList.innerHTML="";

tasks.forEach((task,index)=>{

const li=document.createElement("li");

li.innerHTML=`

<span class="${task.completed ? "completed":""}">

${task.text}

</span>

<div>

<button onclick="toggleTask(${index})">

✔

</button>

<button onclick="deleteTask(${index})">

❌

</button>

</div>

`;

taskList.appendChild(li);

});

}


addTask.addEventListener("click",()=>{

const text=taskInput.value.trim();

if(text===""){

alert("Enter a task");

return;

}

tasks.push({

text:text,

completed:false

});

taskInput.value="";

saveTasks();

renderTasks();

});


function deleteTask(index){

tasks.splice(index,1);

saveTasks();

renderTasks();

}


function toggleTask(index){

tasks[index].completed=

!tasks[index].completed;

saveTasks();

renderTasks();

}


renderTasks();


/* ======================================
   CONTACT FORM
====================================== */

const contactForm=
document.getElementById("contactForm");

contactForm.addEventListener("submit",

function(e){

e.preventDefault();

alert("Message Sent Successfully!");

contactForm.reset();

});


/* ======================================
   SCROLL TO TOP
====================================== */

const topBtn=
document.getElementById("topBtn");

window.onscroll=function(){

if(document.documentElement.scrollTop>300){

topBtn.style.display="block";

}

else{

topBtn.style.display="none";

}

};


topBtn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};