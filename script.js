let ownerNumber = "919999999999"; // change business owner number here

// Scroll
function scrollToSection(id){
    document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

// Dark Mode
function toggleDarkMode(){
    document.body.classList.toggle("dark-mode");
}

// Save products in localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

function showProducts(list){
    let container = document.getElementById("productList");
    container.innerHTML = "";

    list.forEach((p,index) => {
        container.innerHTML += `
        <div class="card">
            <h3>${p.name}</h3>
            <p><b>Owner:</b> ${p.owner}</p>
            <p><b>Price:</b> ₹${p.price}</p>
            <p><b>Category:</b> ${p.category}</p>
            <p>${p.desc}</p>
            <button onclick="autoFillOrder('${p.name}')">Order Now</button>
        </div>
        `;
    });
}

showProducts(products);

// Add Product Form
document.getElementById("productForm").addEventListener("submit", function(e){
    e.preventDefault();

    let newProduct = {
        owner: document.getElementById("owner").value,
        name: document.getElementById("pname").value,
        price: document.getElementById("price").value,
        category: document.getElementById("category").value,
        desc: document.getElementById("desc").value
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("successMsg").innerHTML = "✅ Product Added Successfully!";
    document.getElementById("successMsg").style.color = "green";

    document.getElementById("productForm").reset();
    showProducts(products);
});

// Auto Fill order form
function autoFillOrder(productName){
    document.getElementById("cproduct").value = productName;
    scrollToSection("contact");
}

// Search & Filter
document.getElementById("search").addEventListener("input", filterProducts);
document.getElementById("filterCategory").addEventListener("change", filterProducts);

function filterProducts(){
    let text = document.getElementById("search").value.toLowerCase();
    let category = document.getElementById("filterCategory").value;

    let filtered = products.filter(p => {
        let matchName = p.name.toLowerCase().includes(text);
        let matchCat = (category === "All" || p.category === category);
        return matchName && matchCat;
    });

    showProducts(filtered);
}

// WhatsApp Order Send
function sendWhatsApp(event){
    event.preventDefault();

    let name = document.getElementById("cname").value;
    let mobile = document.getElementById("cmobile").value;
    let product = document.getElementById("cproduct").value;
    let qty = document.getElementById("cqty").value;
    let address = document.getElementById("caddress").value;

    let msg = `Hello, I want to order:%0AName: ${name}%0AMobile: ${mobile}%0AProduct: ${product}%0AQuantity: ${qty}%0AAddress: ${address}`;

    window.open(`https://wa.me/${ownerNumber}?text=${msg}`, "_blank");
}