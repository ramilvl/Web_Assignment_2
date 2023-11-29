fetch("https://dummyjson.com/products")
  .then((res) => res.json())

  .then((json) => {
    data = json.products;

    const containerDiv = document.getElementsByClassName("container")[0];

    data.forEach((product) => {

      let thumbnailEl = product.images.filter((link) =>
        link.includes("thumbnail")
      );
      thumbnailEl = thumbnailEl.length == 0 ? product.images[0] : thumbnailEl[0];

      const productsDiv = document.createElement("div");
      productsDiv.setAttribute("class", "products")

      productsDiv.innerHTML = `
                <img src="${thumbnailEl}" alt="${product.title}" />
                <h2>${product.title}</h2>
                <p class="color-666">Price: ${product.price}</p>
                <p class="color-666">Discount: ${product.discountPercentage}%</p>
                <p class="color-666">Category: ${product.category}</p>
                <p class="color-666">Stock: ${product.stock}</p>
            `;

        containerDiv.appendChild(productsDiv);
    });
})

.catch((err) => console.error("Error happened while fetching data:", err));
