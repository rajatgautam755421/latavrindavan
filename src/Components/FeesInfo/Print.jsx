import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { Divider } from "@mui/material";

const Print = ({
  setPrint,
  value,
  id,
  TotalFeesAStudentShouldPayIs,
  monthValue,
}) => {
  console.log(value);
  const [student, setStudent] = useState({});
  const [show, setShow] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/student/${id}`
        );
        console.log(data);
        setStudent(data.data);
        console.log(student);
        // setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  const handlePrint = () => {
    setShow(1);
    setTimeout(() => {
      window.print();
    }, 1000);
  };
  return (
    <>
      <div
        className="container-fluid"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100vw",
          height: "130vh",
          zIndex: "10000",
          backgroundColor: "white",
        }}
      >
        {show === 0 ||
          (show === 2 && (
            <Tooltip title="Close">
              <CloseIcon
                onClick={() => setPrint(false)}
                style={{
                  color: "black",
                  cursor: "pointer",
                  width: "40px",
                  height: "40px",
                }}
              />
            </Tooltip>
          ))}
        <h1 style={{ fontSize: "32px", color: "red" }}>
          The Lata Vrindavan Montessori School.
        </h1>

        <h1 style={{ color: "black", margin: "20px 0px", fontSize: "28px" }}>
          Billing Information Of {student ? student.firstName : null}{" "}
          {student ? student.middleName : null}
          {student ? student.lastName : null}
        </h1>
        <h1 style={{ color: "black", margin: "20px 0px", fontSize: "20px" }}>
          Billing Information Of :{" "}
          {value.month ? value.month.toUpperCase() : null}
        </h1>
        <div
          className="container mt-4"
          style={{ width: "70%", border: "2px solid black" }}
        >
          <table
            className="table"
            style={{ width: "100%", margin: "0px auto", border: "1" }}
          >
            <tr>
              <td scope="col">Student's Name</td>

              <th scope="col">
                {student ? student.firstName : null}{" "}
                {student ? student.middleName : null}
                {student ? student.lastName : null}
              </th>
            </tr>

            <tbody>
              <tr>
                <td>Class</td>
                <th>"{student ? student.className : null}"</th>
              </tr>
              {student.section !== "" && (
                <tr>
                  <td>Section</td>
                  <th>"{student ? student.section : null}"</th>
                </tr>
              )}
              <tr>
                <td>Parent's Name</td>
                <th>{student ? student.parentsName : null}</th>
              </tr>

              <tr>
                <td>Parents Contact Number</td>
                <th>{student ? student.parentsContactNumber : null}</th>
              </tr>
              <tr>
                <td>Address</td>
                <th>{student ? student.address : null}</th>
              </tr>
              <tr>
                <td>Total Fees</td>
                <th>Rs.{value ? value.totalFees : null}</th>
              </tr>
              <tr>
                <td>Fees Paid</td>
                <th>Rs.{value ? value.feesPaid : null}</th>
              </tr>
              <tr>
                <td>Remaining Fees Of {value.month}</td>
                <th>
                  Rs.{value.feesToBePaid} With{" "}
                  {value.discount !== null ? (
                    <>{value.discount}% discount</>
                  ) : (
                    "No Discount"
                  )}
                </th>
              </tr>
              <tr>
                <td>Total Fees To Be Paid of {monthValue}</td>
                <th>
                  Rs.{TotalFeesAStudentShouldPayIs} of {monthValue}
                </th>
              </tr>
            </tbody>
          </table>
          <h1 style={{ color: "black", margin: "30px 0px", fontSize: "25px" }}>
            Total Bill To Be Paid Of Month {monthValue} is Rs.
            {TotalFeesAStudentShouldPayIs}
          </h1>
        </div>
        {show === 0 ||
          (show === 2 && (
            <h1
              style={{
                color: "black",
                margin: "20px 0px",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={handlePrint}
            >
              Print The Bill
            </h1>
          ))}
      </div>
    </>
  );
};

export default Print;
