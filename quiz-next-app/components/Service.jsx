import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import Link from 'next/link';


function Service({ apiCategories, apiCourses, apiBlocks }) {
    const blogs = apiBlocks && apiBlocks.blogs;
    const categories = blogs && blogs.find(blog => blog.uniuqe_id === "our_categories");
    const [filter, setFilter] = useState('show-all');

    const handleFilterChange = (filterType) => {
        setFilter(filterType);
        console.log("Selected Filter:", filterType); // Debugging output
    };
    console.log("filter", filter);
    // Log the filter state when it changes
    useEffect(() => {
        console.log("Selected Filter:", filter);
    }, [filter]);

    return (
        <div className="container-fluid service py-5">
            <div className="container py-5">
                {/* Section Heading */}
                <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '900px' }}>
                    <h4 className="mb-1 text-primary">{categories && categories.subtitle}</h4>
                    <h1 className="display-5 mb-4">{categories && categories.title}</h1>
                    <p className="mb-0">
                        {categories && typeof categories.description === 'string' && parse(categories.description)}
                    </p>

                    {/* Filter Buttons */}
                    <div className="btn-container mt-5">
                        <button
                            className="btn btn-light border border-primary rounded-pill text-primary py-2 px-4 me-4"
                            onClick={() => handleFilterChange('show-all')}
                        >
                            Show All
                        </button>
                        {/* Dynamically render category buttons */}
                        {apiCategories && apiCategories.blogs && apiCategories.blogs.length > 0 ? (
                            apiCategories.blogs.map((item, index) => (
                                <button
                                    key={index}
                                    className="btn btn-light border border-primary rounded-pill text-primary py-2 px-4 me-4"
                                    onClick={() => handleFilterChange(String(item && item.id))} // Convert id to string for comparison
                                >
                                    {item.title}
                                </button>
                            ))
                        ) : null}
                    </div>
                </div>

                {/* Filtered Quiz Cards */}
                <div className="row g-4 justify-content-center">
                    {apiCourses && apiCourses.blogs && apiCourses.blogs.length > 0 ? (
                        apiCourses.blogs
                            .filter(item => filter === 'show-all' || String(item.category_id) === String(filter)) // Convert category_id to string
                            .map((item, index) => (
                                <div key={index} className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="service-item text-center rounded p-4">
                                        <div className="service-icon d-inline-block bg-light rounded p-4 mb-4">
                                            {/* <i className="fas fa-mail-bulk fa-5x text-secondary"></i> */}
                                            <img className='service-img' src={item && item.image} alt="" />
                                        </div>
                                        <div className="service-content">
                                            <h4 className="mb-4">{item.title}</h4>
                                            <p className="mb-4 two-line-limit">
                                                {parse(item && item.description)}
                                            </p>
                                            {/* <a href="#" className="btn btn-light rounded-pill text-primary py-2 px-4">
                                                Read More
                                            </a> */}
                                            <Link href={`/${item?.slug || ''}`} className="btn btn-light rounded-pill text-primary py-2 px-4">
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : ""}
                </div>
            </div>
        </div>
    );
}

export default Service;
