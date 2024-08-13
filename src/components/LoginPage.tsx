import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import FacebookLogin from "@greatsumini/react-facebook-login";

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

  // const handleFacebookSuccess = (response: any) => {
  //   console.log("Facebook login response:", response);
  //   if (response.accessToken) {
  //     localStorage.setItem("facebookAccessToken", response.accessToken);
  //     localStorage.setItem("facebookUserData", JSON.stringify(response));
  //     navigate("/dashboard");
  //   } else {
  //     alert("Failed to retrieve Facebook access token");
  //   }
  //   if (response?.status === "unknown") {
  //     console.error("Sorry!", "Something went wrong with facebook Login.");
  //     return;
  //   }
  //   console.log(response);
  // };
  const handleFacebookSuccess = (response: any) => {
    if (response.accessToken) {
      fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${response.accessToken}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Facebook User Data:", data);
          localStorage.setItem("facebookAccessToken", response.accessToken);
          localStorage.setItem("facebookUserData", JSON.stringify(data));
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error fetching Facebook user data", error);
          alert("Failed to retrieve user data from Facebook");
        });
    } else {
      alert("Failed to retrieve Facebook access token");
    }
  };

  const handleFacebookError = (error: any) => {
    console.error("Facebook login failed", error);
    alert("Facebook login failed");
  };

  return (
    <div>
      <h1>Social Media Login</h1>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
      <FacebookLogin
        appId="356792917479868"
        autoLoad={false}
        fields="name,email,picture"
        onSuccess={handleFacebookSuccess}
        onFail={handleFacebookError}
        style={{
          backgroundColor: '#4267b2',
          color: '#fff',
          fontSize: '16px',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '4px',
          margin: '5px',
        }}
      />
    </div>
  );
};

export default LoginPage;
