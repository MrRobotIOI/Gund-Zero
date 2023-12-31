//@ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import UserDataService from "../services/user";
import SideNav from "./Sidenav";
import { Link } from "react-router-dom";
import Button2 from "./Button2";
interface Props {
 menusignedin : number
  
}

const Menu = ({ menusignedin}: Props) => {
  const user = useContext(UserContext);
  const [isuserEmpty, setisuserEmpty] = useState(1);
  function closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
  }
  useEffect(() => {
    UserDataService.stillSigned(sessionStorage.getItem("token"))
      .then((response) => {
        
        console.log(response.data)
        sessionStorage.setItem("token",response.data.token)
        setisuserEmpty(0)
      })
      .catch((e) => {
        console.log(response.data)
  sessionStorage.removeItem("token")
        setisuserEmpty(1)
      });
  }, []);
  function handleSignOut() {
    console.log("signOut()");
    UserDataService.signOut(sessionStorage.getItem("token"))
      .then((response) => {
        
        setisuserEmpty(1)
        sessionStorage.removeItem("token")
        window.location.reload();
     
      })
      .catch((e) => {
        console.log("signOut() error");
        console.log(e);
      });
  }
  useEffect(() => {
    document.body.style.filter = "brightness(100%)";
    console.log(isuserEmpty);
    
  }, [user, isuserEmpty]);

  return (
    <div className="alert alertcol">
      <SideNav></SideNav>

      <div className="signbutton">
        {isuserEmpty ? (
          <>
            <Link to="/login" className="Link ">
              <Button2
                onClick={() => console.log(user?.user)}
                color="btn signinplate cardtext"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  //@ts-ignore
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                {" Sign in"}
              </Button2>
            </Link>
            <span>{" |"}</span>
            <Link to="/signup" className="Link ">
              <Button2
                onClick={() => console.log(user?.user)}
                color="btn signupplate cardtext"
              >
                {"Sign Up"}
              </Button2>
            </Link>
          </>
        ) : (
          <Button2
            onClick={() => handleSignOut()}
            color="btn cardtext signinplate alertbutton"
          >
            Sign Out
          </Button2>
        )}
      </div>

      <div className="quote">
        <figure className="text-end">
          <blockquote className="quote">
            <p className="del customfont2 mb-4 ">
              "If you run you gain one, but if you move forward, you gain two"
            </p>
          </blockquote>
          <figcaption
            className="blockquote-footer customfont"
            onAnimationEnd={() => localStorage.setItem("backpos", "-1")}
          >
            <cite title="Source Title">Suletta Mercury&ensp;</cite>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default Menu;
