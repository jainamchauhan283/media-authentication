import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("credential");
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      {userData ? (
        <div>
          <h2>Welcome, {userData.name}!</h2>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
