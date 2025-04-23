import React,  { useState } from 'react'
import Login from './Login';
import Link from 'next/link';

function Header({settingData}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-light px-4 px-lg-5 py-3 py-lg-0">
            <Link href="/" className="navbar-brand p-0">
                <h1 className="display-6 text-primary m-0">
                    <i className="fas fa-question me-3"></i>
                    {/* <img className='logo-header-img' src={settingData && settingData.header_logo} alt="" /> */}
                     Quiz 
                </h1>
                {/* <img src="img/logo.png" alt="Logo" /> */}
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
            >
                <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0">
                    <Link href="/" className="nav-item nav-link active">Home</Link>
                    <Link href="/about" className="nav-item nav-link">About</Link>
                    {/* <Link href="/quiz" className="nav-item nav-link">Quiz</Link> */}
                    {/* <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                        <div className="dropdown-menu m-0">
                            <a href="feature.html" className="dropdown-item">Features</a>
                            <a href="pricing.html" className="dropdown-item">Pricing</a>
                            <a href="blog.html" className="dropdown-item">Blog</a>
                            <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                            <a href="404.html" className="dropdown-item">404 Page</a>
                        </div>
                    </div> */}
                    <Link href="/contact" className="nav-item nav-link">Contact Us</Link>
                </div>
                <a onClick={openModal}  className="btn btn-light border border-primary rounded-pill text-primary py-2 px-4 me-4">Log In</a>
                <Login show={isModalOpen} onClose={closeModal}/>
                <a onClick={openModal} className="btn btn-primary rounded-pill text-white py-2 px-4">Sign Up</a>
            </div>
        </nav>

    )
}

export default Header