import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import UserDataService from "../services/user";
import GundamDataService from "../services/gundam"
import Footer from "./footer";
import { Link } from "react-router-dom";
import Button2 from "./Button2";
import Menu from "./Menu";
import ClipLoader from "react-spinners/ClipLoader";
import { PacmanLoader } from "react-spinners";
//google.accounts.id.promt()
const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const [signedin, setSignedIn] = useState(0);
  const [liked, setLiked] = useState([]);

  const [gundams, setGundams] = useState([{}]);
  const user = useContext(UserContext);
  const setGund = (empt) => {
    localStorage.setItem("gund", empt.name);
  };
  const scrollcap = () => {
    var scroller = localStorage.getItem("backpos");
  
    if (scroller != null) {
      if (scroller == "") {
      } else {
        window.scrollTo(0, +scroller);
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    
    UserDataService.stillSigned(sessionStorage.getItem("token"))
    .then((response) => {
      setSignedIn(1)
    UserDataService.getLiked(sessionStorage.getItem("token"))
    .then((response) =>{
      setLoading(false);
      setGundams(response.data)
       
    })
    .catch((e)=>{
      setSignedIn(0)
      setLoading(false);
      console.log(e);
    })
       // Handle data
   })
   .catch((e)=>{
    setLoading(false);
     console.log(e);
     console.log("Session Unavailable");
     UserDataService.signOut();
     user?.setUser({});
     
 
     localStorage.setItem("signedin","false");
 
     
   })
 
  
   }, []);

  return (
    <>
    <Menu ></Menu>
    {loading ? (
          <div>
            <div style={{ paddingLeft: "48%", marginTop: "40px" }}>
              <PacmanLoader size={12} color="#3667d6" speedMultiplier={0.4} />
            </div>
            <div>
              <p style={{ maxWidth: "100%", marginTop: "10px" }} id="showMe">
                {" "}
                Please reload page or wait 2-3 minutes
              </p>
            </div>
          </div>
        ) : (
     <div className="container-sm favourite-container-sm">
     {signedin ? (
         <>
            <p style={{color:"white"}}> {"Your  Favourites"}</p>
         {
          gundams[0].name ? (
           
          gundams.map((gundam)=>{
            return(
              <div
                    className="card bg-transparent shadowglow mb-3 p-3 screenlist "
                    key={gundam.name}
                  >
                    <Link
                      to={"/gunder/" + gundam.name}
                      onClick={() =>
                        localStorage.setItem(
                          "backpos",
                          window.scrollY.toString()
                        )
                      }
                      onLoad={scrollcap}
                    >
                      <img
                        src={gundam.img}
                        className="img-fluid rounded mb-3 " /*alt="..."*/
                      />

                      <Button2
                        onClick={() => setGund(gundam)}
                        color="btn align-self-end gundnameplate cardtext"
                      >
                      
                        {gundam.name}
                       
                      </Button2>
                    </Link>
              </div>
            )
          })):(<div style={{paddingTop:"300px",paddingBottom:"300px", textAlign:"center", color:"white"}}>No liked Gundam</div>) 
         }
         
        </>
        ) : (
          <p style={{textAlign: "center",lineHeight: "400px", color:"white"}}>
                
                <Link to={"/login"}>Sign in</Link> for favourites
          </p>
          
        )}
     </div>)}
    <footer>
    <Footer></Footer>
    </footer>
    </>
  )
}

export default Favourites