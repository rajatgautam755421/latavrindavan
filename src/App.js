import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import StudentFrom from "./Components/StudentForm/StudentFrom";
import Viewdetail from "./Components/ViewDetail/Viewdetail";
import Class from "./Components/Class/Class";
import Classes from "./Components/Class/Classes";
import Footer from "./Components/Footer/Footer";
import FooterHome from "./Components/Footer/FooterHome";
import IndividualDetail from "./Components/ViewDetail/IndividualDetail";
import IndividualDetailUpdate from "./Components/ViewDetail/IndividualDetailUpdate";
import FeesInfo from "./Components/FeesInfo/FeesInfo";
import Login from "./Components/Login/Login";
import ParentLogin from "./Components/ParentsLogin/ParentsLogin";
import Marks from "./Components/Marks/Marks";
import MarksheetForm from "./Components/Marks/MarksheetForm";
import StudentMarksheet from "./Components/Marks/StudentMarksheet";
import ViewMarksheet from "./Components/Marks/ViewMarksheet";
import UpdateMarks from "./Components/Marks/UpdateMarks";
import Print from "./Components/FeesInfo/Print";
import ParentsMarksheet from "./ParentsMarksheet/ParentsMarksheet";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/marksheet"
          element={
            <>
              <Marks />
            </>
          }
        />
        <Route
          path="/marksheet/:className"
          element={
            <>
              <StudentMarksheet />
            </>
          }
        />
        <Route
          path="/marksheet-view/:id"
          element={
            <>
              <ViewMarksheet />
            </>
          }
        />
        <Route
          path="/marksheet-update/:id"
          element={
            <>
              <UpdateMarks />
            </>
          }
        />
        <Route
          path="/add-marks/:id"
          element={
            <>
              <MarksheetForm />
            </>
          }
        />
        <Route
          path="/add-marks/:id"
          element={
            <>
              <MarksheetForm />
            </>
          }
        />
        <Route
          path="/classes/:className"
          element={
            <>
              <Classes />
            </>
          }
        />

        <Route
          path="/class"
          element={
            <>
              <Class />
            </>
          }
        />

        <Route
          path="/data-entry"
          element={
            <>
              <StudentFrom />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/parent-login"
          element={
            <>
              <ParentLogin />
            </>
          }
        />
        <Route
          path="/individual-detail/:id"
          element={
            <>
              <IndividualDetail />
            </>
          }
        />
        <Route
          path="/student-marksheet"
          element={
            <>
              <ParentsMarksheet />
            </>
          }
        />
        <Route
          path="/individual-detail-update/:id"
          element={
            <>
              <IndividualDetailUpdate />
            </>
          }
        />
        <Route
          path="/fees-info/:id/:firstName/:lastName"
          element={
            <>
              <FeesInfo />
            </>
          }
        />
        <Route
          path="/data-view"
          element={
            <>
              <Viewdetail />
            </>
          }
        />
        <Route
          path="/print"
          element={
            <>
              <Print />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
