import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState("");
  const { pathname } = useLocation();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === "62922bbd0dd8d10449ce4e72") {
      setUser(userInfo);
    }
  }, [pathname]);
  return (
    <>
      {user && <h1 style={{ fontSize: "30px", margin: "20px 0px" }}>Admin</h1>}
      <div className="Image__main__home">
        <div className="image-title">
          <h3>Student Management System(ABC school)</h3>
        </div>
        <Link to="/class">
          <button
            style={{ position: "relative", marginTop: "80px" }}
            className="bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            View Classes
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
