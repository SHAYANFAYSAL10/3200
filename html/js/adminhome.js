window.onload = loadcode();

function loadcode(){
    if(!sessionStorage.admin){
        location.replace('/adminlogin');
    }
}

const setupProducts = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({"Content-Type": "application/json"})
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(product => adminshowProduct(product));
    });
}