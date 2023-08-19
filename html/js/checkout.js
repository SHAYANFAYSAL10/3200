window.onload = loadcode();

function loadcode(){
    if(!localStorage.user){
        location.replace("/login");
    }
}

const placeOrderbtn = document.querySelector('.place-order-btn');
placeOrderbtn.addEventListener('click', () => {
    let address = getAddress();
    console.log(localStorage.cart);

    if(address)
    {
        fetch('/order', {
            method:'post',
            headers: new Headers({'content-Type': 'application/json'}),
            body: JSON.stringify({
                order: JSON.parse(localStorage.cart),
                email: JSON.parse(localStorage.user).email,
                add: address
            })
        }).then(res => res.json())
        .then(data => {
            alert(data);
            delete localStorage.cart;
            location.reload();
        })
    }
})

const getAddress = () => {
    let customerName = document.querySelector('#customer-name').value;
    let mobileNo = document.querySelector('#customer-mobile').value;
    let district = document.querySelector('#district').value;
    let upazilla = document.querySelector('#upazilla').value;
    let para = document.querySelector('#para').value;
    let streetNo = document.querySelector('#street').value;
    let houseNo = document.querySelector('#house').value;

    if(!customerName.length || !mobileNo.length || district == 'district' || !upazilla.length || !para.length || !streetNo.length || !houseNo.length){
        return showAlert('Fill all the inputs.');
    }
    else{
        return {customerName,mobileNo,district,upazilla,para,streetNo,houseNo};
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