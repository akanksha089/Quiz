import React from 'react';
import parse from 'html-react-parser';

function Features({ apiFeatures, apiBlocks }) {
    const blogs = apiBlocks && apiBlocks.blogs;
    const ourFeature = blogs && blogs.find(blog => blog.uniuqe_id === "our-feature");
    const feature = blogs && blogs.find(blog => blog.uniuqe_id === "features");
    return (
        <div>
            <div className="container-fluid feature overflow-hidden py-5">
                <div className="container py-5">
                    <div
                        className="text-center mx-auto mb-5 wow fadeInUp"
                        data-wow-delay="0.1s"
                        style={{ maxWidth: '900px' }}
                    >
                        <h4 className="text-primary">{ourFeature && ourFeature.subtitle}</h4>
                        <h1 className="display-5 mb-4">{ourFeature && ourFeature.title}</h1>
                        <p className="mb-0">
                        { ourFeature && typeof ourFeature.description === 'string' && parse(ourFeature.description) }
                        </p>
                    </div>
                    <div className="row g-4 justify-content-center text-center mb-5">
                        {apiFeatures && apiFeatures.blogs && apiFeatures.blogs.length > 0 ? (
                            apiFeatures.blogs.map((item, index) => (
                                <div key={index} className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="text-center p-4">
                                        <div className="d-inline-block rounded bg-light p-4 mb-4">
                                        <img className='feature-icon-img' src={item && item.image} alt="" />
                                        </div>
                                        <div className="feature-content">
                                            <a href="#" className="h4">{item && item.title} 
                                            <i className="fa fa-long-arrow-alt-right"></i>
                                                </a>
                                            <p className="mt-4 mb-0">
                                            {typeof item.description === 'string' ? parse(item.description) : item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : ""

                        }
                       
                        <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="my-3">
                                <a href="#" className="btn btn-primary d-inline rounded-pill px-5 py-3">More Features</a>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5 pt-5" style={{ marginTop: '6rem' }}>
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.1s">
                            <div className="feature-img RotateMoveLeft justify-content-center d-flex h-100" style={{ objectFit: 'cover' }}>
                                <img src={feature && feature.image} className="img-fluid  " alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.1s">
                            <h4 className="text-primary">{feature && feature.subtitle}</h4>
                            <h1 className="display-5 mb-4"> {feature && feature.title}</h1>
                            <p className="mb-4">
                            { feature && typeof feature.description === 'string' && parse(feature.description) }
                            </p>
                            <div className="row g-4">
                                <div className="col-6">
                                    <div className="d-flex">
                                        <i className="fas fa-newspaper fa-4x text-secondary"></i>
                                        <div className="d-flex flex-column ms-3">
                                            <h2 className="mb-0 fw-bold">285</h2>
                                            <small className="text-dark">Created Projects</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex">
                                        <i className="fas fa-users fa-4x text-secondary"></i>
                                        <div className="d-flex flex-column ms-3">
                                            <h2 className="mb-0 fw-bold">6560</h2>
                                            <small className="text-dark">Happy Clients</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-4">
                                <a href="#" className="btn btn-primary rounded-pill py-3 px-5">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Feature End */}

        </div>
    )
}

export default Features