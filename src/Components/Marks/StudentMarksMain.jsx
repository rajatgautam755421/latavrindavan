import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const StudentMarksMain = ({ value }) => {
  const [marks, setMarks] = useState([]);
  const studentId = value._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/marksheet/${studentId}`
        );
        setMarks(data.data);
        console.log(marks);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
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
          {marks.length === 0 && (
            <NavLink to={`/add-marks/${value ? value._id : null}`}>
              <p
                className="leading-relaxed  text-blue text-base"
                style={{
                  color: "#2a7a2e",
                  fontWeight: "bold",
                  border: "1px solid #2a7a2e",
                  marginBottom: "5px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  borderRadius: "10px",
                }}
              >
                Add MARKS
              </p>
            </NavLink>
          )}

          {marks.length !== 0 && (
            <>
              <NavLink to={`/marksheet-update/${value ? value._id : null}`}>
                <p
                  className="leading-relaxed  text-blue text-base"
                  style={{
                    color: "#2a7a2e",
                    fontWeight: "bold",
                    border: "1px solid #2a7a2e",
                    marginBottom: "5px",
                    marginLeft: "3px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    borderRadius: "10px",
                  }}
                >
                  Update MARKSHEET
                </p>
              </NavLink>
              <NavLink
                target="_blank"
                to={`/marksheet-view/${value ? value._id : null}`}
              >
                <p
                  className="leading-relaxed  text-blue text-base"
                  style={{
                    color: "#2a7a2e",
                    fontWeight: "bold",
                    border: "1px solid #2a7a2e",
                    marginBottom: "5px",
                    marginLeft: "3px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    borderRadius: "10px",
                  }}
                >
                  View MARKSHEET
                </p>
              </NavLink>
            </>
          )}
        </div>

        <hr style={{ border: "2px solid black" }} />
      </div>
    </>
  );
};

export default StudentMarksMain;
