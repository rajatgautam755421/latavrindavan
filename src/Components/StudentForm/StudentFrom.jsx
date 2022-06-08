import { Snackbar, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NoAuth from "../NoAuth/NoAuth";

const StudentFrom = () => {
  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [address, setaddress] = useState("");
  const [className, setclassName] = useState("");
  const [rollno, setrollno] = useState("");
  const [section, setsection] = useState("");
  const [parentsName, setparentsName] = useState("");
  const [parentsContactNumber, setparentsContactNumber] = useState("");
  const [feesPaid, setfeesPaid] = useState("");
  const [feesLeft, setfeesLeft] = useState("");
  const [discount, setdiscount] = useState("");
  const [posted, setPosted] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rollError, setRollError] = useState("");
  const [render, setRender] = useState(false);
  const [feesTotal, setFeesTotal] = useState("");
  const [feeError, setFeeserror] = useState(false);
  const [user, setUser] = useState("");
  const { pathname } = useLocation();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, [pathname]);
  const handleClose = () => {
    setPosted(false);
    setEmpty(false);
    setRender(false);
    setFeeserror(false);
  };
  const handleclick = async (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      className === "" ||
      rollno === "" ||
      parentsName === "" ||
      parentsContactNumber === ""
    ) {
      console.log("Fields Are Empty");
      setEmpty(true);
    } else {
      if (parseInt(feesTotal) < parseInt(feesPaid)) {
        setLoading(false);
        setFeeserror(true);
      } else {
        try {
          setLoading(true);
          const { data } = await axios.post(
            "http://localhost:4000/api/v1/students",
            {
              firstName,
              middleName,
              lastName,
              contactNumber,
              address,
              className,
              rollno,
              section,
              parentsName,
              parentsContactNumber,
              feesPaid,
              feesTotal,
            }
          );
          if (data.status === "Failure") {
            setRender(true);
            setRollError(data.msg);
          } else {
            setfirstName("");
            setPosted("");
            setaddress("");
            setclassName("");
            setcontactNumber("");
            setlastName("");
            setmiddleName("");
            setFeesTotal("");
            setparentsContactNumber("");
            setparentsName("");
            setsection("");
            setrollno("");
            setfeesPaid("");
            setPosted(true);
          }
          setLoading(false);
        } catch (error) {
          console.log(error.response.data);
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      {user ? (
        <>
          {rollError !== "" && (
            <Snackbar
              open={render}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {rollError}
              </Alert>
            </Snackbar>
          )}
          {feeError && (
            <Snackbar
              open={feeError}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Total fees is Less than fees paid
              </Alert>
            </Snackbar>
          )}
          {posted && (
            <Snackbar
              open={posted}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Succesfully Posted Student Data
              </Alert>
            </Snackbar>
          )}
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
          <div className="container-fluid">
            <h1 className="mb-4 mt-5 font-bold text-lg mr-6">
              Fill all the details
            </h1>
            <div className="row">
              <div className="col-md-3"></div>
              <div
                style={{ marginLeft: "50px", textAlign: "left" }}
                className="col-md-8"
              >
                {" "}
                <div className="mb-4">
                  <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                          style={{ color: "white" }}
                        >
                          First Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="grid-first-name"
                          type="text"
                          placeholder="Your name"
                          value={firstName}
                          onChange={(e) => setfirstName(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                          style={{ color: "white" }}
                        >
                          Middle Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="grid-first-name"
                          type="text"
                          placeholder="Your name"
                          value={middleName}
                          onChange={(e) => setmiddleName(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                          style={{ color: "white" }}
                        >
                          Last Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="grid-first-name"
                          type="text"
                          placeholder="Your name"
                          value={lastName}
                          onChange={(e) => setlastName(e.target.value)}
                        />
                      </div>
                      <div
                        className="w-full md:w-2/2 px-3 mb-10 md:mb-0"
                        style={{ margin: "10px 0px" }}
                      >
                        {" "}
                        <label
                          className="block text-white-700 text-sm font-bold mb-2"
                          htmlFor="Weight"
                          style={{ color: "white" }}
                        >
                          Contact Number
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Contact Number"
                          value={contactNumber}
                          onChange={(e) => setcontactNumber(e.target.value)}
                        />
                      </div>
                      <div
                        className="w-full md:w-2/2 px-3 mb-6 md:mb-0"
                        style={{ margin: "10px 0px" }}
                      >
                        {" "}
                        <label
                          className="block text-white-700 text-sm font-bold mb-2"
                          htmlFor="Weight"
                          style={{ color: "white" }}
                        >
                          Address <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                        />
                      </div>
                      <div
                        className="w-full md:w-2/2 px-3 mb-6 md:mb-0"
                        style={{ margin: "10px 0px" }}
                      >
                        {" "}
                        <label
                          className="block text-white-700 text-sm font-bold mb-2"
                          htmlFor="Weight"
                          style={{ color: "white" }}
                        >
                          Parents Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Parents Name"
                          value={parentsName}
                          onChange={(e) => setparentsName(e.target.value)}
                        />
                      </div>
                      <div
                        className="w-full md:w-2/2 px-3 mb-6 md:mb-0"
                        style={{ margin: "10px 0px" }}
                      >
                        {" "}
                        <label
                          className="block text-white-700 text-sm font-bold mb-2"
                          htmlFor="Weight"
                          style={{ color: "white" }}
                        >
                          Class <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Class"
                          value={className}
                          onChange={(e) => setclassName(e.target.value)}
                        />
                      </div>
                      <div
                        className="w-full md:w-2/2 px-3 mb-6 md:mb-0"
                        style={{ margin: "10px 0px" }}
                      >
                        {" "}
                        <label
                          className="block text-white-700 text-sm font-bold mb-2"
                          htmlFor="Weight"
                          style={{ color: "white" }}
                        >
                          Section
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Section"
                          value={section}
                          onChange={(e) => setsection(e.target.value)}
                        />
                      </div>
                      <div
                        className="w-full md:w-2/2 px-3 mb-6 md:mb-0"
                        style={{ margin: "10px 0px" }}
                      >
                        {" "}
                        <label
                          className="block text-white-700 text-sm font-bold mb-2"
                          htmlFor="Weight"
                          style={{ color: "white" }}
                        >
                          Rollno <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="rollno"
                          value={rollno}
                          onChange={(e) => setrollno(e.target.value)}
                        />
                      </div>
                      <div
                        className="w-full md:w-2/2 px-3 mb-6 md:mb-0"
                        style={{ margin: "10px 0px" }}
                      >
                        {" "}
                        <label
                          className="block text-white-700 text-sm font-bold mb-2"
                          htmlFor="Weight"
                          style={{ color: "white" }}
                        >
                          Parents Number <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Parents Number"
                          value={parentsContactNumber}
                          onChange={(e) =>
                            setparentsContactNumber(e.target.value)
                          }
                        />
                      </div>
                      {/* <div
                    className="w-full md:w-2/2 px-3 mb-6 md:mb-0"
                    style={{ margin: "10px 0px" }}
                  >
                    {" "}
                    <label
                      className="block text-white-700 text-sm font-bold mb-2"
                      htmlFor="Weight"
                      style={{ color: "white" }}
                    >
                      Fees Paid <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Fees"
                      value={feesPaid}
                      onChange={(e) => setfeesPaid(e.target.value)}
                    />
                  </div> */}
                      {/* <div
                    className="w-full md:w-2/2 px-3 mb-6 md:mb-0"
                    style={{ margin: "10px 0px" }}
                  >
                    {" "}
                    <label
                      className="block text-white-700 text-sm font-bold mb-2"
                      htmlFor="Weight"
                      style={{ color: "white" }}
                    >
                      Total fees <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Total Fees"
                      value={feesTotal}
                      onChange={(e) => setFeesTotal(e.target.value)}
                    />
                  </div> */}
                    </div>
                    <button
                      onClick={handleclick}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      {loading ? (
                        <CircularProgress
                          style={{
                            color: "white",
                            width: "25px",
                            height: "20px",
                          }}
                        />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </>
      ) : (
        <NoAuth />
      )}
    </>
  );
};

export default StudentFrom;
