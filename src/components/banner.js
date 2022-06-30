import React from "react";

function BannerTop() {
    return (
        <div className="container">
            <div className="banner-top">
                <h1>TheHours</h1>
                <i className="fa-solid fa-grip-lines-vertical"></i>
                <h6>News & Opinion Blog</h6>
            </div>
        </div>
    )
}

function BannerMiddle() {
    return (
        <div className="container">
            <div className="banner-middle">
                <video autoPlay>
                    <source src="https://video.wixstatic.com/video/2feeec_08e464b346d44058b1997753b02fa6d2/1080p/mp4/file.mp4"></source>
                </video>
            </div>
        </div>
    )
}

function BannerBottom() {
    return (
        <div className="container">
            <div className="banner-bottom">
                <h1 className="text-center">Breaking News:</h1>
                <div>
                    <p>NASDAQ drops 20%, world markets react</p>
                    <p>President-elect to be announced</p>
                    <p>Hurricane Jemma hits Gulf Coast</p>
                </div>
            </div>
        </div>
    )
}

function Banner() {
    return (
        <section className="banner">
            <BannerTop />
            <BannerMiddle />
            <BannerBottom />
        </section>
    )
}

export default Banner;