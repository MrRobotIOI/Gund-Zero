import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [url, setUrl] = useState(window.location.href);
  function openNav() {
    if (window.innerWidth <= 500) {
      document.getElementById("mySidenav")!.style.width = "200px";

      document.getElementById("closebtn")!.style.marginRight = "58%";
      document.body.style.filter = "brightness(74%)";
    } else {
      document.getElementById("mySidenav")!.style.width = "250px";
      document.body.style.filter = "brightness(74%)";
    }
  }

  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
    document.body.style.filter = "brightness(100%)";
   
  }

  return (
    <>
      <span className="showmenubtn" onClick={() => openNav()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          // fill="#0468fd"
          className="bi bi-list"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </span>
      <div id="mySidenav" className="sidenav">
        <a
         
          className="closebtn"
          id="closebtn"
          onClick={() => closeNav()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            className="bi bi-list showmenubtn"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </a>

        <Link to="/" className="Link ">
          Home
        </Link>
        <Link to="/favourites" className="Link ">
          Favourites
        </Link>
      </div>
    </>
  );
};

export default SideNav;
