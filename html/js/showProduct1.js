const showProduct = (data) => {
    console.log(data);
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class=" col">
    <div class="show-product card" style="width: 19rem;margin-bottom: 10px">
    <div class="product-card">
        <div class="product-image">
            <span class="discount-tag">${data.discount}% off</span>
            <img src="${data.images[0]}" class="product-thumb mx-2" alt="">
            <button class="card-btn" onclick="location.href = '/productDetails/${data.id}'">add to wishlist</button>
        </div>
        <div class="product-info">
            <h2 class="product-brand">${data.catagory}</h2>
            <p class="product-name">${data.name}</p>
            <span class="price me-2">TK.${data.sellingPrice}</span><span class="actual-price">TK.${data.actualPrice}</span></br>
        </div>
    </div>
    </div>
    </div>
    `;
}