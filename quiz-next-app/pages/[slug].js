import React, { useState, useEffect, useRef } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Head from "next/head";
import Login from '../components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIData } from '../store/actions/homeActions';
import { loadUserFromLocalStorage, checkToken } from '../store/actions/authActions';
import { useRouter } from 'next/router'; 

const Quiz = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const apiSettingData = useSelector((state) => state.apiData.data.apisetting);
    const settingData = apiSettingData && apiSettingData.settings
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); // Error message state
    const { slug } = useRouter().query;
    const router = useRouter();
    const [courseData, setCourseData] = useState(null);
    const [answers, setAnswers] = useState({
        question1: '', // Empty by default to ensure validation
        question2: '',
        question3: ''
    });
    const [defaultMeta, setDefaultMeta] = useState({
        title: '',
        description: '',
        keyword: ''
    });
    console.log('courseData', courseData)
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
    const handleOptionChange = (questionId, option) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: option,
        }));
        setError('');
    };

    const swiperRef = useRef(null);

    const handleNextSlide = () => {
        const currentIndex = swiperRef.current?.swiper?.activeIndex;
        const currentQuestion = courseData.quizzes[0].questions[currentIndex];

        if (!answers[currentQuestion.id]) {
            setError("Please select an option before proceeding.");
            return;
        }

        swiperRef.current?.swiper?.slideNext();
    };

    const handlePrevSlide = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const checkUserAndToken = async () => {
        const user = localStorage.getItem('user');

        if (!user) {
            // If no user is found, open the modal
            setIsModalOpen(true);
            return;
        }

        // If a user is present, check if the token is expired
        const result = await dispatch(checkToken());

        if (result.expired) {
            setIsModalOpen(true);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            await dispatch(loadUserFromLocalStorage());
            await checkUserAndToken();
        };

        initialize();

        // Set up an interval to check for user status every few seconds
        const intervalId = setInterval(() => {
            checkUserAndToken();
        }, 1000); // Adjust the interval time as needed

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, [dispatch]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        if (slug) {
            fetch(`${API_URL}/api/v1/course/${slug}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setCourseData(data.data);
                        setTimeLeft(data.data.quizzes[0].quiz_time * 60); // Convert quiz time from minutes to seconds
                    }
                });
        }
    }, [slug]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1); // Decrease time by 1
            }, 1000);
            return () => clearInterval(timerId); // Clean up interval on unmount or when timeLeft changes
        }
        else {
            // Time is up, navigate to home page
            router.push('/');
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes} min ${secs < 10 ? '0' : ''}${secs} sec`;
    };
    const handleSubmitQuiz = () => {
        const questions = courseData.quizzes[0].questions;
        let score = 0;
    
        questions.forEach((q) => {
            if (answers[q.id] === q.correct_answer) {
                score += 1;
            }
        });
    
        const resultData = {
            totalQuestions: questions.length,
            correctAnswers: score,
            userAnswers: answers,
            quizTitle: courseData.quizzes[0].title,
        };
    
        // Save result in localStorage or pass via query string/state (easiest: localStorage)
        localStorage.setItem("quizResult", JSON.stringify(resultData));
    
        router.push("/thankyou");
    };
    if (!courseData) return <div>Loading...</div>;

    return (
        <div className="body-custom">
            <div className="container-fluid header-custom position-relative overflow-hidden p-0">
                <Head>
                    <title>{settingData && settingData.site_title}</title>
                    <meta name="title" content={defaultMeta.title} />
                    <meta name="description" content={defaultMeta.description} />
                    <meta name="keyword" content={defaultMeta.keyword} />
                    <link rel="stylesheet" href="/css/animation.css" />
                </Head>
                <Header settingData={settingData} />
                <div className="hero-header overflow-hidden px-5 text-style">
                    <div className="container  justify-content-center px-4">
                        <div className=" d-flex justify-content-between ">
                            <div className="step-bar">
                                <div className="fill" ></div>
                            </div>
                            <div className="timer ">
                                <h4 className="text-timer">Time Left: {formatTime(timeLeft)}</h4>
                            </div>
                        </div>
                        <Swiper
                            ref={swiperRef}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation={false}
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]}
                        >
                            {courseData.quizzes[0].questions.map((question, index) => (
                                <SwiperSlide key={question.id}>
                                    <div className="card-container bg-light">
                                        <div className="card-item text-center">
                                            <div className="card-thumb">
                                                <img
                                                    src="https://templates.seekviral.com/qzain/quiz/Quiz12/assets/images/girl.png"
                                                    alt="img"
                                                />
                                            </div>
                                            <h5>
                                                Question <span id="activeStep">{index + 1}</span>/{courseData.quizzes[0].questions.length}
                                            </h5>
                                        </div>
                                        <section>
                                            <div className="position-relative">
                                                <div className="align-items-center gap-2 overflow-visible">
                                                    <div
                                                        className="px-4 py-3 rounded bg-light"
                                                        data-test-id="test-question-field"
                                                    >
                                                        <h1 className="quiz-question">{question.question}</h1>
                                                        <fieldset>
                                                            <div className="row">
                                                                {['a', 'b', 'c', 'd'].map((optionKey) => {
                                                                    const optionValue = question[`option_${optionKey}`];
                                                                    return (
                                                                        <div className="col-md-6" key={optionKey}>
                                                                            <div className="input-field">
                                                                                <div className="radio-field bounce-left">
                                                                                    <input
                                                                                        type="radio"
                                                                                        name={`question_${question.id}`}
                                                                                        value={optionKey}
                                                                                        checked={answers[question.id] === optionKey}
                                                                                        onChange={() => handleOptionChange(question.id, optionKey)}
                                                                                    />
                                                                                    <label>{optionValue}</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                    <div className="next-prev d-flex justify-content-between mt-3">
                                                        {index === courseData.quizzes[0].questions.length - 1 ? (
                                                            <div className="next-prev">
                                                                <button type="button" className="prev" onClick={handlePrevSlide}>
                                                                    <i className="fas fa-arrow-left"></i> Last question
                                                                </button>
                                                                <button type="button" className="next" onClick={handleSubmitQuiz}>
                                                                    Submit <i className="fas fa-arrow-right"></i>
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="next-prev">
                                                                {index > 0 && (
                                                                    <button type="button" className="prev" onClick={handlePrevSlide}>
                                                                        <i className="fas fa-arrow-left"></i> Previous
                                                                    </button>
                                                                )}
                                                                <button type="button" className="next" onClick={handleNextSlide}>
                                                                    Next <i className="fas fa-arrow-right"></i>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {error && <p className="text-danger mt-2">{error}</p>}
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                </div>
                <Footer settingData={settingData} />
                <Login show={isModalOpen} onClose={handleCloseModal} />
            </div>
        </div>

    );
};

export default Quiz;
