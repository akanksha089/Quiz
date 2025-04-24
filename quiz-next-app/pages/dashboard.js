import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIData } from '../store/actions/homeActions';
import { fetchUser , fetchAllQuiz } from '../store/actions/dashboardActions';

export default function Dashboard() {
    const dispatch = useDispatch();
    const apiSettingData = useSelector((state) => state?.apiData?.data?.apisetting);
      // Getting data from Redux store
  const { userData,  error } = useSelector((state) => state?.dashboardData);
  const quizData= useSelector((state) => state?.dashboardData?.quizData);
    const settingData = apiSettingData?.settings;
    const [loading, setLoading] = useState(true);
    const [defaultMeta, setDefaultMeta] = useState({
        title: '',
        description: '',
        keyword: ''
    });
    const [activeTab, setActiveTab] = useState('profile')
console.log('quizData', quizData)
    const handleTabClick = (tab) => setActiveTab(tab)
    useEffect(() => {
        dispatch(fetchAPIData('apiSetting'));
        dispatch(fetchUser()); // Fetch user data on component mount
        dispatch(fetchAllQuiz()); // Fetch user data on component mount
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
    return (
        <div className="body-custom">
            <Head>
                <title>{settingData?.site_title || 'Dashboard'}</title>
                <meta name="title" content={defaultMeta.title} />
                <meta name="description" content={defaultMeta.description} />
                <meta name="keyword" content={defaultMeta.keyword} />
            </Head>
            {/* <Header settingData={settingData} /> */}
            <div className="">

                <div className="row">

                    {/* Sidebar */}
                    <div className="col-md-3 col-lg-2 sidebar bg-white shadow-sm py-4">
                        <h4 className="text-center text-pink mb-4">My Dashboard</h4>
                        <ul className="nav flex-column">
                            {['profile', 'password', 'results', 'certificates'].map((tab) => (
                                <li className="nav-item mb-2" key={tab}>
                                    <button
                                        className={`nav-link btn w-100 text-start ${activeTab === tab ? 'text-pink fw-bold' : 'text-dark'}`}
                                        onClick={() => handleTabClick(tab)}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Main Content */}
                    <div className="col-md-9 col-lg-10 py-5 px-4 bg-light min-vh-100">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="text-pink">Welcome, {userData?.user?.name} 👋</h2>
                            <img src="https://thumbs.dreamstime.com/z/woman-profile-cartoon-graphic-design-vector-illustration-eps-63800342.jpg" alt="Profile" width="50" height="50" className="rounded-circle border" />
                        </div>
                        {/* Tab Content */}
                        {activeTab === 'profile' && (
                            <div className="profile-full-section">
                                {/* Banner Section */}
                                <div className="profile-hero-banner rounded-1 ">
                                    <img src="https://png.pngtree.com/thumb_back/fh260/back_pic/02/50/63/71577e1cf59d802.jpg" alt="Banner" className="w-100 h-100 object-cover" />
                                </div>

                                {/* Floating Profile Card */}
                                <div className="container">
                                    <div className="profile-main-card shadow-lg">
                                        <div className="row g-4 align-items-center">
                                            {/* Profile Image */}
                                            <div className="col-md-3 text-center">
                                                <img
                                                    src="https://thumbs.dreamstime.com/z/woman-profile-cartoon-graphic-design-vector-illustration-eps-63800342.jpg"
                                                    alt="Profile"
                                                    className="rounded-circle profile-img"
                                                    width="120"
                                                    height="120"
                                                />
                                            </div>

                                            {/* User Info */}
                                            <div className="col-md-9">
                                                <h3 className="fw-bold text-pink">{userData?.user?.name}</h3>
                                                <p className="mb-1"><i className="bi bi-envelope"></i> {userData?.user?.email}</p>
                                                <p className="mb-0"><i className="bi bi-patch-check-fill text-success"></i> Active Member</p>
                                            </div>
                                        </div>
                                        <p className='m-3 text-center'>
                                        A quiz user is someone who engages with quizzes for fun, learning, or competition, often testing knowledge, exploring new topics, or challenging friends across various platforms or subjects.
                                        </p>
                                        <hr className="my-4" />

                                        {/* Details Section */}
                                        <div className="row text-center">
                                            <div className="col-md-4">
                                                <h6 className="text-muted">Total Exams</h6>
                                                <h4 className="text-pink">5</h4>
                                            </div>
                                            <div className="col-md-4">
                                                <h6 className="text-muted">Certificates</h6>
                                                <h4 className="text-pink">3</h4>
                                            </div>
                                            <div className="col-md-4">
                                                <h6 className="text-muted">Average Score</h6>
                                                <h4 className="text-pink">88%</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container mt-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fw-bold text-pink">Recommended Quizzes</h5>
                                        <Link href="/" className="btn btn-outline-pink btn-sm">See All Quizzes</Link>
                                    </div>

                                    <div className="quiz-slider d-flex gap-3 overflow-auto pb-2">
                                        {quizData && quizData.quizzes && quizData.quizzes.length > 0 ? (

                                        quizData && quizData.quizzes.map((quiz, index) => (
                                            <div className="card quiz-card shadow-sm flex-shrink-0 p-3 mb-3" key={index} style={{ minWidth: '280px', borderRadius: '12px' }}>
                                            <div className="card-body">
                                                <h5 className="fw-bold text-dark mb-2">📘 Quiz {index + 1}: {quiz?.title}</h5>
                                                <p className="text-muted mb-3">
                                                    {quiz?.question_count} Questions • {quiz?.quiz_time} min
                                                </p>
                                                {/* <button className="btn btn-pink w-100 fw-semibold">🚀 Start Quiz</button> */}
                                                <Link href={`/${quiz?.course_slug || ''}`} className="btn btn-light rounded-pill text-primary py-2 px-4">
                                                🚀 Start Quiz
                                                                                            </Link>
                                            </div>
                                        </div>
                                        )) ): ""}
                                    </div>
                                </div>

                            </div>


                        )}

                        {activeTab === 'password' && (
                            <div className="card mb-4">
                                <div className="card-header bg-pink text-white">Change Password</div>
                                <div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label>Current Password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label>New Password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <button type="submit" className="btn btn-pink">Update</button>
                                    </form>
                                </div>
                            </div>
                        )}
                        {activeTab === 'results' && (
                            <>
                                <div className="row g-4 mb-4">
                                    <div className="col-md-4">
                                        <div className="card card-animate text-center">
                                            <div className="card-body">
                                                <h5 className="card-title text-muted">Total Exams</h5>
                                                <h2 className="text-pink">5</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card card-animate text-center">
                                            <div className="card-body">
                                                <h5 className="card-title text-muted">Certificates</h5>
                                                <h2 className="text-pink">3</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card card-animate text-center">
                                            <div className="card-body">
                                                <h5 className="card-title text-muted">Average Score</h5>
                                                <h2 className="text-pink">88%</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header bg-pink text-white">Exam Results</div>
                                    <div className="card-body table-responsive">
                                        <table className="table table-striped text-center">
                                            <thead>
                                                <tr>
                                                    <th>Exam</th>
                                                    <th>Date</th>
                                                    <th>Certificate Expiry</th>
                                                    <th>Total Questions</th>
                                                    <th>Attempted</th>
                                                    <th>Correct</th>
                                                    <th>Wrong</th>
                                                    <th>Result</th>
                                                    <th>Certificate</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>HTML Basics</td>
                                                    <td>2025-04-01</td>
                                                    <td>2026-04-01</td>
                                                    <td>20</td>
                                                    <td>20</td>
                                                    <td>18</td>
                                                    <td>2</td>
                                                    <td>90%</td>
                                                    <td><button className="btn btn-sm btn-pink">Download</button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'certificates' && (
                            <div className="card">
                                <div className="card-header bg-pink text-white">My Certificates</div>
                                <div className="card-body">
                                    <p>No certificates available yet.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer settingData={settingData} />
        </div>
    )
}
