import React from 'react';
import Link from 'next/link';

function Footer({ settingData }) {
    const socialMediaLinks = [
        { platform: 'facebook', iconClass: 'fab fa-facebook-f', url: settingData?.fb_url },
        { platform: 'pinterest', iconClass: 'fab fa-pinterest', url: settingData?.pinterest_url },
        { platform: 'twitter', iconClass: 'fab fa-twitter', url: settingData?.twitter_url },
        { platform: 'instagram', iconClass: 'fab fa-instagram', url: settingData?.instagram_url },
        { platform: 'linkdin', iconClass: 'fab fa-linkedin-in', url: settingData?.linkdin_url },
        { platform: 'google', iconClass: 'fab fa-google', url: settingData?.google_url },
    ];
    return (
        <div>{/* Footer Section Start */}
            <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column ">
                                <Link href="/" className=" p-0 ">
                                    <h1 className="display-6 text-primary m-0">
                                        <i className="fas fa-question me-3"></i>
                                        {/* <img className='logo-footer-img' src={settingData && settingData.header_logo} alt="" /> */}
                                        Quiz
                                    </h1>
                                    {/* <img src="img/logo.png" alt="Logo" /> */}
                                </Link>
                                <p className=" font-custom lh-base mt-4 ">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam error repellat necessitatibus vero deserunt quia nam recusandae rerum! Ad, unde inventore ipsum corrupti molestiae 
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="mb-4 text-dark">Quick Links</h4>
                                <Link href="/">Home</Link>
                                <Link href="/about">About Us</Link>
                                <Link href="/contact">Contact Us</Link>
                                <Link href="/contact">Get in touch</Link>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="mb-4 text-dark">Services</h4>
                                <Link href="/">Home</Link>
                                <Link href="/about">About Us</Link>
                                <Link href="/contact">Contact Us</Link>
                                <Link href="/quiz">Quiz</Link>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="mb-4 text-dark">Contact Info</h4>
                                <a href=""><i className="fa fa-map-marker-alt me-2"></i>  {settingData && settingData.address ? settingData.address : ""}</a>
                                <a href=""><i className="fas fa-envelope me-2"></i> {settingData && settingData.email ? settingData.email : ""}</a>
                                <a href=""><i className="fas fa-phone me-2"></i> {settingData && settingData.phone ? settingData.phone : ""}</a>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-share fa-2x text-secondary me-2"></i>
                                    {/* <a className="btn-square btn btn-primary rounded-circle mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn-square btn btn-primary rounded-circle mx-1" href=""><i className="fab fa-twitter"></i></a>
                                    <a className="btn-square btn btn-primary rounded-circle mx-1" href=""><i className="fab fa-instagram"></i></a>
                                    <a className="btn-square btn btn-primary rounded-circle mx-1" href=""><i className="fab fa-linkedin-in"></i></a> */}
                                    {socialMediaLinks
                                        .filter(link => link.url) // Only include platforms with URLs
                                        .map(link => (
                                            <div key={link.platform} className={link.platform}>
                                                <Link className="btn-square btn btn-primary rounded-circle mx-1" href={link.url}>
                                                    <i className={link.iconClass}></i>
                                                </Link>
                                            </div>


                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Section End */}
            {/* Copyright Section Start */}
            <div className="container-fluid copyright py-4">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-md-0">
                            <span className="text-white">
                                <Link href="#"><i className="fas fa-copyright text-light me-2"></i>{settingData && settingData.site_title}</Link>, All right reserved.
                            </span>
                        </div>
                        <div className="col-md-6 text-center text-md-end text-white">
                            {/* This template is free as long as you keep the below author’s credit link/attribution link/backlink. */}
                            {/* If you'd like to use the template without the below author’s credit link/attribution link/backlink, */}
                            {/* you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". */}
                            {/* Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a> Distributed By <a className="border-bottom" href="https://themewagon.com">ThemeWagon</a> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Copyright Section End */}

        </div>
    )
}

export default Footer