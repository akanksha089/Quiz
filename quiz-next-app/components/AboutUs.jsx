import React from 'react';
import parse from 'html-react-parser';

function AboutUs({apiBlocks}) {
    const blogs = apiBlocks && apiBlocks.blogs;
    const about = blogs && blogs.find(blog => blog.uniuqe_id === "about_us");
    return (

        < div className="container-fluid overflow-hidden py-5" style={{ marginTop: '6rem' }
        }>
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="RotateMoveLeft">
                            <img src={about && about.image} className="img-fluid w-100" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                        <h4 className="mb-1 text-primary">{about && about.subtitle}</h4>
                        <h1 className="display-5 mb-4">   {about && about.title}
                            {/* Discover, Learn, and Test Your Knowledge with Every Quiz */}
                            </h1>
                        <p className="mb-4 font-custom">
                        { about && typeof about.description === 'string' && parse(about.description) }
                        </p>
                        <a href="#" className="btn btn-primary rounded-pill py-3 px-5">About More</a>
                    </div>
                </div>
            </div>
        </div >


    )
}

export default AboutUs