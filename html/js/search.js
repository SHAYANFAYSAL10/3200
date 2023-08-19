const searchKey = decodeURI(location.pathname.split('/').pop());
const searchSpanElement = document.querySelector('#search-key');
searchSpanElement.innerHTML = searchKey;
var subs;

i = 0;

searchPageTitle = 'Search results for ' + searchKey;
document.querySelector('title').textContent = searchPageTitle;

const getProducts = (name) => {
    return fetch('/get-products', {
        method: "post",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ name: name })
    })
        .then(res => res.json())
        .then(data => {
            return data
        })
}

getProducts(searchKey.toLowerCase())
    .then(
        data => {
            data.forEach(product => showProduct(product));
        }
    );

const getProductsData = (catagory) => {
    return fetch('/get-products', {
        method: "post",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ catagory: catagory })
    })
        .then(res => res.json())
        .then(data => {
            return data;
        })
}

getProductsData(searchKey.toLowerCase())
    .then(
        data => {
            if (data.length > 8) {
                data = data.slice(i, i + 8)
            }
            data.forEach(product => showProduct(product));
        }
    );

const moreBtn = document.querySelector('.more-btn');


moreBtn.addEventListener('click', () => {
    i = i + 8;
    getProductsData(searchKey.toLowerCase())
    .then(
        data => {
            if (data.length > 8) {
                data = data.slice(i, i + 8)
            }
            data.forEach(product => showProduct(product));
        }
    );
})