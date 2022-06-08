import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const ParentsMarksheet = () => {
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/marksheet/${studentId}`
      );
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.msg);
      setError(error.response.data.msg);
      setLoading(false);
    }
  };
  return (
    <>
      <div style={{ width: "100%", margin: "20px 0px" }}>
        {error !== "" && <h1 style={{ color: "red" }}>{error}</h1>}
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
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
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

export default ParentsMarksheet;
