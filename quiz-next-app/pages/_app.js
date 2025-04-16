import React, { useEffect } from 'react';
// import { Provider } from 'react-redux';
import Head from 'next/head';
import Script from 'next/script';
import { useDispatch } from 'react-redux';
import { wrapper } from '../store/store';
import { loadUserFromLocalStorage } from '../store/actions/authActions'; // Adjusted import
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/img/favicon.ico" />
      </Head>
    
      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="/lib/wow/wow.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="/lib/easing/easing.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="/lib/waypoints/waypoints.min.js" // Fixed typo from 'jss' to 'js'
        strategy="lazyOnload"
      />
      <Script
        src="/lib/counterup/counterup.min.js"
        strategy="lazyOnload"
      />
      {/* <Script
        src="/lib/owlcarousel/owl.carousel.min.js"
        strategy="lazyOnload"
      /> */}
      <Script
        src="/lib/lightbox/js/lightbox.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="/js/main.js"
        strategy="lazyOnload"
      />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
