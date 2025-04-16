import React, { useState, useEffect } from 'react';
import { generatePdf } from "../components/generatePdf"; // Ensure this utility function is in place
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIData } from '../store/actions/homeActions';

const Certificate = () => {
  const dispatch = useDispatch();
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
                  <img
                    src="https://rnmastersreview.com/img/logo.png"
                    className="logo"
                    alt="Logo"
                  />
                </div>

                {/* Certificate Body */}
                <div className="certificate-body text-center">
                  <p className="certificate-title">
                    <strong>
                      RENR NCLEX AND CONTINUING EDUCATION (CME) Review Masters
                    </strong>
                  </p>
                  <h1>Certificate of Completion</h1>
                  <p className="student-name">Matthew Taylor</p>
                  <div className="certificate-content">
                    <div className="about-certificate">
                      <p>
                        has completed [hours] hours on topic title here online on
                        Date [Date of Completion]
                      </p>
                    </div>
                    <p className="topic-title">
                      The Topic consists of [hours] Continuity hours and includes
                      the following:
                    </p>
                    <div className="text-center">
                      <p className="topic-description text-muted">
                        Contract administrator - Types of claim - Claim Strategy -
                        Delay analysis - The preliminaries to a claim - The
                        essential elements to a successful claim - Responses - Claim
                        preparation and presentation
                      </p>
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
