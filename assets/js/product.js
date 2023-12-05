document.addEventListener("DOMContentLoaded", function () {
    const arrProduct = JSON.parse(localStorage.getItem('productData'));
    const parameter = new URLSearchParams(window.location.search);
    const index = parameter.get("index");
    const product = arrProduct[index];
    displayProductDetails(product);
});


function displayProductDetails(product) {
    const productDetail = document.createElement("div");
    productDetail.className = "productDetails";

    const img = document.createElement("div");
    img.className = "imgPlace";

    product.images.forEach(image => {
        const imgEl = document.createElement("img");
        imgEl.src = image;
        img.appendChild(imgEl);
    });
    productDetail.appendChild(img);

    productDetail.innerHTML += `
        <h2>${product.title}</h2>
        <p class="color-666">Price: ${product.price}</p>
        <p class="color-666">Discount: ${product.discountPercentage}%</p>
        <p class="color-666">Category: ${product.category}</p>
        <p class="color-666">Stock: ${product.stock}</p>
        <p class="color-666">Description: ${product.description}</p>
        <button class="goBack font-poppins" onclick="goBack()">Go Back</button>
    `;
    productBox.appendChild(productDetail);
}


function goBack() {
    window.history.back();
}