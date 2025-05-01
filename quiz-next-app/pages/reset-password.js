// /pages/reset-password.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [emailVar, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { email } = router.query; // Extract email from query params
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!email) {
      router.push("/"); // If no email, redirect to home page
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
  
    setLoading(true);
  
    try {
      const res = await axios.post(`${API_URL}/api/v1/reset-password`, {
        email,
        newPassword,
      });
      if (res.data.success) {
        // If the code is verified, redirect to reset password page
        router.push(`/`);
      }
      setMessage(res.data.message);
  
      // ✅ Clear input fields
      setEmail("");
      setNewPassword("");
      setconfirmPassword("");
  
      setLoading(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };
  

  return (
<div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-5 col-md-7 col-sm-9">
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <h2 className="text-center text-primary mb-4">Reset Password</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={emailVar}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" disabled={loading} className="btn btn-primary">
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>

              {message && (
                <div className="alert alert-info text-center mt-3">
                  {message}
                </div>
              )}
            </form>

            <div className="text-center mt-3">
              <Link href="/" className="text-decoration-none">Back to home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
