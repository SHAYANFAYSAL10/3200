const createNav = () => {
  let nav = document.querySelector('.navbar');
  nav.innerHTML = `
  <nav class="navbar navbar-expand-lg bg w-100">
    <div class="container-fluid">
        <a class="navbar-brand text-light" href="#"><img src="../logo.jpg" class="nav-img me-5"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"><i class="fa-solid mt-1 fa-bars"></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link text-light active" aria-current="page" href="/">Home</a>
                </li>
                <li class="drop-class nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Computer
                    </a>
                    <ul class="drop dropdown-menu mt-3" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="/search/desktop">Desktop</a></li>
                        <li><a class="dropdown-item" href="/search/laptop">Laptop</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Component
                    </a>
                    <ul class="drop dropdown-menu mt-3" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="/search/casing">Casing</a></li>
                        <li><a class="dropdown-item" href="/search/graphics card">Graphics card</a></li>
                        <li><a class="dropdown-item" href="/search/processor">Processor</a></li>
                        <li><a class="dropdown-item" href="/search/motherboard">Motherboard</a></li>
                        <li><a class="dropdown-item" href="/search/ram">RAM</a></li>
                        <li><a class="dropdown-item" href="/search/hdd">HDD</a></li>
                        <li><a class="dropdown-item" href="/search/ssd">SSD</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Accessories
                    </a>
                    <ul class="drop dropdown-menu mt-3" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="/search/headphone">Headphone</a></li>
                        <li><a class="dropdown-item" href="/search/keyboard">Keyboard</a></li>
                        <li><a class="dropdown-item" href="/search/monitor">Monitor</a></li>
                        <li><a class="dropdown-item" href="/search/mouse">Mouse</a></li>
                        <li><a class="dropdown-item" href="/search/printer">Printer</a></li>
                        <li><a class="dropdown-item" href="/search/router">Router</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="/search/other">Others</a></li>
                    </ul>
                </li>
            </ul>
            <div class="search d-flex" role="search">
                <input class="search-box form-control me-2" type="text" placeholder="Search" aria-label="Search">
                <button class="search-btn btn btn-outline-success me-2" type="submit">Search</button>
                <a class="user">
                <i class="user-icon fa-solid fa-2x me-4 fa-circle-user" style="color: #000000"></i>
                <div class="login-logout-popup hide">
                  <p class="account-info text-dark">Log in as, name</p>
                  <button class="buttn btn btn-outline-dark text-light" id="user-btn">Log out</button>
                </div>
                </a>
                <i class="cart-icon fa-solid fa-2x me-5 fa-cart-shopping" style="color: #000000"></i>
            </div>
        </div>
    </div>
</nav>
    `;
}

{/* <div class="search">
        <input type="text" class="search-box" placeholder="search">
        <button class="search-btn">search</button>
    </div> */}

createNav();

const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');
searchBtn.addEventListener('click', () => {
  if (searchBox.value.length) {
    location.href = `/search/${searchBox.value}`;
  }
})

const userIcon = document.querySelector('.user-icon');
const userPop = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userIcon.addEventListener('click', () => {
  userPop.classList.toggle('hide');
})

window.onload = () => {
  let user = JSON.parse(localStorage.user || null);
  if(user != null) {
    popuptext.innerHTML = `log in as, ${user.name}`;
    actionBtn.innerHTML = 'Log Out';
    actionBtn.addEventListener('click', () => {
      localStorage.clear();
      location.reload();
    })
  }
  else {
    popuptext.innerHTML = 'Log in to place order';
    actionBtn.innerHTML = 'Log In';
    actionBtn.addEventListener('click', () => {
      location.href = '/login';
    })
  }
  setupProducts();
}


const cartIcon = document.querySelector('.cart-icon');

cartIcon.addEventListener('click', () => {
  location.href = '/cart';
})


