import React from 'react';
import parse from 'html-react-parser';

function Faq({ apiFaqs }) {
    return (
        <div>
            {/* FAQ Start */}
            <div className="container-fluid FAQ bg-light overflow-hidden py-5">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.1s">
                            <div className="accordion" id="accordionExample">

                                {
                                    apiFaqs && apiFaqs.blogs && apiFaqs.blogs.length > 0 ? (
                                        apiFaqs.blogs.map((item, index) => (
                                            <div key={index} className="accordion-item border-0 mb-4">
                                                <h2 className="accordion-header" id={`heading${index}`}>
                                                    <button
                                                        className="accordion-button rounded-top"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#collapse${index}`}
                                                        aria-expanded={index === 0 ? "true" : "false"}
                                                        aria-controls={`collapse${index}`}
                                                    >
                                                        {item && item.question}
                                                    </button>
                                                </h2>
                                                <div
                                                    id={`collapse${index}`}
                                                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                                    aria-labelledby={`heading${index}`}
                                                    data-bs-parent="#accordionExample"
                                                >
                                                    <div className="accordion-body my-2">
                                                    {typeof item.answer === 'string' ? parse(item.answer) : item.answer}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : ""
                                }



                                {/* <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button
                                            className="accordion-button collapsed rounded-top"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                        >
                                            How can I contact support if I have issues with a quiz?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThree"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body my-2">
                                            <h5>Contacting Support</h5>
                                            <p>
                                                If you encounter any issues with a quiz, our support team is here to help. You can reach out to us through the Contact page on our website, where you can submit a support ticket or send an email directly.
                                            </p>
                                            <p>
                                                Our team will respond promptly to address any concerns or technical difficulties you may be experiencing. We are committed to providing a smooth and enjoyable quiz experience for all our users.
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.3s">
                            <div className="FAQ-img RotateMoveRight rounded">
                                <img src="\img\quiz-faq.png" className="img-fluid w-100" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* FAQ End */}

        </div>
    )
}

export default Faq