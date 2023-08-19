const createFooter = () => {
    let footer = document.querySelector('.footer');
    footer.innerHTML = `
        <div class="container">
            <div class="row text-center">
                <div class="col-sm mt-4">
                    <div class="row">
                        <div><a href="/aboutus">About us</a></div>
                        <div><a href="/warranty">Warranty</a></div>
                        <div><a href="/terms_and_conditions">Terms & Conditions</a></div>
                        <div><a href="/return">Return & Refund Policy</a></div>
                    </div>
                </div>
                <div class="col-sm mt-4">
                    <div class="row">
                        <p class="mb-0">Contact Us</p>
                        <p class="mb-0">Head office</p>
                        <p class="mb-0">Faysal IT Limited</p>
                        <p class="mb-0">Kusholi Bhaban, 4th Floor, 238/1 Begum Rokeya</p>
                        <p class="mb-0">Sharani, Agargaon, Dhaka-1207</p>
                        <p><i class="fa-solid fa-phone"></i>01700000000, 01500000000</p>
                    </div>
                </div>
                <div class="col-md mt-4 mb-4">
                    <p>Stay connected</p>
                    <p>Email: faysal.It.Info@gmail.com</p>
                    <div class="foot-icon">
                        <i class="facebook fa-brands me-4 fa-2x fa-facebook" onclick="window.open('http://www.facebook.com')"></i>
                        <i class="linkedin fa-brands me-4 fa-2x fa-linkedin"></i>
                        <i class="instragram fa-brands me-4 fa-2x fa-square-instagram"></i>
                        <i class="twitter fa-brands fa-2x fa-twitter"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom text-center">
            &copy;All rights reserved to Faysal IT
        </div>
    `;
}

createFooter();