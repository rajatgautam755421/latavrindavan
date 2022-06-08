import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Snackbar,
  Tooltip,
} from "@mui/material";

const ClassMain = ({ value, setRender, render }) => {
  const { pathname } = useLocation();
  console.log(value);
  const [feesLeft, setFeesLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/student/delete/${
          value ? value._id : null
        }`
      );
      setLoading(true);
      setRender(!render);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const feesLeft1 = parseInt(value.feesTotal) - parseInt(value.feesPaid);
  useEffect(() => {
    if (feesLeft1 < 0) {
      setFeesLeft(0);
    } else {
      setFeesLeft(feesLeft1);
    }
  }, []);

  return (
    <>
      {loading && (
        <CircularProgress style={{ width: "40px", color: "black" }} />
      )}

      <div style={{ textAlign: "left" }} className="container  mt-5">
        <h1
          style={{
            fontSize: "25px",
            textDecoration: "underline",
            marginBottom: "10px",
            color: "black",
          }}
        >
          <b>
            {value.firstName} {value.lastName}
          </b>
        </h1>
        <h2 style={{ fontSize: "18px", margin: "5px 0px", color: "black" }}>
          Roll Number : {value.rollno}
        </h2>
        <h2 style={{ fontSize: "18px", margin: "5px 0px", color: "black" }}>
          Address : {value.address}
        </h2>
        <h2 style={{ fontSize: "18px", margin: "5px 0px", color: "black" }}>
          Parent's Contact Number : {value.parentsContactNumber}
        </h2>
        <div
          className="container-fluid"
          style={{
            display: "flex",
            justifyContent: "flex-start",

            marginLeft: "-13px",
          }}
        >
          <NavLink to={`/individual-detail/${value ? value._id : null}`}>
            <p
              className="leading-relaxed  text-blue text-base"
              style={{ color: "black" }}
            >
              View More..
            </p>
          </NavLink>
          {pathname !== "/data-view" && (
            <Tooltip title="Delete">
              <DeleteIcon
                onClick={handleDelete}
                style={{ color: "red", cursor: "pointer", marginLeft: "20px" }}
              />
            </Tooltip>
          )}
        </div>

        {/* <div
          style={{ backgroundColor: "white" }}
          className="flex rounded-lg  p-2 sm:flex-row flex-col"
        >
          <div className="flex-grow">
            <div className="row">
              <div className="col">
                <ul style={{ textAlign: "left" }}>
                  <li>
                    <p className="leading-relaxed text-black text-base">
                      Name:{value.firstName}
                      {value.middleName} {value.lastName}
                    </p>
                  </li>
                  <li>
                    <p className="leading-relaxed text-black text-base">
                      Roll Number:{value.rollno}
                    </p>
                  </li>
                  <li>
                    <p className="leading-relaxed text-black text-base">
                      Address:{value.address}
                    </p>
                  </li>
                  <li>
                    <p className="leading-relaxed text-black text-base">
                      Parents Name:{value.parentsName}
                    </p>
                  </li>
                  <li></li>
                </ul>
              </div>
              <div className="col">
                <ul style={{ textAlign: "left" }}>
                  <li>
                    <p className="leading-relaxed text-black text-base">
                      Class:{value.className}
                    </p>
                  </li>
                  <li>
                    <p className="leading-relaxed text-black text-base">
                      Section:{value.section}
                    </p>
                  </li>
                  <li>
                    <p className="leading-relaxed text-black text-base">
                      Parents Number:{value.parentsContactNumber}
                    </p>
                  </li>
                  <li>
                    <p className="leading-relaxed text-black text-base">
                      Fees Left:Rs.{feesLeft}
                    </p>
                  </li>
                  <li>
                    <p className="leading-relaxed text-black text-base">
                      Delete :{" "}
                      <DeleteIcon
                        onClick={handleDelete}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <NavLink to={`/individual-detail/${value ? value._id : null}`}>
              <p className="leading-relaxed text-blue text-base">View More..</p>
            </NavLink>
          </div>
        </div> */}
        <hr style={{ color: "black", height: "10px" }} />
      </div>
    </>
  );
};

export default ClassMain;
