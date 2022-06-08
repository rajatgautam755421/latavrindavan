import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import NoAuth from "../NoAuth/NoAuth";

import UserFeesOneData from "./UserFeesOneData";

const UserFeesInfo = ({ refresh }) => {
  const [feesData, setFeesData] = useState([]);
  const { id } = useParams();
  const [render, setRender] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/student/bill/${id}`
      );
      try {
        setFeesData(data.data);
        console.log(feesData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [render, refresh]);

  const [user, setUser] = useState("");
  const { pathname } = useLocation();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === "62922bbd0dd8d10449ce4e72") {
      setUser(userInfo);
    }
  }, [pathname]);

  return (
    <>
      {user ? (
        <>
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
                const monthValue = feesData
                  .slice(0, index + 1)
                  .map((a, index) => {
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
                      render={render}
                      setRender={setRender}
                      index={index}
                      TotalFeesAStudentShouldPayIs={
                        TotalFeesAStudentShouldPayIs
                      }
                      monthValue={monthValue}
                      cashFlow={cashFlow}
                    />
                  </>
                );
              })
            : null}
        </>
      ) : (
        <NoAuth />
      )}
    </>
  );
};

export default UserFeesInfo;
