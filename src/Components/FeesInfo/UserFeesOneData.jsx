import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Alert, Chip, Snackbar, Tooltip } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Print from "./Print";
import DeleteIcon from "@mui/icons-material/Delete";
const UserFeesOneData = ({
  value,
  setRender,
  render,
  TotalFeesAStudentShouldPayIs,
  monthValue,
  cashFlow,
}) => {
  const { pathname } = useLocation();
  const [totalFees, settotalFees] = useState(null);
  const [feesPaid, setfeesPaid] = useState(null);
  const [discount, setdiscount] = useState(null);
  const [print, setPrint] = useState(false);
  const [error, setError] = useState(false);
  const [blunder, setBlunder] = useState("");
  console.log(value ? value.feesPaid + feesPaid : null);
  const [a, setA] = useState(0);
  console.log(a);
  const { id } = useParams();
  useEffect(() => {
    const feesToBePaid = value
      ? value.totalFees -
        value.feesPaid -
        (value.discount / 100) * value.totalFees
      : null;
    setA(feesToBePaid);
  });
  console.log(feesPaid);
  const handleUpdate = async () => {
    if (totalFees === null) {
      setError(true);
    } else {
      try {
        const { data } = await axios.put(
          `http://localhost:4000/api/v1/student/bill/update/${
            value ? value._id : null
          }`,
          { totalFees, feesToBePaid: a }
        );

        setRender(!render);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleUpdate1 = async () => {
    if (feesPaid === null) {
      setError(true);
    } else {
      const totalFeesPaid = value
        ? parseInt(value.feesPaid) + parseInt(feesPaid)
        : null;

      try {
        const { data } = await axios.put(
          `http://localhost:4000/api/v1/student/bill/update/paid/${
            value ? value._id : null
          }`,
          { feesPaid: totalFeesPaid, feesToBePaid: a }
        );
        const totalUsedData = parseInt(feesPaid) + parseInt(value.feesPaid);
        console.log(totalUsedData);
        const response = await axios.put(
          `http://localhost:4000/api/v1/student/feesleft/${
            value ? value._id : null
          }/${totalUsedData}/${value.discount === null ? 0 : value.discount}`
        );
        console.log(a);
        setRender(!render);
        console.log(data);
        setBlunder("");
      } catch (error) {
        console.log(error.response.data.msg);
        setBlunder(error.response.data.msg);
      }
    }
  };
  const handleUpdate2 = async () => {
    if (discount === null) {
      setError(true);
    } else {
      try {
        const { data } = await axios.put(
          `http://localhost:4000/api/v1/student/bill/update/discount/${
            value ? value._id : null
          }`,
          { discount, feesToBePaid: a }
        );

        setRender(!render);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const handleClose = () => {
    setError(false);
  };

  const handleDelete = async (req, res) => {
    const studentId = id;
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/student/delete/bill/${studentId}/${
        value ? value.month : null
      }`
    );
    try {
      console.log(data);
      setRender(!render);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 style={{ color: "white", fontSize: "35px", fontWeight: "bold" }}>
        {value ? value.month : null}
      </h1>

      <>
        {error && (
          <Snackbar open={error} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Field Is empty
            </Alert>
          </Snackbar>
        )}
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                <div
                  className="border-2 border-gray-200 px-4 py-6 rounded-lg"
                  style={{ backgroundColor: "white" }}
                >
                  <h2 className="title-font font-medium text-2xl text-black">
                    Total Fees
                  </h2>
                  <p className="leading-relaxed text-black">
                    Rs.{value ? value.totalFees : null}
                  </p>
                  {pathname !== "/parent-login" && (
                    <div className="relative mt-4">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-black"
                      ></label>
                      <input
                        type="number"
                        placeholder="Update Total Fees"
                        id="name"
                        name="name"
                        value={totalFees}
                        onChange={(e) => settotalFees(e.target.value)}
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                      <div className="p-2 w-full">
                        <button
                          onClick={handleUpdate}
                          className="flex mx-auto text-black bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                <div
                  className="border-2 border-gray-200 px-4 py-6 rounded-lg"
                  style={{ backgroundColor: "white" }}
                >
                  <h2
                    className="title-font font-medium"
                    style={{ fontSize: "17px", color: "red" }}
                  >
                    {blunder ? blunder : null}
                  </h2>
                  <h2 className="title-font font-medium text-2xl text-black">
                    Fees Paid
                  </h2>
                  <p className="leading-relaxed text-black">
                    Rs.{value ? value.feesPaid : null}
                  </p>
                  {pathname !== "/parent-login" && (
                    <div className="relative mt-4">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-black"
                      ></label>
                      <input
                        type="number"
                        placeholder="Update Fees Paid"
                        id="name"
                        name="name"
                        value={feesPaid}
                        onChange={(e) => setfeesPaid(e.target.value)}
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                      <div className="p-2 w-full">
                        <button
                          onClick={handleUpdate1}
                          className="flex mx-auto text-black bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                <div
                  className="border-2 border-gray-200 px-4 py-6 rounded-lg"
                  style={{ backgroundColor: "white" }}
                >
                  <h2 className="title-font font-medium text-2xl text-black">
                    Discount
                  </h2>
                  <p className="leading-relaxed text-black">
                    {value ? (
                      value.discount === null || value.discount === 0 ? (
                        "No Discount Given"
                      ) : (
                        <>{value ? value.discount : null}%</>
                      )
                    ) : null}
                  </p>
                </div>
              </div>
              <div className="p-4 md:w-full sm:w-1/2 w-full">
                <div
                  className="border-2 border-gray-200 px-4 py-6 rounded-lg"
                  style={{ backgroundColor: "white" }}
                >
                  <h2 className="title-font font-medium text-xl text-black">
                    {value.month} Fees Left
                  </h2>

                  <p
                    className="leading-relaxed text-2xl text-black"
                    style={{ fontWeight: "bold" }}
                  >
                    Rs.{a}
                  </p>
                  {a === 0 && (
                    <CheckCircleOutlinedIcon
                      style={{ fontSize: "40px", color: "green" }}
                    />
                  )}
                  <h2 className="title-font font-medium text-2xl text-black">
                    Fees Left To Be Paid {monthValue} {"-->"} {cashFlow}
                  </h2>
                  <p
                    className="leading-relaxed text-3xl text-black"
                    style={{ fontWeight: "bold" }}
                  >
                    Rs.{TotalFeesAStudentShouldPayIs}
                  </p>
                  {pathname !== "/parent-login" && (
                    <Tooltip title="Delete">
                      <DeleteIcon
                        style={{
                          color: "red",
                          cursor: "pointer",
                          width: "40px",
                          height: "40px",
                        }}
                        onClick={handleDelete}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {pathname !== "/parent-login" && (
          <>
            <Chip
              label="Print The Details"
              variant="outlined"
              style={{
                color: "black",
                cursor: "pointer",
                backgroundColor: "white",
                margin: "20px 0px",
              }}
              onClick={() => {
                setPrint(!print);
                window.scrollTo(0, 0);
              }}
            />{" "}
            {print && (
              <Print
                print={print}
                setPrint={setPrint}
                value={value ? value : null}
                id={id}
                TotalFeesAStudentShouldPayIs={TotalFeesAStudentShouldPayIs}
                monthValue={monthValue}
                // feesToBePaid={feesToBePaid}
              />
            )}
          </>
        )}
      </>
    </>
  );
};

export default UserFeesOneData;
