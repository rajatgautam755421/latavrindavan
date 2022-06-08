import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import NoAuth from "../NoAuth/NoAuth";
import PostFeesInfo from "./PostFeesInfo";
import UserFeesInfo from "./UserFeesInfo";

const FeesInfo = () => {
  const { id } = useParams();
  console.log(id);
  const [student, setStudent] = useState({});
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await await axios.get(
        `http://localhost:4000/api/v1/student/bill/${id}`
      );
      try {
        console.log(data);
        setStudent(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  const [user, setUser] = useState("");
  const { pathname } = useLocation();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === "62922bbd0dd8d10449ce4e72") {
      setUser(userInfo);
    }
  }, [pathname]);
  useEffect(() => {
    if (student === null) {
      setShow(0);
    } else {
      setShow(1);
    }
  });
  console.log(show);
  console.log(student);
  return (
    <>
      {user ? (
        <>
          <PostFeesInfo
            render={render}
            setRender={setRender}
            refresh={refresh}
            setRefresh={setRefresh}
          />
          <UserFeesInfo refresh={refresh} setRefresh={setRefresh} />
        </>
      ) : (
        <NoAuth />
      )}
    </>
  );
};

export default FeesInfo;
