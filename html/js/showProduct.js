const showProduct = (data) => {
    //console.log(data);
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="col-8 col-sm-6 col-md-4 col-lg-3">
    <div class="show-product card" onclick="location.href = '/productDetails/${data.id}'">
    <div class="product-card">
        <div class="product-image">
            <span class="discount-tag">${data.discount}% off</span>
            <img src="${data.images[0]}" class="product-thumb img-fluid mx-2" alt="">
            <button class="card-btn"><i class="fa-solid fa-2x fa-cart-shopping"></i></button>
        </div>
        <div class="product-info card-body">
            <p class="product-brand brand1">${data.catagory}</p>
            <p class="product-name name1">${data.name}</p>
            <span class="price me-2">TK.${data.sellingPrice}</span><span class="actual-price">TK.${data.actualPrice}</span></br>
        </div>
    </div>
    </div>
    </div>
    `;
}