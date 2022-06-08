import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentMarksMain from "./StudentMarksMain";

const StudentMarksheet = () => {
  const { className } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/students/class/${className}`
        );
        console.log(data.data);
        setStudents(data.data);
        console.log(students);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div style={{ width: "95vw" }}>
        <div
          style={{
            backgroundColor: "white",
            maxWidth: "400px",
            minWidth: "300px",
            opacity: "0.90",
            margin: "0px auto",
          }}
        >
          <>
            <h1
              class="sm:text-3xl mt-2 mb-1 text-3xl font-medium title-font text-black"
              style={{
                textAlign: "center",
              }}
            >
              Class {className}
            </h1>{" "}
            {students.length !== 0 && (
              <h1
                class="sm:text-3xl mt-1 mb-1 text-2xl font-medium title-font text-black"
                style={{ fontSize: "20px", textAlign: "center" }}
              >
                Total Students In Class {className} Is{" "}
                {students ? students.length : null}
              </h1>
            )}
            <div className="container text-gray-600">
              {students
                ? students.map((value) => {
                    return (
                      <>
                        <StudentMarksMain value={value} />
                      </>
                    );
                  })
                : null}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default StudentMarksheet;
