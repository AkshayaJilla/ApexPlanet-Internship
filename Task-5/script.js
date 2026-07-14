// script.js

// Display a welcome message when the page loads
window.addEventListener("load", () => {
    console.log("Welcome to My E-Commerce Store!");
});

// Highlight the active navigation link
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

// Smooth scrolling for the Products link
const productsLink = document.querySelector('a[href="#products"]');

if (productsLink) {
    productsLink.addEventListener("click", function (e) {
        e.preventDefault();

        const productsSection = document.getElementById("products");

        if (productsSection) {
            productsSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}