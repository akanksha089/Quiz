import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIData } from '../store/actions/homeActions';

const Contact = () => {
    const dispatch = useDispatch();
    const apiSettingData = useSelector((state) => state?.apiData?.data?.apisetting);
    const settingData = apiSettingData?.settings;

    const [loading, setLoading] = useState(true);
    const [defaultMeta, setDefaultMeta] = useState({
        title: '',
        description: '',
        keyword: ''
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '', phone: '', project: '', subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log('setFormData', setFormData)
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const res = await fetch('http://localhost:4000/api/v1/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                setSuccessMessage('Your message has been sent successfully.');
                setFormData({
                    name: '',
                    email: '', phone: '', project: '', subject: '',
                    message: '',
                });
            } else {
                setErrorMessage(data.message || 'Failed to send the message.');
            }
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again later.');
        }

        setIsSubmitting(false);
    };
    useEffect(() => {
        dispatch(fetchAPIData('apiSetting'));
    }, [dispatch]);

    useEffect(() => {
        if (settingData) {
            const { default_meta_title, default_meta_description, default_meta_keyword } = settingData;
            setDefaultMeta({
                title: default_meta_title || '',
                description: default_meta_description || '',
                keyword: default_meta_keyword || ''
            });
            setLoading(false);
        }
    }, [settingData]);

    const socialMediaLinks = [
        { platform: 'facebook', iconClass: 'fab fa-facebook-f', url: settingData?.fb_url },
        { platform: 'pinterest', iconClass: 'fab fa-pinterest', url: settingData?.pinterest_url },
        { platform: 'twitter', iconClass: 'fab fa-twitter', url: settingData?.twitter_url },
        { platform: 'instagram', iconClass: 'fab fa-instagram', url: settingData?.instagram_url },
        { platform: 'linkedin', iconClass: 'fab fa-linkedin-in', url: settingData?.linkdin_url },
        { platform: 'google', iconClass: 'fab fa-google', url: settingData?.google_url },
    ];

    return (
        <div className="body-custom">
            <Head>
                <title>{settingData?.site_title || 'Contact Us'}</title>
                <meta name="title" content={defaultMeta.title} />
                <meta name="description" content={defaultMeta.description} />
                <meta name="keyword" content={defaultMeta.keyword} />
            </Head>
            <Header settingData={settingData} />
            <div className="container-fluid bg-breadcrumb">
                <ul className="breadcrumb-animation">
                    {[...Array(10)].map((_, index) => (
                        <li key={index}></li>
                    ))}
                </ul>
                <div className="container text-center py-5" style={{ maxWidth: '900px' }}>
                    <h3 className="display-3 mb-4">Contact Us</h3>
                    <ol className="breadcrumb justify-content-center mb-0">
                        <li className="breadcrumb-item">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item active text-primary">Contact</li>
                    </ol>
                </div>
            </div>
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="text-center mx-auto mb-5" style={{ maxWidth: '900px' }}>
                        <h4 className="text-primary mb-4">Contact Us</h4>
                        <h1 className="display-5 mb-4">Get In Touch With Us</h1>
                        <p className="mb-0">
                            We’re here to help! Whether you have questions, feedback, or need assistance, feel free to reach out.
                        </p>
                    </div>
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6">
                            <h2 className="display-5 mb-2">Our Contact Form</h2>
                            <p className="mb-4">
                                Fill out the form below to send us your questions, feedback, or requests.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-lg-12 col-xl-6">
                                        <div className="form-floating">

                                            <input type="text" name="name" className="form-control" id="name" placeholder="Your Name"
                                                value={formData.name}
                                                onChange={handleChange} required />
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-xl-6">
                                        <div className="form-floating">
                                            <input type="email" name="email" className="form-control" id="email" placeholder="Your Email"
                                                value={formData.email}
                                                onChange={handleChange} />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-xl-6">
                                        <div className="form-floating">
                                            <input type="number" name="phone" className="form-control" id="phone" placeholder="Your Phone"
                                                value={formData.phone}
                                                onChange={handleChange} />
                                            <label htmlFor="phone">Your Phone</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-xl-6">
                                        <div className="form-floating">
                                            <input type="text" name='project' className="form-control" id="project" placeholder="Project"
                                                value={formData.project}
                                                onChange={handleChange} />
                                            <label htmlFor="project">Your Project</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" name='subject' className="form-control" id="subject" placeholder="Subject"
                                                value={formData.subject}
                                                onChange={handleChange} />
                                            <label htmlFor="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" name='message' placeholder="Leave a message here" id="message" style={{ height: '160px' }}
                                                value={formData.message}
                                                onChange={handleChange} ></textarea>
                                            <label htmlFor="message">Message</label>
                                        </div>
                                    </div>
                                 
                                    {successMessage && (
                                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                                            {successMessage}
                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>
                                    )}
                                    {errorMessage && (
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            {errorMessage}
                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>
                                    )}

                                    <div className="col-12">
                                        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100 py-3">{isSubmitting ? 'Sending...' : 'Send Message'}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-light d-flex align-items-center justify-content-center mb-3" style={{ width: '90px', height: '90px', borderRadius: '50px' }}>
                                    <i className="fa fa-home fa-2x text-primary"></i>
                                </div>
                                <div className="ms-4">
                                    <h4>Address</h4>
                                    <p className="mb-0">{settingData?.address || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-light d-flex align-items-center justify-content-center mb-3" style={{ width: '90px', height: '90px', borderRadius: '50px' }}>
                                    <i className="fa fa-phone-alt fa-2x text-primary"></i>
                                </div>
                                <div className="ms-4">
                                    <h4>Mobile</h4>
                                    <p className="mb-0">{settingData?.phone || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-light d-flex align-items-center justify-content-center mb-3" style={{ width: '90px', height: '90px', borderRadius: '50px' }}>
                                    <i className="fa fa-envelope-open fa-2x text-primary"></i>
                                </div>
                                <div className="ms-4">
                                    <h4>Email</h4>
                                    <p className="mb-0">{settingData?.email || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="me-4">
                                    <div
                                        className="bg-light d-flex align-items-center justify-content-center"
                                        style={{ width: "90px", height: "90px", borderRadius: "50px" }}
                                    >
                                        <i className="fas fa-share fa-2x text-primary"></i>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    {socialMediaLinks
                                        .filter(link => link.url) // Only include platforms with URLs
                                        .map(link => (
                                            <div key={link.platform} className={link.platform}>
                                                <Link className="btn btn-lg-square btn-primary rounded-circle mx-2" href={link.url}>
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
            <Footer settingData={settingData} />
        </div>
    );
};

export default Contact;
