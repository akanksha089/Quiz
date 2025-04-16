import React from 'react';
import parse from 'html-react-parser';

function Hero( { apiBlocks } ) {
    const blogs = apiBlocks && apiBlocks.blogs;
    const hero = blogs && blogs.find(blog => blog.uniuqe_id === "hero_section");
    return (
        <div className="hero-header overflow-hidden px-5">
            <div className="rotate-img">
                <img src="img/sty-1.png" className="img-fluid w-100" alt="" />
                <div className="rotate-sty-2"></div>
            </div>
            <div className="row gy-5 align-items-center">
                <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.1s">
                    <h1 className="display-4 text-dark mb-4 wow fadeInUp" data-wow-delay="0.3s">
                        {/* Think You Know It All? Prove It with Our Quizzes! */}
                        {hero && hero.title}
                    </h1>
                    <p className="fs-4 mb-4 wow fadeInUp " data-wow-delay="0.5s">
                    { hero && typeof hero.description === 'string' && parse(hero.description) }
                    </p>
                    <a href="#" className="btn btn-primary rounded-pill py-3 px-5 wow fadeInUp" data-wow-delay="0.7s">
                        Get Started
                    </a>
                </div>
                <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.2s">
                    <img src={hero && hero.image} className="img-fluid hero-img" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Hero