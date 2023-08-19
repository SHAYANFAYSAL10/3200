const submitButton = document.querySelector('.submit-btn');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

window.onload = () => {
    if(sessionStorage.admin){
        admin = JSON.parse(sessionStorage.admin);
        if(admin.email){
            location.replace('/adminhome');
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
        sendData('/adminlogin', {
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
        sessionStorage.admin = JSON.stringify(data);
        location.replace('/adminhome');
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