import React from "react";
import { Link } from "react-router-dom";

const FooterHome = () => {
  return (
    <>
      {" "}
      <footer
        style={{ marginTop: "26%", backgroundColor: "#D8DFE6" }}
        className="p-4   shadow md:flex md:items-center md:justify-between md:p-9 dark:bg-black"
      >
        <span className="text-sm text-black sm:text-center dark:text-black">
          © 2022
          <a href="https://flowbite.com" className="hover:underline"></a>. All
          Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-black dark:text-black sm:mt-0">
          <li>
            <Link to="/" className="mr-4 hover:underline md:mr-6 ">
              Home
            </Link>
          </li>
          <li>
            <Link to="/class" className="mr-4 hover:underline md:mr-6">
              Class
            </Link>
          </li>
          <li>
            <Link to="/data-view" className="mr-4 hover:underline md:mr-6">
              View Detail
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default FooterHome;
