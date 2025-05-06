import React, { useState, useEffect } from 'react';
import { generatePdf } from "../../components/generatePdf"; // Ensure this utility function is in place
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIData } from '../../store/actions/homeActions';
import { useRouter } from 'next/router';
import { fetchUser } from '../../store/actions/dashboardActions';

const Certificate = () => {
    const dispatch = useDispatch();
    const apiSettingData = useSelector((state) => state.apiData.data.apisetting);
    const settingData = apiSettingData && apiSettingData.settings
    const { userData } = useSelector((state) => state?.dashboardData);
    const router = useRouter();
    const { id } = router.query;
    const [quizResult, setQuizResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [defaultMeta, setDefaultMeta] = useState({
        title: '',
        description: '',
        keyword: ''
    });
    console.log('apiSettingData', settingData)
    useEffect(() => {
        dispatch(fetchAPIData('apiSetting'));
        dispatch(fetchUser()); // Fetch user data on component mount
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
    const handleDownload = async () => {
        alert('Processing...'); // Show processing alert

        try {
            await generatePdf("certificate-container");
            alert('Your PDF has been downloaded successfully!');
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("There was an error generating your PDF. Please try again.");
        }
    };

    // useEffect(() => {
    //     const data = localStorage.getItem('quizResult');
    //     if (data) {
    //         setQuizResult(JSON.parse(data));
    //     }
    // }, []);

    useEffect(() => {
        const fetchCertificateData = async () => {
            if (!id) return;

            try {
                const user = localStorage.getItem('user');
                const { token } = JSON.parse(user);
                const response = await fetch(`${API_URL}/api/v1/certified-quizzes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch certificate data");
                }

                const result = await response.json();
                setQuizResult(result.data);
            } catch (error) {
                console.error("Error fetching certificate data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificateData();
    }, [id]);


    if (loading) return <p>Loading Certificate...</p>;
    if (!quizResult) return <p>Certificate data not found.</p>;


    return (
        <div className="body-custom">
            <div className="container-fluid position-relative overflow-hidden p-0">
                <Head>
                    <title>{settingData && settingData.site_title}</title>
                    <meta name="title" content={defaultMeta.title} />
                    <meta name="description" content={defaultMeta.description} />
                    <meta name="keyword" content={defaultMeta.keyword} />
                </Head>
                <Header settingData={settingData} />
                <div className="content-container">
                    <div className="d-flex justify-content-end mt-5 mx-5">
                        <button
                            className="btn btn-primary rounded-pill py-3 px-4"
                            onClick={handleDownload}
                        >
                            Download Certificate
                        </button>
                    </div>
                    <div className="d-flex justify-content-center ">
                        <div id="certificate-container" className="certificate-container">
                            <div className="certificate">
                                <div className="water-mark-overlay"></div>

                                {/* Certificate Header */}
                                <div className="certificate-header text-center">
                                    {/* <img
                    src="https://rnmastersreview.com/img/logo.png"
                    className="logo"
                    alt="Logo"
                  /> */}
                                    <h1 className="display-6 text-primary m-0">
                                        <i className="fas fa-question me-3"></i>
                                        Quiz
                                    </h1>
                                </div>

                                {/* Certificate Body */}
                                <div className="certificate-body text-center pt-5">
                                    <h3 className="certificate-title">
                                        <strong>{quizResult?.quiz_title}</strong>
                                    </h3>
                                    <h1>Certificate of Completion </h1>
                                    <p className="student-name">{userData?.user?.name}</p>
                                    <div className="certificate-content">
                                        <div className="about-certificate">
                                            <p>
                                                has completed  on topic {""}

                                                <strong>{quizResult?.quiz_title}</strong>

                                            </p>
                                            <p>
                                                <strong>Attempt Date:</strong>{" "}
                                                {new Date(quizResult?.attempt_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <p className="topic-title">
                                            The Topic consists of {quizResult?.total_questions} questions and includes the following:


                                        </p>
                                        <div className="text-center">
                                            <p className="topic-description text-muted">
                                                {`Total Questions: ${quizResult?.total_questions}, Correct Answers: ${quizResult?.correct}, Incorrect Answers: ${quizResult?.wrong}`}

                                            </p>


                                            <div className="certificate-summary text-center">
                                                <p>
                                                    Quiz Score: {quizResult?.score}%
                                                </p>
                                                <p>
                                                    {quizResult?.certificate_awarded === 1 || true ? `Certificate Awarded (Valid till ${new Date(quizResult?.certificate_expiration).toLocaleDateString()})` : "Not Eligible for Certificate"}

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Certificate Footer */}
                                <div className="certificate-footer text-muted">
                                    <div className="row">
                                        <div className="col-md-6 text-left">
                                            <p>Principal: ______________________</p>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p>Accredited by</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>Endorsed by</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <Footer settingData={settingData} />
            </div>
        </div>

    );
};

export default Certificate;
