import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIData } from '../store/actions/homeActions';
import Head from 'next/head';
// import Spinner from '../components/Spinner';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Service from '../components/Service';
import Features from '../components/Features';
import Faq from '../components/Faq';
import Blog from '../components/Blog';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';

const Home = () => {
  const dispatch = useDispatch();
  const apiCategories = useSelector((state) => state.apiData.data.apicategories);
  const apiCourses = useSelector((state) => state.apiData.data.apicourses);
  const apiFaqs = useSelector((state) => state.apiData.data.apifaqs);
  const apiBlogs = useSelector((state) => state.apiData.data.apiblogs);
  const apiTestimonials = useSelector((state) => state.apiData.data.apitestimonials);
  const apiFeatures = useSelector((state) => state.apiData.data.apifeatures);
  const apiBlocks = useSelector((state) => state.apiData.data.apiblocks);
  const apiSettingData = useSelector((state) => state.apiData.data.apisetting);
  const settingData = apiSettingData && apiSettingData.settings
  const [loading, setLoading] = useState(true);
  const [defaultMeta, setDefaultMeta] = useState({
    title: '',
    description: '',
    keyword: ''
  });
  useEffect(() => {
    dispatch(fetchAPIData('apiSetting'));
    dispatch(fetchAPIData('apiCategories'));
    dispatch(fetchAPIData('apiCourses'));
    dispatch(fetchAPIData('apiFaqs'));
    dispatch(fetchAPIData('apiBlogs'));
    dispatch(fetchAPIData('apiTestimonials'));
    dispatch(fetchAPIData('apiFeatures'));
    dispatch(fetchAPIData('apiBlocks'));
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
      {/* <Spinner /> */}
      <div className="container-fluid header-custom position-relative overflow-hidden p-0">
        <Head>
          <title>{settingData && settingData.site_title}</title>
          <meta name="title" content={defaultMeta.title} />
          <meta name="description" content={defaultMeta.description} />
          <meta name="keyword" content={defaultMeta.keyword} />
        </Head>
        <Header settingData={settingData} />
        <Hero apiBlocks={apiBlocks} />
        <AboutUs apiBlocks={apiBlocks} />
        <Service apiCategories= {apiCategories} apiCourses={apiCourses} apiBlocks={apiBlocks}  />
        <Features apiFeatures = {apiFeatures} apiBlocks={apiBlocks}  />
        <Faq apiFaqs= {apiFaqs} />
        <Blog apiBlogs = {apiBlogs} apiBlocks={apiBlocks} />
        <Testimonial apiTestimonials = {apiTestimonials} apiBlocks={apiBlocks} />
        <Footer settingData={settingData}  />
        <a href="#" className="btn btn-primary btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
      </div>
    </div>
  );
};

export default Home;
