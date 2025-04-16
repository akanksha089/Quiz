import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIData } from '../store/actions/homeActions';

function Thankyou() {
    const dispatch = useDispatch();
    const apiSettingData = useSelector((state) => state.apiData.data.apisetting);
    const settingData = apiSettingData && apiSettingData.settings
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [defaultMeta, setDefaultMeta] = useState({
        title: '',
        description: '',
        keyword: ''
    });
    console.log('apiSettingData', settingData)
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
    useEffect(() => {
        const storedResult = localStorage.getItem("quizResult");
        if (storedResult) {
            setResult(JSON.parse(storedResult));
        }
    }, []);

    if (!result) return <div>Loading...</div>;
    return (
        <div className='body-custom'>
            <Head>
                <title>{settingData && settingData.site_title}</title>
                <meta name="title" content={defaultMeta.title} />
                <meta name="description" content={defaultMeta.description} />
                <meta name="keyword" content={defaultMeta.keyword} />
            </Head>
            <Header settingData={settingData} />
            <div className="container-fluid header-custom position-relative overflow-hidden p-0">

                <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa" }}>
                    <div className="container py-5 text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s" style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                                <i className="fas fa-check-circle display-1 text-primary mb-4"></i>
                                <h1 className="display-4 font-weight-bold">Thank You For Your Time!</h1>
                                <h2 className="mb-4 text-secondary">Your submission has been received</h2>
                                <h2>{result.quizTitle}</h2>
                                <p className="mb-4 text-muted">
                                You answered <strong>{result.correctAnswers}</strong> out of{' '}
                                <strong>{result.totalQuestions}</strong> questions correctly.
                                </p>
                                <div className='d-flex justify-content-between'>
                                    <Link className="btn btn-primary rounded-pill py-3 px-5" href="/">
                                        Go Back To Home
                                    </Link>
                                    <Link className="btn btn-primary rounded-pill py-3 px-5" href="/certificate">
                                        Go Your Cerificate
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <Footer settingData={settingData}  />
            </div>
        </div>



    )
}

export default Thankyou