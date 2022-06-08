import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

const UpdateMarks = () => {
  const { id } = useParams();
  const [sub1, setSub1] = useState("");
  const [sub2, setSub2] = useState("");
  const [sub3, setSub3] = useState("");
  const [sub4, setSub4] = useState("");
  const [sub5, setSub5] = useState("");
  const [posted, setPosted] = useState(false);
  const [subject, setSubject] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [total, setTotal] = useState(0);
  const [marksheetId, setMarksheetId] = useState("");

  const nurserysubjects = [
    { id: 0, sub: "Nepali" },
    { id: 1, sub: "English" },
    { id: 2, sub: "Maths" },
    { id: 2, sub: "OPT" },
    { id: 2, sub: "Social" },
  ];
  const lkgsubjects = [
    { id: 0, sub: "grammar" },
    { id: 1, sub: "symphony" },
    { id: 2, sub: "physics" },
    { id: 2, sub: "statistatic" },
    { id: 2, sub: "compiler" },
  ];
  const ukgsubjects = [
    { id: 0, sub: "Nepali" },
    { id: 1, sub: "English" },
    { id: 2, sub: "Maths" },
    { id: 2, sub: "OPT" },
    { id: 2, sub: "Social" },
  ];
  const onesubjects = [
    { id: 0, sub: "Nepali" },
    { id: 1, sub: "English" },
    { id: 2, sub: "Maths" },
    { id: 2, sub: "OPT" },
    { id: 2, sub: "Social" },
  ];
  const twosubjects = [
    { id: 0, sub: "Nepali" },
    { id: 1, sub: "English" },
    { id: 2, sub: "Maths" },
    { id: 2, sub: "OPT" },
    { id: 2, sub: "Social" },
  ];
  const threesubjects = [
    { id: 0, sub: "Nepali" },
    { id: 1, sub: "English" },
    { id: 2, sub: "Maths" },
    { id: 2, sub: "OPT" },
    { id: 2, sub: "Social" },
  ];
  useEffect(() => {
    console.log("hhehehee");
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/student/${id}`
        );

        setStudents(data.data);
        setStudentId(id);
        if (data.data.className) {
          if (data.data.className === "nursery") {
            setSubject(nurserysubjects);
          } else if (data.data.className === "lkg") {
            setSubject(lkgsubjects);
          } else if (data.data.className === "ukg") {
            setSubject(ukgsubjects);
          } else if (data.data.className === "1") {
            setSubject(onesubjects);
          } else if (data.data.className === "2") {
            setSubject(twosubjects);
          } else {
            setSubject(threesubjects);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData1 = async () => {
      console.log(id);

      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/marksheet/${id}`
        );
        setMarksheetId(data.data[0]._id);
        console.log(marksheetId);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData1();
  });

  const handleClose = () => {
    setPosted(false);
  };
  const handleclick = async (e) => {
    e.preventDefault();
    console.log(id);
    console.log(studentId);

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/marksheet-update/${marksheetId}`,
        {
          studentId,
          sub1,
          sub2,
          sub3,
          sub4,
          sub5,
          total,
        }
      );

      setSub1("");
      setSub2("");
      setSub3("");
      setSub4("");
      setSub5("");
      setPosted(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {posted && (
        <Snackbar open={posted} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully Marks are Updated
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
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                      style={{ color: "white" }}
                    >
                      First Name :{students.firstName}
                    </label>
                    <label
                      className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                      style={{ color: "white" }}
                    >
                      Last Name :{students.lastName}
                    </label>
                    <label
                      className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                      style={{ color: "white" }}
                    >
                      Class : {students.className}
                    </label>
                    <label
                      className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                      style={{ color: "white" }}
                    >
                      Roll No : {students.rollno}
                    </label>
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
                      {subject[0] ? subject[0].sub : null}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="sub1"
                      value={sub1}
                      onChange={(e) => setSub1(e.target.value)}
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
                      {subject[1] ? subject[1].sub : null}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="sub2"
                      value={sub2}
                      onChange={(e) => setSub2(e.target.value)}
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
                      {subject[2] ? subject[2].sub : null}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Sub3"
                      value={sub3}
                      onChange={(e) => setSub3(e.target.value)}
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
                      {subject[3] ? subject[3].sub : null}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="sub4"
                      value={sub4}
                      onChange={(e) => setSub4(e.target.value)}
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
                      {subject[4] ? subject[4].sub : null}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="sub5"
                      value={sub5}
                      onChange={(e) => setSub5(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  onClick={handleclick}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  );
};

export default UpdateMarks;
