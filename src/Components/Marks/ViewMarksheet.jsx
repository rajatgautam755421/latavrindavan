import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewMarksheet = () => {
  const { id } = useParams();
  const [marks, setMarks] = useState([]);
  const [classs, setClasss] = useState([]);
  const [total, setTotal] = useState(0);
  const [marksId, setMarksId] = useState("");
  const [percentage, setPercentage] = useState("");

  const [subject, setSubject] = useState([]);
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
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/marksheet/${id}`
        );
        setMarks(data.data);
        setMarksId(data.data[0]._id);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/student/${id}`
        );
        setClasss(data.data);
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
    fetchData1();
  }, []);

  const handleTotal = async () => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/marksheet/${id}`
        );
        if (data !== "undefined") {
          setTotal(
            parseInt(data.data[0].sub1) +
              parseInt(data.data[0].sub2) +
              parseInt(data.data[0].sub3) +
              parseInt(data.data[0].sub4) +
              parseInt(data.data[0].sub5)
          );
          setPercentage(
            (parseInt(data.data[0].sub1) +
              parseInt(data.data[0].sub2) +
              parseInt(data.data[0].sub3) +
              parseInt(data.data[0].sub4) +
              parseInt(data.data[0].sub5)) /
              5
          );

          try {
            console.log(marksId);
            const { data } = await axios.put(
              `http://localhost:4000/api/v1/marksheet-update/${marksId}`,
              {
                total,
                percentage,
              }
            );
          } catch (error) {
            console.log(error.response.data);
          }

          console.log(total);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  };

  return (
    <>
      <div style={{ width: "96vw" }} className=" container-fluid">
        {" "}
        <h2 className="text-2xl mt-4 mb-3 ">
          <b>
            Marksheet of: {classs.firstName} {classs.lastName}
          </b>
        </h2>
        <table
          style={{ margin: "0px  auto" }}
          className="w-2/3  table table-dark"
        >
          <thead>
            <tr>
              <th scope="col">SUBJECT</th>
              <th scope="col">Full Marks</th>
              <th scope="col">Pass Marks</th>
              <th scope="col">Obtained Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{subject[0] ? subject[0].sub : null}</th>
              <td>100</td>
              <td>40</td>
              <td>
                {marks.map((items) => {
                  return <h1>{items.sub1}</h1>;
                })}
              </td>
            </tr>
            <tr>
              <th scope="row">{subject[1] ? subject[1].sub : null}</th>
              <td>100</td>
              <td>40</td>
              <td>
                {marks.map((items) => {
                  return <h1>{items.sub2}</h1>;
                })}
              </td>
            </tr>
            <tr>
              <th scope="row">{subject[2] ? subject[2].sub : null}</th>
              <td>100</td>
              <td>40</td>
              <td>
                {marks.map((items) => {
                  return <h1>{items.sub3}</h1>;
                })}
              </td>
            </tr>
            <tr>
              <th scope="row">{subject[3] ? subject[3].sub : null}</th>
              <td>100</td>
              <td>40</td>
              <td>
                {marks.map((items) => {
                  return <h1>{items.sub4}</h1>;
                })}
              </td>
            </tr>
            <tr>
              <th scope="row">{subject[4] ? subject[4].sub : null}</th>
              <td>100</td>
              <td>40</td>
              <td>
                {marks.map((items) => {
                  return <h1>{items.sub5}</h1>;
                })}
              </td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td></td>
              <td>
                <button
                  onClick={handleTotal}
                  type="button"
                  className="btn btn-secondary"
                >
                  Calculate Total
                </button>
              </td>
              {total !== 0 && (
                <td>
                  <b>Total:{total}</b>
                  <br />
                  <b>Percentage:{percentage}</b> <br />
                  <button
                    onClick={handleTotal}
                    type="button"
                    className=" mt-2 btn btn-secondary"
                  >
                    Click to Update
                  </button>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewMarksheet;
