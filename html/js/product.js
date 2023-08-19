const productImages = document.querySelectorAll(".product-images img");
const productImageSlide = document.querySelector(".image-slider");

let activeImageSlide = 0;
i=0;

productImages.forEach((item, i) => {
    item.addEventListener('click', () => {
        productImages[activeImageSlide].classList.remove('active');
        item.classList.add('active');
        productImageSlide.style.backgroundImage = `url('${item.src}')`;
        activeImageSlide = i;
    })
})

const setData = (data) => {
    console.log(data);
    let title = document.querySelector('title');
    title.innerHTML += data.name;
    var catagoryOfProduct = data.catagory;
    var nameOfProduct = data.name;
    console.log(catagoryOfProduct);

    productImages.forEach((img, i) => {
        if (data.images[i]) {
            img.src = data.images[i];
        }
        else {
            img.style.display = 'none';
        }
    })
    productImages[0].click();

    const brand = document.querySelector('.product-brand');
    const name = document.querySelector('.product-name');
    const des = document.querySelector('.des');

    title.innerHTML += brand.innerHTML = data.brand;
    name.innerHTML = data.name;
    des.innerHTML = data.des;

    const sellPrice = document.querySelector('.product-price');
    const actualPrice = document.querySelector('.product-actual-price');
    const discount = document.querySelector('.product-discount');

    sellPrice.innerHTML = `Discounted Price: $${data.sellingPrice}`;
    actualPrice.innerHTML = `Regular Price: $${data.actualPrice}`;
    discount.innerHTML = `Discount: ${data.discount}%`;

    const key1 = document.querySelector('#key1');
    const key2 = document.querySelector('#key2');
    const key3 = document.querySelector('#key3');
    const key4 = document.querySelector('#key4');
    const key5 = document.querySelector('#key5');
    const keyValue1 = document.querySelector('#key-value1');
    const keyValue2 = document.querySelector('#key-value2');
    const keyValue3 = document.querySelector('#key-value3');
    const keyValue4 = document.querySelector('#key-value4');
    const keyValue5 = document.querySelector('#key-value5');

    key1.innerHTML = `${data.keyFeatures.key1}`;
    key2.innerHTML = `${data.keyFeatures.key2}`;
    key3.innerHTML = `${data.keyFeatures.key3}`;
    key4.innerHTML = `${data.keyFeatures.key4}`;
    key5.innerHTML = `${data.keyFeatures.key5}`;

    keyValue1.innerHTML = `${data.keyFeatureValues.keyValue1}`;
    keyValue2.innerHTML = `${data.keyFeatureValues.keyValue2}`;
    keyValue3.innerHTML = `${data.keyFeatureValues.keyValue3}`;
    keyValue4.innerHTML = `${data.keyFeatureValues.keyValue4}`;
    keyValue5.innerHTML = `${data.keyFeatureValues.keyValue5}`;





    const productAddWhislist = (type, product) => {
        let data = JSON.parse(localStorage.getItem(type));
        if (data == null) {
            data = [];
        }

        product = {
            item: 1,
            name: product.name,
            sellingPrice: product.sellingPrice,
            brand: product.brand,
            image: product.images[0]
        }

        data.push(product);
        localStorage.setItem(type, JSON.stringify(data));
        return 'Added';
    }








    const wishlistBtn = document.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', () => {
        wishlistBtn.innerHTML = productAddWhislist('wishlist', data);
    })

    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.addEventListener('click', () => {
        cartBtn.innerHTML = productAddWhislist('cart', data);
    })






    const getProductsData = (catagory) => {
        return fetch('/get-products', {
            method: "post",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({ catagory: catagory })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data
            })
    }

    getProductsData(catagoryOfProduct.toLowerCase())
        .then(
            data => {
                if (data.length > 8) {
                    data = data.slice(i, i + 8)
                }
                data.forEach(product => {
                    if (nameOfProduct != product.name) {
                        showProduct(product)
                    }
                });
            }
        );






}


const fetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ id: productId })
    })
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            setData(data);
        })
    /*.catch(err => {
        location.replace('/404');
    })*/
}

let productId = null;
if (location.pathname != '/productDetails') {
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}