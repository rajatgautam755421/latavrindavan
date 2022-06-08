import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ClassMain from "./ClassMain";
import "./Classes.css";
import NoAuth from "../NoAuth/NoAuth";

const Classes = () => {
  const [user, setUser] = useState("");
  const { pathname } = useLocation();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === "62922bbd0dd8d10449ce4e72") {
      setUser(userInfo);
    }
  }, [pathname]);
  const { className } = useParams();
  const [render, setRender] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  console.log(className);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/students/class/${className}`
        );
        console.log(data);
        setStudents(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [render]);

  const filteredValues = students
    ? students.filter((Events) => {
        return Events.firstName
          ? Events.firstName.toLowerCase().includes(search.toLowerCase())
          : null;
      })
    : null;

  const keyPress = () => {
    if (filteredValues.length === 0) {
      setError(true);
      console.log("No Result");
    } else {
      setError(false);
      console.log("Yes Events");
    }
  };

  return (
    <>
      {user ? (
        <div style={{ width: "100vw" }}>
          <div
            style={{
              backgroundColor: "white",
              maxWidth: "400px",
              minWidth: "300px",
              opacity: "0.96",
              margin: "0px auto",
            }}
          >
            {students.length !== 0 && (
              <form
                className="d-flex container mt-5"
                style={{ width: "80%", marginBottom: "10px" }}
              >
                <input
                  className="form-control mt-2 searchbar__main"
                  type="search"
                  placeholder="Search Student By First Name"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={keyPress}
                  id="search__main__id"
                />
              </form>
            )}

            {loading && (
              <CircularProgress
                style={{
                  color: "white",
                  width: "30px",
                  height: "30px",
                  textAlign: "center",
                }}
              />
            )}
            <>
              <h1
                class="sm:text-3xl mt-2 mb-1 text-3xl font-medium title-font text-black"
                style={{
                  textAlign: "center",
                }}
              >
                Class {className}
              </h1>{" "}
              {students.length !== 0 && (
                <h1
                  class="sm:text-3xl mt-1 mb-1 text-2xl font-medium title-font text-black"
                  style={{ fontSize: "20px", textAlign: "center" }}
                >
                  Total Students In Class {className} Is{" "}
                  {students ? students.length : null}
                </h1>
              )}
              {students.length !== 0 && (
                <>
                  {error ? (
                    <h4
                      style={{
                        margin: "10px 0px",
                        textAlign: "center",
                        color: "black",
                        fontSize: "18px",
                      }}
                    >
                      No Result Found For {search ? search.toUpperCase() : null}
                    </h4>
                  ) : null}
                </>
              )}
              {students.length === 0 && (
                <h3 class="sm:text-3xl mt-5 text-3xl font-medium title-font text-black">
                  No Students In Class {className}
                </h3>
              )}
              <div className="container text-gray-600">
                {filteredValues
                  ? filteredValues.map((value) => {
                      return (
                        <>
                          <ClassMain
                            value={value}
                            render={render}
                            setRender={setRender}
                          />
                        </>
                      );
                    })
                  : null}
              </div>
            </>
          </div>
        </div>
      ) : (
        <NoAuth />
      )}
    </>
  );
};

export default Classes;
