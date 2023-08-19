//const { Endpoint } = require("aws-sdk");

// window.onload = () => {
//     setupProducts();
// }



//i=0;

i=0;

const setupProducts = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({"Content-Type": "application/json"})
    })
    .then(res => res.json())
    .then(data => {
        if(data.length>8)
        {
            data=data.slice(i,i+8)
        }
        data.forEach(product => showProduct(product));
    });
}

const moreBtn = document.querySelector('.more-btn');


moreBtn.addEventListener('click', () => {
  i=i+8;
  setupProducts();
})


// const getProducts = (name) => {
//     return fetch('/get-products', {
//         method: "post",
//         headers: new Headers({"Content-Type": "application/json"}),
//         body: JSON.stringify({name: name})
//     })
//     .then(res => res.json())
//     .then(data => {
//         return data;
//     })
// }

/*if(parent){
    let cardContainer = document.querySelector(parent);
    cardContainer.innerHTML = start+middle+end;
}
else {
    return start+middle+end;
}*/