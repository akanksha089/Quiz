import React from 'react';
import parse from 'html-react-parser';

function Blog({ apiBlogs, apiBlocks }) {
    const blogs = apiBlocks && apiBlocks.blogs;
    const ourBlog = blogs && blogs.find(blog => blog.uniuqe_id === "our-blog");
    return (
        <div>{/* Blog Section Start */}
            <div className="container-fluid blog py-5">
                <div className="container py-5">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '900px' }}>
                        <h4 className="text-primary">{ourBlog && ourBlog.subtitle}</h4>
                        <h1 className="display-5 mb-4">{ourBlog && ourBlog.title}</h1>
                        <p className="mb-0">
                        { ourBlog && typeof ourBlog.description === 'string' && parse(ourBlog.description) }
                        </p>
                    </div>
                    <div className="row g-4 justify-content-center">
                        {
                            apiBlogs && apiBlogs.blogs && apiBlogs.blogs.length > 0 ? (
                                apiBlogs.blogs.map((item, index) => <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
                                    <div key={index} className="blog-item">
                                        <div className="blog-img">
                                            <img src={item && item.image} className="img-fluid blogs-img " alt="" />
                                            <div className="blog-info">
                                                <span><i className="fa fa-clock"></i> {item && item.created_date}</span>
                                                <div className="d-flex">
                                                    <span className="me-3"> 3 <i className="fa fa-heart"></i></span>
                                                    <a href="#" className="text-white">0 <i className="fa fa-comment"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="blog-content text-dark border p-4">
                                            <h5 className="mb-4">{item && item.title}</h5>
                                            <p className="mb-4">{typeof item.answer === 'string' ? parse(item.desc) : item.desc}</p>
                                            <a className="btn btn-light rounded-pill py-2 px-4" href="#">Read More</a>
                                        </div>
                                    </div>
                                </div>)
                            ) : ""
                        }
                        
                        
                    </div>
                </div>
            </div>
            {/* Blog Section End */}
        </div>
    )
}

export default Blog