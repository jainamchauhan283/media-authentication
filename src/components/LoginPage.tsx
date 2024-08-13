import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (response: any) => {
    try {
      const { credential } = response;
      if (credential) {
        const decodedToken: any = jwtDecode(credential);
        console.log("Decoded Token:", decodedToken);
        localStorage.setItem("credential", credential);
        localStorage.setItem("userData", JSON.stringify(decodedToken));
        navigate("/dashboard");
      } else {
        alert("Failed to retrieve ID token");
      }
    } catch (error) {
      console.error("Google login failed", error);
      alert("Google login failed");
    }
  };

  const handleGoogleError = () => {
    alert("Google login failed");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>
  );
};

export default LoginPage;
