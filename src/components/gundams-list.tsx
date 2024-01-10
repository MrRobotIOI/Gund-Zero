import Alert from "./Alert";
import Button from "./Button";
import Button2 from "./Button2";
import Card from "./Card";
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import GundamDataService from "../services/gundam";
import { response } from "express";
import ClipLoader from "react-spinners/ClipLoader";
import { PacmanLoader } from "react-spinners";
import Footer0 from "./footer";
import { UserContext } from "../context/UserContext";
import UserDataService from "../services/user";
import SideNav from "./Sidenav";
//remove unecessary imports

import Menu from "./Menu";
interface LooseObject {
  name: string;
  img: string;
  toString(): string;
}

const GundamsList = (props: any) => {
  const user = useContext(UserContext);
  const [gundams, setGundams] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);

  const [isuserEmpty, setisuserEmpty] = useState(
    Object.keys(user!.user).length
  );

  useEffect(() => {
    retrieveGundams();
  }, []);

  useEffect(() => {
    setLoading(true);
  }, []);

  const retrieveGundams = () => {
    GundamDataService.getAll()
      .then((response) => {
        setLoading(false);

        setGundams(response.data.gundams);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const find = (name: string) => {
    if (!name) {
      return retrieveGundams();
    }
    GundamDataService.find(name)
      .then((response) => {
        //console.log(response.data);

        setGundams(response.data.gundams);
      })
      .catch((e) => {
        console.log(e);
      });
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
  //need to remove
  const setGund = (empt: LooseObject) => {
    localStorage.setItem("gund", empt.name);
  };

  const betterButton = (e: { target: { value: any } }) => {
    const searchName = e.target.value;

    setSearchName(searchName);
    find(searchName);
  };



  return (
    
    <div>
      <Menu menusignedin = {0}></Menu>

      <div className="bg-rgb(1, 16, 22)">
        {/**
         * IMPORTANT
         * add magnifying glass to searchbar
         * see youtube bar
         * */}

        <input
          id="searchicon"
          type="text"
          className="searchbar0 form-control bg-transparent rounded-0 searchbar shadow-none"
          placeholder="Search"
          value={searchName}
          onChange={betterButton}
          spellCheck="false"
        />
        {/*<div className="input-group-append">
          <button
            className="btn btn-outline-secondary buttonspacer rounded-0"
            type="button"
            onClick={findByName}
          >
            Search
          </button>
  </div>*/}
        {loading ? (
          <div>
            <div style={{ paddingLeft: "48%", marginTop: "40px" }}>
              <ClipLoader color="#3667d6" speedMultiplier={0.4} />
            </div>
            <div>
              <p style={{ maxWidth: "100%", marginTop: "10px" }} id="showMe">
                {" "}
                Spinning up Server 
       
               
              </p>
              <p style={{ maxWidth: "100%", marginTop: "10px" }} id="showMe">
              Please reload page or wait 2-3 minutes
              </p>
            </div>
          </div>
        ) : (
          <div className=".container-fluid ">
            <div className="row  m-auto pt-4  listcontain">
              {gundams.map((gundam: LooseObject) => {
                return (
                  /**IMPORTANT
                   * May nbeeed a card component
                   */
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
                );
              })}
            </div>
          </div>
        )}
      </div>

      <footer>
        <Footer0></Footer0>
      </footer>
    </div>
  );
};

export default GundamsList;
