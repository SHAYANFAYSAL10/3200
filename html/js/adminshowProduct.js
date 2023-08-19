const adminshowProduct = (data) => {
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="col-8 col-sm-6 col-md-4 col-lg-3">
    <div class="show-product card">
    <div class="product-card">
        <div class="product-image">
            <span class="discount-tag">${data.discount}% off</span>
            <img src="${data.images[0]}" class="product-thumb img-fluid mx-2" alt="">
            <button class="card-btn"><i class="fa-solid fa-2x fa-cart-shopping"></i></button>
        </div>
        <button class="edit-btn" onclick="openEditor('${data.id}')"><i class="fa-solid fa-pen"></i></button>
        <button class="delete" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="openDeletePopup('${data.id}')"><i class="fa-solid fa-trash-can"></i></button>
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

const openDeletePopup = (id) => {
    let deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteItem(id))
}

const deleteItem = (id) => {
    fetch('/delete-product', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        if(data=='success'){
            location.reload();
        }
        else {
            alert('some error happened')
        }
    })
}


let openEditor;

openEditor = (id) => {
    sessionStorage.tempProduct = JSON.stringify(id);
    location.href = `/addproduct/${id}`
}

// let showPro = document.querySelector('.show-product');

// showPro.addEventListener('click',()=>{

// })