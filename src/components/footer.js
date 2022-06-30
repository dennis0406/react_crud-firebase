import React from "react";

function FooterLeft() {
    return (
        <div className="footer-left">
            <h1>Subscribe to Our Newsletter</h1>
            <input id="email" type="text" placeholder="Enter your email here*" required></input>
            <input id="submit-email" type="submit" value="Subscribe"></input>
            <div className="social-network">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-youtube"></i>
                <i className="fa-brands fa-instagram"></i>
            </div>
        </div>
    )
}

function FooterRigth() {
    return (
        <ul className="main-menu">
            <li>
                <a href="#">HOME</a>
            </li>
            <li>
                <a href="#">News</a>
            </li>
            <li>
                <a href="#">Politics</a>
            </li>
            <li>
                <a href="#">Opinion</a>
            </li>
            <li>
                <a href="#">Sports</a>
            </li>
            <li>
                <a href="#">Entertainment</a>
            </li>
        </ul>
    )
}

function FooterBottom() {
    return (
        <div className="footer-bottom text-center">
            <a href="#" className="footer-bottom">© 2023 by Nguyen Quoc Dat. Proudly created with ReactJS</a>
        </div>
    )
}

function FooterTop(){
    return (
        <div className="footer-top">
            <FooterLeft />
            <FooterRigth />
        </div>
    )
}

function Footer() {
    return (
        <footer>
            <div className="container">
                <FooterTop />
            </div>
            <FooterBottom />
        </footer>
    )
}

export default Footer;