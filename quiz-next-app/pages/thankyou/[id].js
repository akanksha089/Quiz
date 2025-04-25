import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIData } from '../../store/actions/homeActions';
import { useRouter } from 'next/router';

function Thankyou() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const apiSettingData = useSelector((state) => state.apiData.data.apisetting);
    const settingData = apiSettingData && apiSettingData.settings
    const [loading, setLoading] = useState(true);
    const [quizResult, setQuizResult] = useState(null);
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
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('quizResult');
            if (data) {
                setQuizResult(JSON.parse(data));
            }
        }
    }, []);
    useEffect(() => {
        // Check if the quiz has been already submitted
        const quizSubmitted = localStorage.getItem('quizSubmitted');
    
        if (quizSubmitted !== 'true') {
          // If the quiz hasn't been submitted, redirect to the quiz page
          router.push('/quiz'); // or wherever your quiz page is
        }
    
        // Disable back navigation (to prevent user from going back to quiz)
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = () => {
          window.history.pushState(null, '', window.location.href);
        };
    
        return () => {
          window.onpopstate = null; // Clean up the history state when component unmounts
        };
      }, [router]);
    

    if (!quizResult) return <p>Loading...</p>;

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
                                <h1 className="display-4 font-weight-bold">🎉 Thank You for Completing the Quiz!</h1>
                                <h2 className="mb-4 text-secondary">Your submission has been received</h2>
                                <h2>{quizResult?.quiz_title}</h2>
                                <p className="mb-4 text-muted">
                                    You answered <strong>{quizResult?.correct}</strong> out of{' '}
                                    <strong>{quizResult?.total_questions}</strong> questions correctly.
                                </p>
                                <p><strong>Score:</strong> {quizResult?.score}</p>

                                <p><strong>Certificate Awarded:</strong> {quizResult.certificate_awarded ? 'Yes' : 'No'}</p>

                                <div className='d-flex justify-content-between'>
                                    <Link className="btn btn-primary rounded-pill py-3 px-5" href="/">
                                        Go Back To Home
                                    </Link>
                                    {quizResult?.certificate_awarded == "1" ? (
                                        <Link
                                            href={`/certificate/${id}`}
                                            className="btn btn-primary rounded-pill py-3 px-5"
                                        >
                                            Go Your Certificate
                                        </Link>
                                    ) : (
                                        <div className="btn btn-primary rounded-pill py-3 px-5 disabled">
                                            Not eligible
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <Footer settingData={settingData} />
            </div>
        </div>



    )
}

export default Thankyou