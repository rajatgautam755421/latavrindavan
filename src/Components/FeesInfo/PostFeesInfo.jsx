import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import NoAuth from "../NoAuth/NoAuth";
import "./PostFees.css";

const PostFeesInfo = ({ render, setRender, setRefresh, refresh }) => {
  const [totalFees, settotalFees] = useState(null);
  const [feesPaid, setfeesPaid] = useState(null);
  const [discount, setdiscount] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [negative, setNegative] = useState(false);
  const [larger, setLarger] = useState(false);
  const [month, setMonth] = useState("Baishakh");
  const [error, setError] = useState("");

  const { id, firstName, lastName } = useParams();
  console.log(feesPaid, totalFees);
  const studentId = id;
  const handleClose = () => {
    setEmpty(false);
    setNegative(false);
    setLarger(false);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (
      totalFees !== 0 &&
      feesPaid !== 0 &&
      totalFees !== null &&
      feesPaid !== null
    ) {
      if (totalFees < 0 || feesPaid < 0 || discount < 0) {
        setNegative(true);
      } else {
        if (parseInt(totalFees) < parseInt(feesPaid)) {
          setLarger(true);
        } else {
          try {
            const { data } = await axios.post(
              "http://localhost:4000/api/v1/student/details",
              {
                studentId,
                totalFees,
                feesPaid,
                discount,
                month,
              }
            );
            console.log(data);
            setRender(!render);
            setdiscount("");
            setfeesPaid("");
            settotalFees("");
            setRefresh(!refresh);
            setError(false);
          } catch (error) {
            console.log(error.response.data.msg);
            setError(error.response.data.msg);
          }
        }
      }
    } else {
      setEmpty(true);
    }
  };
  const [user, setUser] = useState("");
  const { pathname } = useLocation();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === "62922bbd0dd8d10449ce4e72") {
      setUser(userInfo);
    }
  }, [pathname]);
  console.log(month);
  return (
    <>
      {user ? (
        <>
          {empty && (
            <Snackbar
              open={empty}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Fields Are empty
              </Alert>
            </Snackbar>
          )}
          {negative && (
            <Snackbar
              open={negative}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Field Values Caannot Be Negative
              </Alert>
            </Snackbar>
          )}
          {larger && (
            <Snackbar
              open={larger}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Fees Paid Must Be Less Than Or Equals To Total Fees.
              </Alert>
            </Snackbar>
          )}
          <h1 style={{ fontSize: "30px", margin: "10px 0px" }}>
            Complete Fees Details Of "{firstName} {lastName}"
          </h1>

          <section className="text-gray-600 body-font relative">
            <h1
              style={{
                fontSize: "18px",
                margin: "10px 0px",
                color: "red",
              }}
            >
              {error ? error : null}
            </h1>
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-white"
                      >
                        Total Fees
                      </label>
                      <input
                        type="number"
                        id="name"
                        name="name"
                        value={totalFees}
                        style={{ backgroundColor: "white", color: "black" }}
                        onChange={(e) => settotalFees(e.target.value)}
                        className="noscroll w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out update__input"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-white"
                      >
                        Fees Paid
                      </label>
                      <input
                        type="number"
                        id="name"
                        name="name"
                        value={feesPaid}
                        onChange={(e) => setfeesPaid(e.target.value)}
                        className="noscroll w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out update__input"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-white"
                      >
                        Discount
                      </label>
                      <input
                        type="number"
                        id="email"
                        name="email"
                        value={discount}
                        onChange={(e) => setdiscount(e.target.value)}
                        className="noscroll w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out update__input"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-1/2 mt-4">
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        style={{ height: "50px" }}
                        onChange={(e) => setMonth(e.target.value)}
                      >
                        <option value={"Baishakh"}>Baishakh</option>
                        <option value={"Jestha"}>Jestha</option>
                        <option value={"Ashadh"}>Ashadh</option>
                        <option value={"Shrawan"}>Shrawan</option>
                        <option value={"Bhadau"}>Bhadau</option>

                        <option value={"Asoj"}>Asoj</option>
                        <option value={"Kartik"}>Kartik</option>
                        <option value={"Mangsir"}>Mangsir</option>
                        <option value={"Poush"}>Poush</option>
                        <option value={"Magh"}>Magh</option>
                        <option value={"Falgun"}>Falgun</option>
                        <option value={"Chaitra"}>Chaitra</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <button
                      onClick={handleClick}
                      className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                      Button
                    </button>
                  </div>
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

export default PostFeesInfo;
