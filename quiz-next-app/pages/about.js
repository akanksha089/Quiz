import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
import Features from '../components/Features';
import Blog from '../components/Blog';
import Footer from '../components/Footer';
import Link from "next/link";
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIData } from '../store/actions/homeActions';


const About = () => {
  const dispatch = useDispatch();
  const apiBlogs = useSelector((state) => state.apiData.data.apiblogs);
  const apiBlocks = useSelector((state) => state.apiData.data.apiblocks);
  const apiFeatures = useSelector((state) => state.apiData.data.apifeatures);
  const apiSettingData = useSelector((state) => state.apiData.data.apisetting);
  const settingData = apiSettingData && apiSettingData.settings
  const [loading, setLoading] = useState(true);
  const [defaultMeta, setDefaultMeta] = useState({
    title: '',
    description: '',
    keyword: ''
  });
  console.log('apiSettingData', settingData)
  useEffect(() => {
    dispatch(fetchAPIData('apiSetting'));
    dispatch(fetchAPIData('apiBlogs'));
    dispatch(fetchAPIData('apiBlocks'));
    dispatch(fetchAPIData('apiFeatures'));
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
    <div className='body-custom'>
      <div className="container-fluid header-custom position-relative overflow-hidden p-0">
      <Head>
          <title>{settingData && settingData.site_title}</title>
          <meta name="title" content={defaultMeta.title} />
          <meta name="description" content={defaultMeta.description} />
          <meta name="keyword" content={defaultMeta.keyword} />
        </Head>
        <Header settingData={settingData} />
        <div className="container-fluid bg-breadcrumb">
          <ul className="breadcrumb-animation">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
            <h3 className="display-3 mb-4 wow fadeInDown" data-wow-delay="0.1s">About Us</h3>
            <ol className="breadcrumb justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active text-primary">About</li>
            </ol>
          </div>
        </div>

        <AboutUs apiBlocks={apiBlocks} />
        <Features apiFeatures = {apiFeatures} apiBlocks={apiBlocks}  />
        <Blog apiBlogs = {apiBlogs} apiBlocks={apiBlocks} />
        <Footer settingData={settingData}  />
        <a href="#" className="btn btn-primary btn-lg-square back-to-top">
          <i className="fa fa-arrow-up"></i>
        </a>
      </div>
      {/* <Login show={isModalOpen} onClose={handleCloseModal}/> */}
    </div>
  );
};

export default About;
