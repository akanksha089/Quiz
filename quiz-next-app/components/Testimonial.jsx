import React from 'react';
import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

function Testimonial({ apiTestimonials, apiBlocks }) {
    const blogs = apiBlocks && apiBlocks.blogs;
    const testimonial = blogs && blogs.find(blog => blog.uniuqe_id === "testimonial");
    return (
        <div>{/* Testimonial Section Start */}
            <div className="container-fluid testimonial py-5">
                <div className="container py-5">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '900px' }}>
                        <h4 className="text-primary">{testimonial && testimonial.subtitle}</h4>
                        <h1 className="display-5 mb-4">{testimonial && testimonial.title}</h1>
                        <p className="mb-0">
                            {testimonial && typeof testimonial.description === 'string' && parse(testimonial.description)}
                        </p>
                    </div>
                    <div >
                        {apiTestimonials && apiTestimonials.blogs && apiTestimonials.blogs.length > 0 ? (
                            <Swiper
                                modules={[Pagination, Navigation]}
                                spaceBetween={30}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                // navigation
                                className="swiper-container"
                            >
                                {apiTestimonials.blogs.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="testimonial-item">
                                            <div className="testimonial-inner text-center p-5">
                                                <div className="d-flex align-items-center justify-content-center mb-4">
                                                    <div className="testimonial-inner-img border border-primary border-3 me-4" style={{ width: '100px', height: '100px', borderRadius: '50%' }}>
                                                        <img src={item.image} className="img-fluid rounded-circle" alt={item.title} />
                                                    </div>
                                                    <div>
                                                        <h5 className="mb-2">{item.title}</h5>
                                                        <p className="mb-0">{item.designation}</p>
                                                    </div>
                                                </div>
                                                <p className="fs-7">
                                                    {typeof item.description === 'string' ? parse(item.description) : item.description}
                                                </p>
                                                <div className="text-center">
                                                    <div className="d-flex justify-content-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <i key={i} className="fas fa-star text-primary"></i>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : ""}
                    </div>
                </div>
            </div>
            {/* Testimonial Section End */}
        </div>
    )
}

export default Testimonial