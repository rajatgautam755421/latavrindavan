import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IndividualDetailUpdate = () => {
  const { id } = useParams();
  console.log(id);
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/student/${id ? id : null}`
        );
        console.log(data.data);
        setStudent(data.data);
        console.log(student);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  const firstName1 = student.firstName;
  const [firstName, setFirstName] = useState("");

  return (
    <>
      <div className="container-fluid">
        <h1 class="sm:text-3xl mt-3 mb-3 text-3xl font-medium title-font text-white">
          Individual Detail Update
        </h1>
        <div className="row">
          <div className="col"></div>
          <div style={{ marginLeft: "-10px" }} className="col">
            <table className="table table-dark">
              {" "}
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Amount "
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </th>
                </tr>
                <tr>
                  <th scope="col">Middle Name</th>
                  <th scope="col">
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Amount "
                    />
                  </th>
                </tr>
                <tr>
                  <th scope="col">Last Name</th>
                  <th scope="col">
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Amount "
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Roll No</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Amount "
                    />
                  </td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Amount "
                    />
                  </td>
                </tr>
                <tr>
                  <td>Parents Name</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Amount "
                    />
                  </td>
                </tr>
                <tr>
                  <td>Class</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Amount "
                    />
                  </td>
                </tr>
                <tr>
                  <td>Section</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Amount "
                    />
                  </td>
                </tr>
                <tr>
                  <td>Parents Number</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Amount "
                    />
                  </td>
                </tr>
                <tr>
                  <td>Fee Paid</td>
                  <td>Rs.5000</td>
                </tr>
                <tr>
                  <td>Fee Left</td>
                  <td>Rs.2000</td>
                </tr>
                <tr>
                  <td>Pay now</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Amount "
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button type="button" class="btn btn-success">
                      Update
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};

export default IndividualDetailUpdate;
