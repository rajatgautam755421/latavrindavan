import { Alert, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/");
    }
  }, [pathname]);
  const handleClick = async (e) => {
    e.preventDefault();
    if (userName === "" || password === "") {
      setShow(true);
      setError(false);
      setLoading(false);
    } else {
      setLoading(true);
      try {
        const { data } = await axios.post(
          "http://localhost:4000/api/v1/admin/login",
          { userName, password }
        );
        console.log("Hello");
        console.log(data);
        setLoading(false);
        setError(false);
        localStorage.setItem("userInfo", JSON.stringify(data._id));
        localStorage.removeItem("parentsInfo");

        navigate("/");
      } catch (error) {
        console.log(error.response.data.msg);
        setError(error.response.data.msg);
        setLoading(false);
      }
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      {show && (
        <Snackbar open={show} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Fields Cannot Be Empty
          </Alert>
        </Snackbar>
      )}
      <h1 style={{ fontSize: "30px", margin: "20px auto" }}>
        Login To Continue
      </h1>
      {error && (
        <h1 style={{ fontSize: "20px", margin: "20px auto", color: "red" }}>
          {error}
        </h1>
      )}
      <div style={{ width: "100%", margin: "20px 0px" }}>
        <form style={{ width: "50%", margin: "0px auto" }}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress
                style={{ color: "white", width: "25px", height: "20px" }}
              />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
