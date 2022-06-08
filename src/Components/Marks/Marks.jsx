import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NoAuth from "../NoAuth/NoAuth";

const Marks = () => {
  const [user, setUser] = useState("");
  const { pathname } = useLocation();
  const [render, setRender] = useState(false);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === "62922bbd0dd8d10449ce4e72") {
      setUser(userInfo);
    }
  }, [pathname, render]);
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/marksheet/6291c1c5b6556b47cb3c8e24`
        );

        console.log(data.data[0]._id);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData1();
  }, []);

  return (
    <>
      {user ? (
        <>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                <div className="lg:w-1/5 md:w-1/2 p-4 w-full">
                  {" "}
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/marksheet/nursery`}
                  >
                    <div
                      style={{ backgroundColor: "#D8DFE6", height: "60px" }}
                      className="block relative h-48 rounded overflow-hidden"
                    >
                      <h1
                        style={{
                          fontSize: "35px",
                          fontWeight: "bold",
                          color: "black",

                          opacity: "0.7",
                          marginTop: "5px",
                        }}
                      >
                        Nursery
                      </h1>
                    </div>
                  </Link>
                </div>
                <div className="lg:w-1/5 md:w-1/2 p-4 w-full">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/marksheet/lkg`}
                  >
                    <div
                      style={{ backgroundColor: "#D8DFE6", height: "60px" }}
                      className="block relative h-48 rounded overflow-hidden"
                    >
                      <h1
                        style={{
                          fontSize: "35px",
                          fontWeight: "bold",
                          color: "black",
                          opacity: "0.7",
                          marginTop: "5px",
                        }}
                      >
                        LKG
                      </h1>
                    </div>
                  </Link>
                </div>
                <div className="lg:w-1/5 md:w-1/2 p-4 w-full">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/marksheet/ukg`}
                  >
                    <div
                      style={{ backgroundColor: "#D8DFE6", height: "60px" }}
                      className="block relative h-48 rounded overflow-hidden"
                    >
                      <h1
                        style={{
                          fontSize: "35px",
                          fontWeight: "bold",
                          color: "black",
                          opacity: "0.7",
                          marginTop: "5px",
                        }}
                      >
                        UKG{" "}
                      </h1>
                    </div>
                  </Link>
                </div>
                <div className="lg:w-1/5 md:w-1/2 p-4 w-full">
                  <Link style={{ textDecoration: "none" }} to={`/marksheet/1`}>
                    <div
                      style={{ backgroundColor: "#D8DFE6", height: "60px" }}
                      className="block relative h-48 rounded overflow-hidden"
                    >
                      <h1
                        style={{
                          fontSize: "35px",
                          fontWeight: "bold",
                          color: "black",
                          opacity: "0.7",
                          marginTop: "5px",
                        }}
                      >
                        Class 1
                      </h1>
                    </div>
                  </Link>
                </div>
                <div className="lg:w-1/5 md:w-1/2 p-4 w-full">
                  <Link style={{ textDecoration: "none" }} to={`/marksheet/2`}>
                    <div
                      style={{ backgroundColor: "#D8DFE6", height: "60px" }}
                      className="block relative h-48 rounded overflow-hidden"
                    >
                      <h1
                        style={{
                          fontSize: "35px",
                          fontWeight: "bold",
                          color: "black",
                          opacity: "0.7",
                          marginTop: "5px",
                        }}
                      >
                        Class 2
                      </h1>
                    </div>
                  </Link>
                </div>
                <div className="lg:w-1/5 md:w-1/2 p-4 w-full">
                  <Link style={{ textDecoration: "none" }} to={`/marksheet/3`}>
                    <div
                      style={{ backgroundColor: "#D8DFE6", height: "60px" }}
                      className="block relative h-48 rounded overflow-hidden"
                    >
                      <h1
                        style={{
                          fontSize: "35px",
                          fontWeight: "bold",
                          color: "black",
                          opacity: "0.7",
                          marginTop: "5px",
                        }}
                      >
                        Class 3
                      </h1>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <NoAuth />
      )}
    </>
  );
};

export default Marks;
