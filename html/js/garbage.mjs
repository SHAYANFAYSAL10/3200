// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCaBdgL6X4lTmISh5dJWXUtC9Vbdov7sfE",
    authDomain: "ecom-website-1e64a.firebaseapp.com",
    projectId: "ecom-website-1e64a",
    storageBucket: "ecom-website-1e64a.appspot.com",
    messagingSenderId: "1077545942906",
    appId: "1:1077545942906:web:db3f8b9e4895e62174a0c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL }
    from "https://www.gstatic.com/firebasejs/9.8.2/firebase-storage.js"

var files = [];
var images = [];
var imgURL = [];
var reader = new FileReader();

var input = document.getElementById('img');
var UpBtn = document.getElementById('upbtn');
var input1 = document.getElementById('img1');
var showurl = document.getElementById('showURL');

input.onchange = e => {
    files = e.target.files;

    images[0] = files[0];

}

input1.onchange = e => {
    files = e.target.files;

    images[1] = files[0];

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
                //console.log(downloadURL);
                imgURL[x]=downloadURL;
                //console.log(imgURL[0]);
            });
        });
    }

}

async function show(){
    for (let x in imgURL){
        console.log(imgURL[x]);
    }
}


UpBtn.onclick = UploadProcess;

showurl.onclick = show;



//UpBtn.onclick = showName;