let data;

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((json) => {
    data = json.products;
    showCategory(data);
    showProduct(data);
  });


function showCategory(products) {
  const categorySelect = document.getElementById("chooseCategory");

  const categories = [...new Set(products.map((product) => product.category))];

  categories.forEach((category) => {
    const option = document.createElement("option");

    option.value = category;
    option.textContent = category;
    
    categorySelect.appendChild(option);
  });
}

function showProduct(products) {
  const div_container = document.querySelector(".container");
  div_container.innerHTML = "";

  products.forEach((product, index) => {
    let thumbnailEl = product.images.filter((link) =>
      link.includes("thumbnail")
    );
    thumbnailEl = thumbnailEl.length == 0 ? product.images[0] : thumbnailEl[0];

    const productsDiv = document.createElement("div");
    productsDiv.setAttribute("class", "products");
    productsDiv.innerHTML = `
          <img src="${thumbnailEl}"/>
          <h2 class="font-poppins">${product .title}</h2>
          <p class="color-666 font-poppins">Price: ${product.price}</p>
          <p class="color-666 font-poppins">Discount: ${product.discountPercentage}%</p>
          <p class="color-666 font-poppins">Category: ${product.category}</p>
          <p class="color-666 font-poppins">Stock: ${product.stock}</p>
          <button class="btn-details" onclick="openProducts(${index})"><span class="color-white">Detail</span></button>
      `;

      div_container.appendChild(productsDiv);
  });
}

function filter() {
  const categorySelection = document.getElementById("chooseCategory").value;
  const result = data.filter((product)=>categorySelection == "" || product.category == categorySelection);
  showProduct(result);
}

function search() {
  const word = document.getElementById("searchProduct").value.toLowerCase();
  const result = data.filter((product) =>product.title.toLowerCase().includes(word) || product.description.toLowerCase().includes(word) ||
  product.category.toLowerCase().includes(word)
  );
  showProduct(result);
}

function openProducts(index) {
  const url = `product.html?index=${index}`;
  window.location.href = url;
}
