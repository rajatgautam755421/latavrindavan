import { Alert, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserFeesOneData from "../FeesInfo/UserFeesOneData";

const ParentsLogin = () => {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [feesData, setFeesData] = useState([]);
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (id === "") {
      setShow(true);
      setLoading(false);
    } else {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/student/bills/${id}`
        );
        console.log(data);
        setLoading(false);
        setError(false);
        setFeesData(data);
        setId("");
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
            Student Id Cannot Be Empty
          </Alert>
        </Snackbar>
      )}

      {error && (
        <h1 style={{ fontSize: "20px", margin: "20px auto", color: "red" }}>
          {error}
        </h1>
      )}
      <div style={{ width: "100%", margin: "20px 0px" }}>
        <form style={{ width: "50%", margin: "0px auto" }}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Student Id
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={id}
              onChange={(e) => setId(e.target.value)}
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

      {feesData
        ? feesData.length === 0 && (
            <h1 style={{ fontSize: "20px" }}>
              No Fees Details.Please Post Something
            </h1>
          )
        : null}
      {feesData
        ? feesData.map((value, index) => {
            const TotalFeesAStudentShouldPayIs = feesData
              .slice(0, index + 1)
              .reduce((a, b) => {
                return a + b.feesToBePaid;
              }, 0);
            const monthValue = feesData.slice(0, index + 1).map((a, index) => {
              return (
                <>
                  {a.feesToBePaid !== 0 && (
                    <>
                      <u>({a.month} )</u>
                    </>
                  )}
                </>
              );
            });

            const cashFlow = feesData.slice(0, index + 1).map((a) => {
              return (
                <>
                  {a.feesToBePaid !== 0 && (
                    <>
                      {index !== 0 && "+"}({a.feesToBePaid} )
                    </>
                  )}
                </>
              );
            });
            return (
              <>
                <UserFeesOneData
                  value={value}
                  index={index}
                  TotalFeesAStudentShouldPayIs={TotalFeesAStudentShouldPayIs}
                  monthValue={monthValue}
                  cashFlow={cashFlow}
                />
              </>
            );
          })
        : null}
    </>
  );
};

export default ParentsLogin;
