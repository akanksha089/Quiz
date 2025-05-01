import { useState } from 'react';
import Script from 'next/script';
import styles from '../styles/Modal.module.css';
import { useDispatch } from 'react-redux';
import { login, signUp } from '../store/actions/authActions';
import { ImCross } from "react-icons/im";
import Link from 'next/link';


export default function Login({ show, onClose }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailSign, setEmailSign] = useState('');
  const [passwordSign, setPasswordSign] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentTab, setCurrentTab] = useState('login'); // Track the current tab

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    try {
      // Dispatch login action and wait for it to complete
      await dispatch(login({ email, password }));
      onClose(); // Close the modal only after successful login
       // Reload the page after successful login
    window.location.reload();
    } catch (error) {
      try {
        const parsed = JSON.parse(error.message); // Try to parse the error message
        setErrorMessage(parsed.error || 'Login failed'); // Use parsed error
      } catch {
        setErrorMessage('Login failed'); // Fallback message
      }
      // Set the error message if login fails
      // setErrorMessage('Login failed: ' + error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    try {
      // Dispatch signup action and wait for it to complete
      await dispatch(signUp({ name, role, email: emailSign, password: passwordSign, confirmPassword: confirmPassword }));
      // Switch to login tab after successful signup
      setCurrentTab('login');
      // Optionally, clear signup fields
      setName('');
      setEmailSign('');
      setPasswordSign('');
      setconfirmPassword('');
    } catch (error) {
      try {
        const parsed = JSON.parse(error.message); // Try to parse the error message
        setErrorMessage(parsed.error || 'Signup failed'); // Use parsed error
      } catch {
        setErrorMessage('Signup failed'); // Fallback message
      }

    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <div  className="cross-button " onClick={onClose} >
                <ImCross size={28} color="pink" />
                </div>
        <div className={styles.flexin}>
          <div className="tabs tabs-style-flip">
            <nav>
              <ul>
                <li className={currentTab === 'login' ? 'tab-current' : ''}>
                  <a href="#section-flip-1" onClick={() => setCurrentTab('login')}>
                    <span><i className="fa fa-lock"></i> Login</span>
                  </a>
                </li>
                <li className={currentTab === 'signup' ? 'tab-current' : ''}>
                  <a href="#section-flip-2" onClick={() => setCurrentTab('signup')}>
                    <span><i className="fa fa-user-plus"></i> Sign Up</span>
                  </a>
                </li>
                {/* <div  className="cross-button" onClick={onClose} >
                <ImCross size={30} color="pink" />
                </div> */}
              </ul>
            </nav>
            <div className="content-wrap bg-white">
              <section id="section-flip-1" className={currentTab === 'login' ? 'content-current' : ''}>
                <form className="ui large form" onSubmit={handleLogin}>
                  <div className="ui segment">
                    <h2 className="">Log-In to Your Account</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message */}
                    <div className=" my-2">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {/* <label htmlFor="email">Your Email</label> */}
                    </div>
                    <div className=" my-2">
                    {/* <div className="form-floating my-2"> */}
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {/* <label htmlFor="password">Your Password</label> */}
                    </div>
                    <div className="m-2 text-start">
                    <Link href="/forgot-password" >Forgot Password</Link>
                </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-3"
                      >
                        LOGIN
                      </button>
                    </div>
                    
                  </div>
                  <div className="ui error message"></div>
                </form>
                <div className="mt-2">
                  Do not have an account yet? <a href="#" onClick={() => setCurrentTab('signup')}>SIGN UP</a>
                </div>
              </section>
              <section id="section-flip-2" className={currentTab === 'signup' ? 'content-current' : ''}>
                <form className="ui large form bg-white" onSubmit={handleSignup}>
                  <div className="ui segment">
                    <h2 className="">Sign up for an Account</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message */}

                    <div className=" my-2">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {/* <label htmlFor="name">Your Name</label> */}
                    </div>
                    <div className=" my-2">
                      <input
                        type="email"
                        className="form-control"
                        id="emailSign"
                        placeholder="Your Email"
                        value={emailSign}
                        onChange={(e) => setEmailSign(e.target.value)}
                      />
                      {/* <label htmlFor="emailSign">Your Email</label> */}
                    </div>
                    <div className=" my-2">
                      <input
                        type="password"
                        className="form-control"
                        id="passwordSign"
                        placeholder="Create Password"
                        value={passwordSign}
                        onChange={(e) => setPasswordSign(e.target.value)}
                      />
                      {/* <label htmlFor="passwordSign">Create Password</label> */}
                    </div>
                    <div className=" my-2">
                      <input
                        type="password"
                        className="form-control"
                        id="passwordSign"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                      />
                      {/* <label htmlFor="passwordSign">Confirm Password</label> */}
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-3"
                      >
                        REGISTER
                      </button>
                    </div>
                  </div>
                  <div className="ui error message"></div>
                </form>
                <div className="mt-2">
                  Already have an account? <a href="#" onClick={() => setCurrentTab('login')}>LOG IN</a>
                </div>
              </section>
            </div>
            <Script
              id="cbp-tabs"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                (function(window) {
                  'use strict';
                  function extend(a, b) {
                    for (var key in b) {
                      if (b.hasOwnProperty(key)) {
                        a[key] = b[key];
                      }
                    }
                    return a;
                  }
                  function CBPFWTabs(el, options) {
                    this.el = el;
                    this.options = extend({}, this.options);
                    extend(this.options, options);
                    this._init();
                  }
                  CBPFWTabs.prototype.options = { start: 0 };
                  CBPFWTabs.prototype._init = function() {
                    this.tabs = [].slice.call(this.el.querySelectorAll('nav > ul > li'));
                    this.items = [].slice.call(this.el.querySelectorAll('.content-wrap > section'));
                    this.current = -1;
                    this._show();
                    this._initEvents();
                  };
                  CBPFWTabs.prototype._initEvents = function() {
                    var self = this;
                    this.tabs.forEach(function(tab, idx) {
                      tab.addEventListener('click', function(ev) {
                        ev.preventDefault();
                        self._show(idx);
                      });
                    });
                  };
                  CBPFWTabs.prototype._show = function(idx) {
                    if (this.current >= 0) {
                      this.tabs[this.current].className = this.items[this.current].className = '';
                    }
                    this.current = idx !== undefined ? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
                    this.tabs[this.current].className = 'tab-current';
                    this.items[this.current].className = 'content-current';
                  };
                  window.CBPFWTabs = CBPFWTabs;
                })(window);
                (function() {
                  [].slice.call(document.querySelectorAll('.tabs')).forEach(function(el) {
                    new CBPFWTabs(el);
                  });
                })();
                `,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
