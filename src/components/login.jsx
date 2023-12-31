import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import jwt_decode from "jwt-decode";
import Footer from "./footer";
import { Link, useNavigate } from "react-router-dom";
import UserDataService from "../services/user";
import http from "../http-common";
import jwtDecode from "jwt-decode";
import ClipLoader from "react-spinners/ClipLoader";
import { GoogleLogin } from "@react-oauth/google";

const login = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [loading, setLoading] = useState(false);
  const [userForm, setUserForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");
  const [signedin, setSignedIn] = useState(
    localStorage.getItem("signedin") || "false"
  );
  const [errMsg, setErrMsg] = useState("");
  const [errMsg2, setErrMsg2] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current;
    console.log(http.defaults.timeout);
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userForm, passwordForm]);

  useEffect(() => {
    setLoading(true);
    setSignedIn(localStorage.getItem("signedin") || false);
    UserDataService.stillSigned(sessionStorage.getItem("token"))
      .then((response) => {
        sessionStorage.setItem("token",response.data.token)
        console.log("stillSigned()");
        setLoading(false);
        console.log(response.data);

        // Handle data
      })
      .catch((e) => {
        console.log(e);
        console.log("Session Unavailable");
        UserDataService.signOut();
        user?.setUser({});

        localStorage.setItem("signedin", "false");
        setLoading(false);
        setSignedIn(localStorage.getItem("signedin"));
      });
  }, []);

  const handleChange1 = (e) => {
    //  Store the input value to local state
    setUserForm(e.target.value);
  };
  const handleChange2 = (e) => {
    //  Store the input value to local state
    setPasswordForm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    retrieveUser(userForm, passwordForm);
  };

  const retrieveUser = (username, password) => {
    setLoading(true);
    UserDataService.auth(username, password)
      .then((response) => {
      
        setErrMsg2("Authenticated");
        sessionStorage.setItem("token", response.data.token)

        setSignedIn("true");
        setLoading(false);
        navigate(-1);
       
          
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setErrMsg("Wrong Username or Password");
      });
  };
  const googlelogin = (token) => {
    UserDataService.googleLogin(token)
      .then((response) => {
        setSignedIn("true");
        setErrMsg2("Authenticated");
        navigate(-1);
        console.log(response);
        sessionStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setErrMsg("Wrong Username or Password");
      });
  };
  // const [jwtcontainer, setJwtcontainer] = useState({});
  /*global google*/
  const user = useContext(UserContext);

  useEffect(() => {}, [user?.user]);
  useEffect(() => {
    var wid = 450;
    if (window.innerWidth <= 400) {
      wid = 350;
    }
  }, []);

  return (
    <>
      <div className="body" style={{ width: "100%" }}>
        <div
          style={{
            paddingTop: "50px",
            padding: "0",
            boxShadow: "0 0rem 1rem rgb(63, 121, 197) !important",
          }}
        >
          <div className="centerlogin">
            {loading ? (
              <>
                <ClipLoader color="#3667d6" speedMultiplier={0.4} />

                <div>
                  <p
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                    id="showMe"
                  >
                    {" "}
                    Please reload page or wait 2-3 minutes
                  </p>
                </div>
              </>
            ) : (
              <div></div>
            )}
            <p style={{ fontSize: "12px" }}>Recommended</p>
          </div>
          <div className="centergooglelogin">
            <GoogleLogin
              theme="filled_black"
              text="signin_with"
              shape="pill"
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse.credential);
                googlelogin(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>

          {signedin === "true" ? (
            <>
              <div className="container-sm">
                <p
                  className={
                    errMsg2 ? "alert succ alert-success logintext" : "offscreen"
                  }
                  role="alert"
                  aria-live="assertive"
                >
                  Logged in as {user?.user.username || user?.user.display_name}
                </p>

                <Link to={"/login"}>
                  <button
                    className="btn btn-primary space "
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back to Previous Page
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <p style={{ color: "white", textAlign: "center" }}> Or</p>
              <div className="container-sm">
                <p
                  className={
                    errMsg ? "alert warn alert-warning logintext" : "offscreen"
                  }
                  role="alert"
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <form
                  className="text-primary mt-4"
                  onSubmit={handleSubmit}
                  style={{ padding: "40px", paddingLeft: "10px" }}
                >
                  <div className="mb-3">
                    <dt>Username</dt>
                    <dl>
                      <input
                        id="buttonwidth"
                        spellCheck="false"
                        type="text"
                        className="form-control"
                        onChange={handleChange1}
                        value={userForm}
                      ></input>
                    </dl>
                  </div>
                  <div className=" mb-3">
                    <dt>Password</dt>
                    <dl>
                      <input
                        spellCheck="false"
                        type="password"
                        className="form-control"
                        onChange={handleChange2}
                        value={passwordForm}
                      ></input>
                    </dl>
                  </div>

                  <div className="buttonHolder">
                    <button type="submit" className="btn btn-primary space ">
                      Sign in
                    </button>
                    <p style={{ paddingTop: "30px" }}>
                      Don't have an account?
                      <Link to={"/signup"}>{" Sign up"}</Link>
                    </p>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default login;
