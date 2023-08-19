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
                      <ul class="dropdown-menu mt-3" aria-labelledby="navbarDropdown">
                          <li><a class="dropdown-item" href="/adminsearch/desktop">Desktop</a></li>
                          <li><a class="dropdown-item" href="/adminsearch/laptop">Laptop</a></li>
                      </ul>
                  </li>
                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          Component
                      </a>
                      <ul class="dropdown-menu mt-3" aria-labelledby="navbarDropdown">
                          <li><a class="dropdown-item" href="/adminsearch/casing">Casing</a></li>
                          <li><a class="dropdown-item" href="/adminsearch/graphics card">Graphics card</a></li>
                          <li><a class="dropdown-item" href="/adminsearch/processor">Processor</a></li>
                          <li><a class="dropdown-item" href="/adminsearch/motherboard">Motherboard</a></li>
                          <li><a class="dropdown-item" href="/adminsearch/ram">RAM</a></li>
                          <li><a class="dropdown-item" href="/adminsearch/hdd">HDD</a></li>
                          <li><a class="dropdown-item" href="/adminsearch/ssd">SSD</a></li>
                      </ul>
                  </li>
                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          Accessories
                      </a>
                      <ul class="dropdown-menu mt-3" aria-labelledby="navbarDropdown">
                          <li><a class="dropdown-item" href="/adminsearch/headphone">Headphone</a></li>
                          <li><a class="dropdown-item" href="/adminsearch/keyboard">Keyboard</a></li>
                          <li><a class="dropdown-item" href="/adminsearch/monitor">Monitor</a></li>
                          <li><a class="dropdown-item" href="/adminsearch/mouse">Mouse</a></li>
                          <li><a class="dropdown-item" href="/adminsearch/printer">Printer</a></li>
                          <li><a class="dropdown-item" href="/adminsearch/router">Router</a></li>
                          <li>
                              <hr class="dropdown-divider">
                          </li>
                          <li><a class="dropdown-item" href="/adminsearch/other">Others</a></li>
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
                  <i class="cart-icon fa-brands fa-2x me-5 fa-product-hunt" style="color: #000000"></i>
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
      location.href = `/adminsearch/${searchBox.value}`;
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
    setupProducts();
    let admin = JSON.parse(sessionStorage.admin || null);
    if(admin != null) {
      popuptext.innerHTML = `log in as, ${admin.name}`;
      actionBtn.innerHTML = 'Log Out';
      actionBtn.addEventListener('click', () => {
        sessionStorage.clear();
        location.reload();
      })
    }
    else {
      popuptext.innerHTML = 'Log in';
      actionBtn.innerHTML = 'Log In';
      actionBtn.addEventListener('click', () => {
        location.href = '/adminlogin';
      })
    }
  }

  const cartIcon = document.querySelector('.cart-icon');

cartIcon.addEventListener('click', () => {
  location.href = '/addProduct';
})
