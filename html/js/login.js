const submitButton = document.querySelector('.submit-btn');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

window.onload = () => {
    if(localStorage.user){
        user = JSON.parse(localStorage.user);
        if(user.email){
            location.replace('/');
        }
    }
}

submitButton.addEventListener('click', () => {
    if (!email.value.length) {
        showAlert('Enter your email');
    }
    else if (!password.value.length) {
        showAlert('Enter your password');
    }
    else {
        sendData('/login', {
            email: email.value,
            password: password.value,
        })
    }
}
);

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
    else {
        localStorage.user = JSON.stringify(data);
        location.replace('/');
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
}