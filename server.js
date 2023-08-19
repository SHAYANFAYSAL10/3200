const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');

let serviceAccount = require("./ecom-website-1e64a-firebase-adminsdk-ysvxc-1981603c46.json");
const { compare } = require('bcrypt');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

let staticPath = path.join(__dirname, "html");

const app = express();

app.use(express.static(staticPath));
app.use(express.json());

app.get("/", (req,res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

app.get('/signup', (req,res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post('/signup', (req,res) => {
    let {name,email,password,terms} = req.body;
    console.log(req.body);
    db.collection('users').doc(email).get()
        .then(user => {
            if(user.exists){
                return res.json({'alert': 'Email already exists.'});
            }
            else {
                db.collection('users').doc(email).set(req.body)
                .then(data => {
                    res.json({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    })
                })
            }
        })
    //res.json('data');*/
})

app.get("/terms_and_conditions", (req,res) => {
    res.sendFile(path.join(staticPath, "terms_and_conditions.html"));
})

app.get('/login', (req,res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    db.collection('users').doc(email).get()
    .then(user => {
        if(!user.exists){
            return res.json({'alert': 'Email or password is incorrect.'})
        }
        else {
            // console.log(email,password);
            // console.log(user.data().password);
            // bcrypt.compare(password, user.data().password, (err, result) => {
                if(user.data().password==password) {
                    // return res.json({'alert': 'Email and password is correct.'})
                    let data = user.data();
                    // console.log(data);
                    return res.json({
                        name: data.name,
                        email: data.email
                    })
                }
                else {
                    return res.json({'alert': 'Email or password is incorrect.'})
                }
            // })
        }
    })
})

app.get('/adminlogin', (req,res) => {
    res.sendFile(path.join(staticPath, "adminlogin.html"));
})

app.post('/adminlogin', (req, res) => {
    let { email, password } = req.body;

    db.collection('admin').doc(email).get()
    .then(admin => {
        if(!admin.exists){
            return res.json({'alert': 'Email or password is incorrect.'})
        }
        else {
            // console.log(email,password);
            // console.log(user.data().password);
            // bcrypt.compare(password, user.data().password, (err, result) => {
                if(admin.data().password==password) {
                    // return res.json({'alert': 'Email and password is correct.'})
                    let data = admin.data();
                    // console.log(data);
                    return res.json({
                        name: data.name,
                        email: data.email
                    })
                }
                else {
                    return res.json({'alert': 'Email or password is incorrect.'})
                }
            // })
        }
    })
})

app.get('/upphoto', (req,res) => {
    res.sendFile(path.join(staticPath, "upphoto.html"));
})

app.get('/addproduct', (req,res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"));
})

app.get('/addproduct/:id', (req,res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"));
})

app.post('/addproduct', (req, res) => {
    let { name, catagory, brand, des, keyFeatures, keyFeatureValues, images, actualPrice, discount, sellingPrice, stock} = req.body;
    let docName = `${name.toLowerCase()}-${(5000)}`;
    db.collection('products').doc(docName).set(req.body)
    .then(data => {
        res.json({'product': name});
    })
    .catch(err => {
        return res.json({'alert': 'Some error occured'});
    })
})

// app.post('/updateproduct', (req, res) => {
//     let { id, name, catagory, brand, des, images, actualPrice, discount, sellingPrice, stock} = req.body;
//     console.log(images);
//     db.collection('products').doc(id).update(req.body)
//     .then(data => {
//         res.json({
//             name: req.body.name,
//             catagory: req.body.catagory,
//             brand: req.body.brand,
//             des: req.body.des,
//             images: req.body.images,
//             actualPrice: req.body.actualPrice,
//             discount: req.body.discount,
//             sellingPrice: req.body.sellingPrice,
//             stock: req.body.stock
//             // 'product': name
        
//     });
//     })
//     .catch(err => {
//         return res.json({'alert': 'Some error occured'});
//     })
// })

app.post('/get-products', (req, res) => {
    let {id, name, catagory} = req.body;
    let docRef = id ? db.collection('products').doc(id) : db.collection('products');

    if(id){
        docRef = db.collection('products').doc(id)
    }
    else if(name){
        docRef = db.collection('products').where('name', '==', name)
    }
    else if(catagory){
        docRef = db.collection('products').where('catagory', '==', catagory)
    }

    docRef.get()
    .then(products => {
        let productArr = [];
        if(id) {
            return res.json(products.data());
        }
        products.forEach(item => {
            let data = item.data();
            data.id = item.id;
            productArr.push(data);
        })
        res.json(productArr)
    })
})

app.get('/productDetails/:id', (req,res) => {
    res.sendFile(path.join(staticPath, "productDetails.html"))
})

app.get('/search/:key', (req, res) => {
    res.sendFile(path.join(staticPath, "search.html"));
})

app.get('/adminsearch/:key', (req, res) => {
    res.sendFile(path.join(staticPath, "adminsearch.html"));
})

app.get('/garbage', (req,res) => {
    res.sendFile(path.join(staticPath, "garbage.html"));
})

app.get('/cart', (req,res) => {
    res.sendFile(path.join(staticPath, "cart.html"));
})

app.get('/checkout', (req,res) => {
    res.sendFile(path.join(staticPath, "checkout.html"));
})

app.post('/order',(req,res) => {
    const {order,email,add} = req.body;
    let docName = email + Math.random()*parseInt(10000000);
    db.collection('order').doc(docName).set(req.body)
    .then(data => {
        res.json('Your order is added.');
    })
})

app.get('/aboutus', (req,res) => {
    res.sendFile(path.join(staticPath, "aboutus.html"));
})

app.get('/warranty', (req,res) => {
    res.sendFile(path.join(staticPath, "warranty.html"));
})

app.get('/return', (req,res) => {
    res.sendFile(path.join(staticPath, "returnandrefund.html"));
})

app.get('/adminhome', (req,res) => {
    res.sendFile(path.join(staticPath, "adminhome.html"));
})

app.get('/updateproduct', (req,res) => {
    res.sendFile(path.join(staticPath, "updateproduct.html"));
})

app.post('/delete-product', (req, res) => {
    let { id } = req.body;

    db.collection('products').doc(id).delete()
    .then(data => {
        res.json('success');
    }).catch(err => (
        res.json('err')
    ))
})

app.use((req,res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.listen(3000, () => {
    console.log('listening to port 3000');
})