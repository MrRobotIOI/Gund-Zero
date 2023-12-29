import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import jwt_decode from "jwt-decode";
import Footer from "./footer";
import { Link, useNavigate } from "react-router-dom";
import UserDataService from "../services/user";
import http from "../http-common";
import jwtDecode from "jwt-decode";
import ClipLoader from "react-spinners/ClipLoader";
import PasswordStrengthBar from "react-password-strength-bar";
import { GoogleLogin } from "@react-oauth/google";

const login = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [loading, setLoading] = useState(false);
  const [userForm, setUserForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [signedin, setSignedIn] = useState(
    localStorage.getItem("signedin") || "false"
  );
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current;
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userForm, passwordForm]);

  useEffect(() => {
    setLoading(true);
    
    UserDataService.stillSigned()
      .then((response) => {
        console.log("stillSigned()");
        setLoading(false);
        console.log(response.data);
        setSignedIn("true")
        // Handle data
      })
      .catch((e) => {
        console.log(e);
        console.log("Session Unavailable");
        UserDataService.signOut();
        user?.setUser({});
        setLoading(false);
        setSignedIn("false");
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
    if (score < 2) {
      setErrMsg("Weak password");
      return;
    }
    createUser(userForm, passwordForm);
  };

  const createUser = (username, password) => {
    setLoading(true);
    UserDataService.createuser(username, password)
      .then((response) => {
        console.log("createuser() " + response.data);
        UserDataService.auth(username, password)
          .then((response) => {
            console.log("login() " + response.data);

            http
              .get("/username/" + `${username}`)
              .then((response) => {
                console.log("Succeseful login");
                setLoading(false);
                localStorage.setItem("username", "");
                
                setSignedIn("true");
                navigate(-1);
              })
              .catch((e) => {
                setLoading(false);
                setSignedIn("false")
                console.log(e);
                setErrMsg("Wrong Username or Password");
              });
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
            setErrMsg("Wrong Username or Password");
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setErrMsg(error.response.data);
      });
  };

  // const [jwtcontainer, setJwtcontainer] = useState({});
  /*global google*/
  const user = useContext(UserContext);

  function handleCallbackResponse(response) {
    console.log(response.credential);
    verify(response.credential);

    //localStorage.setItem("jwt", response.credential)
  }

  const googlelogin = (token) => {
    UserDataService.googleLogin(token)
      .then((response) => {
        setSignedIn("true");
        setErrMsg("Authenticated");
        navigate(-1);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setErrMsg("Wrong Username or Password");
      });
  };



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

          <div>
            {signedin === "true" ? (
              <div className="container-sm">
                <p>
                  Already logged in
                </p>
                <Link to={"/"}>
                  <button className="btn btn-primary space ">
                    Go to main page
                  </button>
                </Link>
              </div>
            ) : (
              <>
              <div className="centergooglelogin">
            <GoogleLogin
            theme="filled_black"
            text="signup_with"
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
                <p style={{ color: "white", textAlign: "center" }}> Or</p>

                <div className="container-sm">
                  <p
                    className={
                      errMsg ? "alert aler alert-danger logintext" : "offscreen"
                    }
                    role="alert"
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <form
                    className="text-primary mt-4"
                    onSubmit={handleSubmit}
                    style={{
                      padding: "40px",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <div className="mb-3">
                      <dt>Username</dt>
                      <dl>
                        <input
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
                      <div style={{ width: "100%", textAlign: "center" }}>
                        <PasswordStrengthBar
                          password={passwordForm}
                          style={{ display: "inline-block", width: "50%" }}
                          onChangeScore={(score, feedback) => {
                            setScore(score);
                          }}
                        />
                      </div>
                    </div>

                    <div className="buttonHolder">
                      <button type="submit" className="btn btn-primary space ">
                        Create account
                      </button>
                      <p style={{ fontSize: "12px" }}>
                        <span style={{ color: "red" }}> Warning: </span>No
                        Password Reset or Account Recovery for this method yet
                      </p>
                      <p style={{ paddingTop: "30px" }}>
                        Already have an account? &nbsp;
                        <Link to={"/login"}>Login</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default login;
