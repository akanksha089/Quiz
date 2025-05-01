// /pages/verify-reset-code.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function VerifyResetCode() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading

    try {
      // Call your Node API to verify the reset code
      const res = await axios.post(`${API_URL}/api/v1/verify-reset-code`, { email, code });

      if (res.data.success) {
        // If the code is verified, redirect to reset password page
        router.push(`/reset-password?email=${email}`);
      }
      setMessage(res.data.message);
    } catch (err) {
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
              <h2 className="text-center text-primary mb-4">Verify Reset Code</h2>
  
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
  
                <div className="mb-3">
                  <label htmlFor="resetCode" className="form-label">Reset Code</label>
                  <input
                    type="text"
                    id="resetCode"
                    className="form-control"
                    placeholder="Enter the reset code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>
  
                <div className="d-grid">
                  <button type="submit" disabled={loading} className="btn btn-primary">
                    {loading ? "Verifying..." : "Verify Code"}
                  </button>
                </div>
  
                {message && (
                  <div className="alert alert-info text-center mt-3">
                    {message}
                  </div>
                )}
              </form>
  
              <div className="text-center mt-3">
                <a href="/forgot-password" className="text-decoration-none">Resend Code</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}
