const createSmallCards = (data) => {
    return `
    <div class="small-card card  mb-4">
    <div class="small-product">
    <div class="row">
    <div class="col-4">
                    <img src="${data.image}" class="small-product-img" alt="">
                    </div>
                    <div class="col-5">
                    <div class="small-text">
                        <p class="small-product-name">${data.name}</p>
                        <p class="small-brand">${data.brand}</p>
                        </div>
                    </div>
                    <div class="col-3">
                    <div class="item-counter mt-2">
                    <div class="row">
                    <div class="col-2">
                        <button class="counter-button-decrement text-white">-</button>
                        </div>
                        <div class="col-2">
                        <p class="item-count ms-2">${data.item}</p>
                        </div>
                        <div class="col-2">
                        <button class="counter-button-increment text-white">+</button>
                    </div>
                    </div>
                    <p class="small-price" data-price="${data.sellingPrice}">Tk. ${data.sellingPrice * data.item}</p>
                    <button class="small-delete-btn">
                        <img src="cross.png">
                    </button>
                    </div>
                </div>
                </div>
                </div>
    `;
}

let totalBill = 0;

const setproducts = (name) => {
    const element = document.querySelector(`.${name}`);
    let data = JSON.parse(localStorage.getItem(name));
    if (data == null) {
        element.innerHTML = `<img src="" class="empty-img" alt="">`;
    }
    else {
        for (let i = 0; i < data.length; i++) {
            element.innerHTML += createSmallCards(data[i]);
            if (name == 'cart') {
                totalBill += Number(data[i].sellingPrice * data[i].item);
            }
            updateBill();
        }
    }
    setupEvents(name);
}

const updateBill = () => {
    let billPrice = document.querySelector('.bill');
    billPrice.innerHTML = `Tk. ${totalBill}`;
}

const setupEvents = (name) => {
    const counterMinus = document.querySelectorAll(`.${name} .counter-button-decrement`);
    const counterPlus = document.querySelectorAll(`.${name} .counter-button-increment`);
    const counts = document.querySelectorAll(`.${name} .item-count`);
    const price = document.querySelectorAll(`.${name} .small-price`);
    const deleteBtn = document.querySelectorAll(`.${name} .small-delete-btn`);

    let product = JSON.parse(localStorage.getItem(name));

    counts.forEach((item, i) => {
        let cost = Number(price[i].getAttribute('data-price'));

        counterMinus[i].addEventListener('click', () => {
            if (item.innerHTML > 1) {
                item.innerHTML--;
                totalBill -= cost;
                price[i].innerHTML = `Tk. ${item.innerHTML * cost}`;
                if(name=='cart'){
                    updateBill();
                }
                product[i].item = item.innerHTML;
                localStorage.setItem(name, JSON.stringify(product));
            }
        })
        counterPlus[i].addEventListener('click', () => {
            console.log(item[i]);
            if (item.innerHTML < 9) {
                item.innerHTML++;
                totalBill += cost;
                price[i].innerHTML = `Tk. ${item.innerHTML * cost}`;
                if(name=='cart'){
                    updateBill();
                }
                product[i].item = item.innerHTML;
                localStorage.setItem(name, JSON.stringify(product));
            }
        })
    })
    deleteBtn.forEach((item,i) => {
        item.addEventListener('click',()=> {
            product = product.filter((data,index) => index != i);
            localStorage.setItem(name,JSON.stringify(product));
            location.reload();
        })
    })
}

setproducts('cart');
setproducts('wishlist');