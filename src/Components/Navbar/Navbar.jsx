import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
const Navbar = () => {
  const [user, setUser] = useState("");
  const { pathname } = useLocation();
  const [render, setRender] = useState(false);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === "62922bbd0dd8d10449ce4e72") {
      setUser(userInfo);
    }
  }, [pathname, render]);

  const handleLogout = () => {
    setRender(!render);
    localStorage.removeItem("userInfo");
  };

  return (
    <>
      <>
        <nav
          style={{
            backgroundColor: "#D8DFE6",
            position: "sticky",
            top: "0",
            zIndex: "2",
          }}
          className="navbar navbar-expand-lg navbar-light bg-gray"
        >
          <NavLink className="navbar-brand" to="/">
            <SchoolIcon style={{ fontSize: "40px" }} />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            style={{
              marginLeft: "50px",
              fontWeight: "600",
            }}
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <>
                <li className="nav-item ">
                  <NavLink aria-current="page" to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    aria-current="page"
                    to="/data-entry"
                    className="nav-link"
                  >
                    Data Entry
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink aria-current="page" to="/class" className="nav-link">
                    View Class
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    aria-current="page"
                    to="/data-view"
                    className="nav-link"
                  >
                    View Detail
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    aria-current="page"
                    to="/parent-login"
                    className="nav-link"
                  >
                    Student's Bill
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    aria-current="page"
                    to="/marksheet"
                    className="nav-link"
                  >
                    Marksheet Entry
                  </NavLink>
                </li>
                {user ? (
                  <li className="nav-item">
                    <a
                      aria-current="page"
                      href="/"
                      className="nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                ) : (
                  <li className="nav-item">
                    <NavLink
                      aria-current="page"
                      to="/login"
                      className="nav-link"
                    >
                      Admin
                    </NavLink>
                  </li>
                )}
              </>

              <>
                <li className="nav-item">
                  <NavLink
                    aria-current="page"
                    to="/student-marksheet"
                    className="nav-link"
                  >
                    View Payment
                  </NavLink>
                </li>
              </>
            </ul>
          </div>
        </nav>
      </>
    </>
  );
};

export default Navbar;
