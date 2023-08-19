import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCaBdgL6X4lTmISh5dJWXUtC9Vbdov7sfE",
    authDomain: "ecom-website-1e64a.firebaseapp.com",
    projectId: "ecom-website-1e64a",
    storageBucket: "ecom-website-1e64a.appspot.com",
    messagingSenderId: "1077545942906",
    appId: "1:1077545942906:web:db3f8b9e4895e62174a0c3"
};

const app = initializeApp(firebaseConfig);

import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL }
    from "https://www.gstatic.com/firebasejs/9.8.2/firebase-storage.js"

    window.onload = loadcode();

    function loadcode(){
        if(!sessionStorage.admin){
            location.replace('/adminlogin');
        }
    }

var files = [];
var images = [];
var imagePaths = [];
//var reader = new FileReader();

var image1 = document.getElementById('first-file-upload-btn');
var image2 = document.getElementById('second-file-upload-btn');
var image3 = document.getElementById('third-file-upload-btn');
var image4 = document.getElementById('fourth-file-upload-btn');
var ImgUpBtn = document.getElementById('upload-images');

var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');
var img3 = document.getElementById('img3');
var img4 = document.getElementById('img4');

let showimg;

image1.onchange = e => {
    files = e.target.files;
    images[0] = files[0];
    showimg = URL.createObjectURL(files[0]);
    img1.src = showimg;
}

image2.onchange = e => {
    files = e.target.files;
    images[1] = files[0];
    showimg = URL.createObjectURL(files[0]);
    img2.src = showimg;
}

image3.onchange = e => {
    files = e.target.files;
    images[2] = files[0];
    showimg = URL.createObjectURL(files[0]);
    img3.src = showimg;
}

image4.onchange = e => {
    files = e.target.files;
    images[3] = files[0];
    showimg = URL.createObjectURL(files[0]);
    img4.src = showimg;
}

async function UploadProcess() {
    for (let x in images) {
        var ImgToUpload = images[x];
        var ImgName = images[x].name;
        const metadata = {
            contentType: ImgToUpload.type
        }
        const storage = getStorage();
        const storageRef = sRef(storage, "Images/" + ImgName);
        const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metadata);
        UploadTask.on('state-changed', (snapshot) => {
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                imagePaths[x] = downloadURL;
            });
        });
    }
}

ImgUpBtn.onclick = UploadProcess;





const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');

discountPercentage.addEventListener('input', () => {
    let discount = actualPrice.value * discountPercentage.value / 100;
    sellingPrice.value = Math.round(actualPrice.value - discount);
})

sellingPrice.addEventListener('input', () => {
    let discount = (sellingPrice.value / actualPrice.value) * 100;
    discountPercentage.value = 100 - discount;
})



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


const productName = document.querySelector('#product-name');
const catagory = document.querySelector('#catagory');
const brand = document.querySelector('#product-brand');
const des = document.querySelector('#des');
const stock = document.querySelector('#stock');

const addProductBtn = document.querySelector('#add-btn');




const validateForm = () => {
    if (!productName.value.length) {
        showAlert('Enter product name');
    }
    else if (catagory.value == 'catagory') {
        showAlert('Select a catagory');
    }
    else if (!brand.value.length) {
        showAlert('Enter brand name');
    }
    else if (!des.value.length) {
        showAlert('Enter detailed description');
    }
    else if (!imagePaths.length) {
        showAlert('Upload at least one image');
    }
    /*else if(!actualPrice.value.length || !discount.value.length || sellingPrice.value.length) {
        showAlert('Enter price');
    }*/
    else if (!stock.value.length) {
        showAlert('Enter stock');
    }
    else {
        sendData('/addproduct', {
            name: productName.value,
            catagory: catagory.value,
            brand: brand.value,
            des: des.value,
            keyFeatures: {
                key1: key1.value,
                key2: key2.value,
                key3: key3.value,
                key4: key4.value,
                key5: key5.value,
            },
            keyFeatureValues: {
                keyValue1: keyValue1.value,
                keyValue2: keyValue2.value,
                keyValue3: keyValue3.value,
                keyValue4: keyValue4.value,
                keyValue5: keyValue5.value,
            },
            images: imagePaths,
            actualPrice: actualPrice.value,
            discount: discountPercentage.value,
            sellingPrice: sellingPrice.value,
            stock: stock.value
        })
        if(location.pathname != '/addProduct')
        {
            showAlert('Product has been updated');
            location.reload();
        }
        else
        {
            showAlert('Product has been added');
            location.reload();
        }
    }
    //return true;
}

