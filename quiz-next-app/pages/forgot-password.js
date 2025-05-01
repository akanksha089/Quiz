// /pages/forgot-password.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading

    try {
      // Make the API call to your Node.js backend
      const res = await axios.post(`${API_URL}/api/v1/api-password/forgot`, { email });
      if (res.data.success) {
        // If the code is verified, redirect to reset password page
        router.push(`/verify-reset-code`);
      }
      // Handle success response
      setMessage(res.data.message);
    } catch (err) {
      // Handle error response
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7 col-sm-9">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h2 className="text-center text-primary mb-4">Forgot Password</h2>
  
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
  
                <div className="d-grid mb-3">
                  <button type="submit" disabled={loading} className="btn btn-primary">
                    {loading ? 'Sending...' : 'Send Reset Code'}
                  </button>
                </div>
  
                {message && (
                  <div className="alert alert-info text-center" role="alert">
                    {message}
                  </div>
                )}
              </form>
  
              <div className="text-center mt-3">
                <a href="/" className="text-decoration-none">Back to</a>
              </div>
            </div>
          </div>
     
        </div>
      </div>
    </div>
  </div>
  
  
  );
}
