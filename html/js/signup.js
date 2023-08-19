const submitButton = document.querySelector('.submit-btn');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const terms = document.querySelector('#terms_and_cond');

submitButton.addEventListener('click', () => {
    if (name.value.length < 6) {
        showAlert('name must be at least 6 characters long.');
    }
    else if (!email.value.length) {
        showAlert('Enter your email');
    }
    else if (password.value.length < 8) {
        showAlert('password must be at least 8 characters long.');
    }
    else if (!terms.checked) {
        showAlert('You must agree to terms and conditions.');
    }
    else {
        sendData('/signup', {
            name: name.value,
            email: email.value,
            password: password.value,
            terms: terms.checked
        })
        window.location.href = "/login";
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