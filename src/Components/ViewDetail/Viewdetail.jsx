import React, { useEffect, useState } from "react";
import "./ViewDetail.css";
import ClassMain from "../Class/ClassMain";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import NoAuth from "../NoAuth/NoAuth";

const Viewdetail = () => {
  const [firstName, setFirstName] = useState("");
  const [serachData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === "62922bbd0dd8d10449ce4e72") {
      setUser(userInfo);
    }
    console.log(userInfo);
  }, [pathname]);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (firstName !== "") {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/student/name/${firstName}`
      );
      try {
        console.log(loading);
        console.log(data);
        setSearchData(data);
        console.log(serachData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }
  };
  return (
    <>
      {user ? (
        <>
          <div style={{ margin: "50px auto" }} className="container-fluid ">
            <form
              className=" image-title2"
              style={{ width: "50%", margin: "0px auto" }}
            >
              <div className="w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900  rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-green-500  dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500"
                  placeholder="Search student name here"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyUp={handleSearch}
                />
              </div>
            </form>
          </div>
          <div
            className="container"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {loading && <CircularProgress style={{ color: "white" }} />}
          </div>

          {firstName !== "" ? (
            <>
              {serachData.length !== 0 ? (
                <h1
                  style={{
                    color: "white",
                    fontSize: "30px",
                    marginTop: "-30px",
                    textAlign: "center",
                  }}
                >
                  We Found {serachData.length} Students
                </h1>
              ) : (
                <h1 style={{ color: "white", textAlign: "center" }}>
                  No Students Found
                </h1>
              )}
              <div
                style={{
                  width: "100vw",
                  marginTop: "-30px",
                  marginLeft: "-18px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    maxWidth: "400px",
                    minWidth: "300px",
                    opacity: "0.92",

                    margin: "0px auto",
                  }}
                >
                  {serachData
                    ? serachData.map((value) => {
                        console.log(value);
                        return (
                          <>
                            <ClassMain value={value} />
                          </>
                        );
                      })
                    : null}
                </div>
              </div>
            </>
          ) : (
            <h1 style={{ color: "white", textAlign: "center" }}>
              Please Search Something
            </h1>
          )}
        </>
      ) : (
        <>
          <NoAuth />
        </>
      )}
    </>
  );
};

export default Viewdetail;