/*const productData = () => {
    return data = {
        name: productName.value,
        catagory: catagory.value,
        brand: brand.value,
        des: des.valuse,
        images: imagePaths,
        actualPrice: actualPrice.value,
        discount: discountPercentage.value,
        sellingPrice: sellingPrice.value,
        stock: stock.value

    }
}*/





addProductBtn.addEventListener('click', () => {
    //UploadProcess();

    /*if (*/validateForm();/*) {
        let data = productData();
        sendData('/addproduct', data);
    }*/
    if(location.pathname != '/addProduct')
    {
        fetch('/delete-product', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({id: productId})
        }).then(res => res.json())
        .then(data => {
            if(data=='success'){
                // location.reload();
            }
            else {
                alert('some error happened')
            }
        })
        validateForm();
        // sendUpdateData('/updateproduct', {
        //     id: productId,
        //     name: productName.value,
        //     catagory: catagory.value,
        //     brand: brand.value,
        //     des: des.value,
        //     images: imagePaths,
        //     actualPrice: actualPrice.value,
        //     discount: discountPercentage.value,
        //     sellingPrice: sellingPrice.value,
        //     stock: stock.value
        // })
        // showAlert('Product has been updated');
    }
})








const fetchProductData = () => {
    delete sessionStorage.tempProduct;
    fetch('/get-products',{
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: productId})
    })
    .then((res) => res.json())
    .then(data => {
        setFormsData(data);
    })
}


const setFormsData = (data) => {
    console.log(data);
    productName.value = data.name;
    catagory.value = data.catagory;
    brand.value = data.brand;
    des.value = data.des;
    // image1 = data.images;
    actualPrice.value = data.actualPrice;
    discountPercentage.value = data.discount;
    sellingPrice.value = data.sellingPrice;
    stock.value = data.stock;
    key1.value = data.keyFeatures.key1;
    key2.value = data.keyFeatures.key2;
    key3.value = data.keyFeatures.key3;
    key4.value = data.keyFeatures.key4;
    key5.value = data.keyFeatures.key5;
    keyValue1.value = data.keyFeatureValues.keyValue1;
    keyValue2.value = data.keyFeatureValues.keyValue2;
    keyValue3.value = data.keyFeatureValues.keyValue3;
    keyValue4.value = data.keyFeatureValues.keyValue4;
    keyValue5.value = data.keyFeatureValues.keyValue5;
    showimg=data.images[0];
    img1.src = showimg;
    showimg=data.images[1];
    img2.src = showimg;
    showimg=data.images[2];
    img3.src = showimg;
    showimg=data.images[3];
    img4.src = showimg;
}


let productId = null;
if(location.pathname != '/addProduct') {
    addProductBtn.innerHTML='Update';
    productId = decodeURI(location.pathname.split('/').pop());

    let productDetail = JSON.parse(sessionStorage.tempProduct || null);
    if(productDetail != null) {
        fetchProductData();
    }
}




const sendUpdateData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(data)
    }).then((res) => res.json())
        .then(response => {
            processData(response);
        })
}




const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(data)
    }).then((res) => res.json())
        .then(response => {
            processData(response);
        })
}

const processData = (data) => {
    if (data.alert) {
        showAlert(data.alert);
    }
}

const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
    return false;
}