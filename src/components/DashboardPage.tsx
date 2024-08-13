// import { googleLogout } from "@react-oauth/google";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const DashboardPage = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     const storedUserData = localStorage.getItem("userData");
//     if (storedUserData) {
//       setUserData(JSON.parse(storedUserData));
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     googleLogout();
//     localStorage.removeItem("credential");
//     localStorage.removeItem("userData");
//     navigate("/");
//   };

//   return (
//     <div>
//       <h1>Dashboard Page</h1>
//       {userData ? (
//         <div>
//           <h2>Welcome, {userData.name}!</h2>
//           <p>Email: {userData.email}</p>
//         </div>
//       ) : (
//         <p>Loading user data...</p>
//       )}

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default DashboardPage;
import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [facebookUserData, setFacebookUserData] = useState<any>(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const googleUserData = localStorage.getItem("userData");
    const facebookUserData = localStorage.getItem("facebookUserData");

    if (googleUserData) {
      setUserData(JSON.parse(googleUserData));
    } else if (facebookUserData) {
      setFacebookUserData(JSON.parse(facebookUserData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("credential");
    localStorage.removeItem("userData");
    localStorage.removeItem("facebookAccessToken");
    localStorage.removeItem("facebookUserData");
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      {userData ? (
        <div>
          <h2>Welcome from Google, {userData.name}!</h2>
          <p>Email: {userData.email}</p>
        </div>
      ) : facebookUserData ? (
        <div>
          <h2>Welcome from Facebook, {facebookUserData.name}!</h2>
          <p>Email: {facebookUserData.email}</p>
          {/* Show user profile picture if available */}
          {facebookUserData.picture && (
            <img src={facebookUserData.picture.data.url} alt="Profile" />
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
