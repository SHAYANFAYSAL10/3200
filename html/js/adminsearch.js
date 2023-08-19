window.onload = loadcode();

function loadcode(){
    if(!sessionStorage.admin){
        location.replace('/adminlogin');
    }
}

const searchKey = decodeURI(location.pathname.split('/').pop());
const searchSpanElement = document.querySelector('#search-key');
searchSpanElement.innerHTML = searchKey;
var subs;

searchPageTitle = 'Search results for '+searchKey;
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
            data.forEach(product => adminshowProduct(product));
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
            data.forEach(product => adminshowProduct(product));
        }
    );