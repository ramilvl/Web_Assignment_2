let data;

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((json) => {
    data = json.products;
    showCategory(data);
    displayProducts(data);
  })
  .catch((err) => console.error("Error happened while fetching data:", err));


function showCategory(products) {
  const categorySelect = document.getElementById("categoryFilter");

  const categories = [...new Set(products.map(product => product.category))];

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}
function filterCategory() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  const filteredProducts = data.filter(
    (product) =>
      (selectedCategory === "" || product.category === selectedCategory) &&
      (product.title.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword))
  );

  displayProducts(filteredProducts);
}

function displayProducts(products) {
  const containerDiv = document.querySelector(".container");
  containerDiv.innerHTML = "";

  products.forEach((product) => {
    let thumbnailEl = product.images.filter((link) =>
      link.includes("thumbnail")
    );
    thumbnailEl = thumbnailEl.length == 0 ? product.images[0] : thumbnailEl[0];

    const productsDiv = document.createElement("div");
    productsDiv.setAttribute("class", "products");
    productsDiv.innerHTML = `
                    <img src="${thumbnailEl}" alt="${product.title}" />
                    <h2>${product.title}</h2>
                    <p class="color-666">Price: ${product.price}</p>
                    <p class="color-666">Discount: ${product.discountPercentage}%</p>
                    <p class="color-666">Category: ${product.category}</p>
                    <p class="color-666">Stock: ${product.stock}</p>
                    <button>More Details</button>
                `;

    containerDiv.appendChild(productsDiv);
  });
}

function search() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const filteredProducts = data.filter(
    (product) =>
      product.title.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
  );

  displayProducts(filteredProducts);
}
