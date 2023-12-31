import Alert from "./Alert";
import Button from "./Button";
import Button2 from "./Button2";
import Card from "./Card";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import GundamDataService from "../services/gundam";
import UserDataService from "../services/user";
import { response } from "express";
import Footer from "./footer";
import Menu from "./Menu";
/**change scale of svg for different screens */
import Heartfill from "../svg/heartpulse_fill";
import Heart from "../svg/heartpulse";
import { ClimbingBoxLoader, ClipLoader } from "react-spinners";
interface LooseObject {
  _id: string;
  name: string;
  img: string;
  links: [];
  embedId: string;
  toString(): string;
}

const GundInfo = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  const [gundams, setGundams] = useState([]);
  const [searchName, setSearchName] = useState("");
  const params = useParams();
  const { name } = params;
  useEffect(() => {
    setLoading(true);
    find(name!);
  }, []);
  useEffect(() => {
    // console.log(params)
    UserDataService.getLiked(sessionStorage.getItem("token")).then((response) => {
      response.data.map((gu: LooseObject) => {
        if (gu.name === name) {
          setLiked(true);
        }
      });
    });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const onChangeSearchName = (e: { target: { value: any } }) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const find = (query: string) => {
    GundamDataService.find(query)
      .then((response) => {
        setGundams(response.data.gundams);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);

        console.log(e);
      });
  };

  const like = (id: string) => {
    UserDataService.liked(id,sessionStorage.getItem("token"))
      .then((response) => {
        setLiked(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const unlike = (id: string) => {
    UserDataService.unliked(id,sessionStorage.getItem("token"))
      .then((response) => {
       
        setLiked(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Menu menusignedin = {0}></Menu>
      <div key={name?.length} className="infobg">
        {loading ? (
          <div>
            <div style={{ paddingLeft: "48%", marginTop: "40px" }}>
              <ClimbingBoxLoader
                size={7}
                color="#3667d6"
                speedMultiplier={0.4}
              />
            </div>
            <div>
              <p style={{ maxWidth: "100%", marginTop: "10px" }} id="showMe">
                {" "}
                Please reload page or wait 2-3 minutes
              </p>
            </div>
          </div>
        ) : (
          <div className="container ">
            {gundams.map((gundam: LooseObject) => {
              if (gundam.name === name) {
                return (
                  <div className="row gx-5" key={gundam.name}>
                    <div
                      className="card bg-transparent  mb-3 p-3 col gutters"
                      style={{ maxWidth: "100%", borderStyle: "none" }}
                    >
                      <div className="text-center" style={{ maxWidth: "90%" }}>
                        <div className="shadowglow rounded bg-transparent  mb-3 p-3 infoimg">
                          <div className="img-overlay-wrap">
                            <div>
                              {liked ? (
                                <Heartfill  onClick={() => {
                                  unlike(gundam._id);
                                }}></Heartfill>
                              ) : (
                                <Heart
                                  onClick={() => {
                                    like(gundam._id);
                                  }}
                                ></Heart>
                              )}
                            </div>
                            <img
                              src={gundam.img}
                              className="img-fluid rounded mb-3" /*alt="..."*/
                            />
                          </div>
                          <Button2
                            onClick={() =>
                              console.log("Y value:" + window.scrollY)
                            }
                            color="btn btn-outline-warning align-self-end buttonspacer cardtext"
                          >
                            {name}
                          </Button2>
                        </div>
                      </div>
                    </div>
                    <div className="col pt-5 pr-0 ">
                      {/* have a ul to containg the below li elements and 
                  for the li elements loop through the links like with the map to get new li links contained in the ul
                  also finsd a way to disdplay the links  differntly (i dont link the buttons fir everyrhing)*/}
                      <ul>
                        {gundam.links.map((linker: string) => {
                          return (
                            <li
                              key={
                                linker.length + Math.floor(Math.random() * 10)
                              }
                            >
                              <div>
                                <a href={linker} target="_blank">
                                  <button className="btn btn-outline-primary linkbutton">
                                    {linker.match("panda")
                                      ? linker.substring(
                                          linker.indexOf("//") + 2,
                                          linker.lastIndexOf("a/") + 1
                                        )
                                      : linker.match("amazon.com")
                                      ? linker.substring(
                                          linker.indexOf("w.") + 2,
                                          linker.lastIndexOf("com") + 3
                                        )
                                      : linker.match("amazon.ca")
                                      ? linker.substring(
                                          linker.indexOf("w.") + 2,
                                          linker.lastIndexOf(".c") + 3
                                        )
                                      : linker.match("canadiangundam")
                                      ? linker.substring(
                                          linker.indexOf("w.") + 2,
                                          linker.lastIndexOf("com") + 3
                                        )
                                      : linker.match("niigs")
                                      ? linker.substring(
                                          linker.indexOf("//") + 2,
                                          linker.lastIndexOf("ca") + 2
                                        )
                                      : linker.match("torontogundam")
                                      ? linker.substring(
                                          linker.indexOf("w.") + 2,
                                          linker.lastIndexOf("ca") + 2
                                        )
                                      : ""}
                                    &ensp;
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-box-arrow-up-right"
                                      viewBox="0 0 16 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                                      />
                                      <path
                                        fillRule="evenodd"
                                        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                                      />
                                    </svg>
                                  </button>
                                </a>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}

        {/*
          <div
            className="col-sm"
            style={{ paddingLeft: "10%", paddingRight: "10%" }}
          >
            <ul className="list-group ">

              <Button2
                onClick={() => console.log("")}
                color="btn btn-outline-warning align-self-start"
              >
                TEtsting
              </Button2>
            
            </ul>
          </div>*/}
        {gundams.map((gundam: LooseObject) => {
          if (gundam.name === name) {
            const vid =
              "https://www.youtube.com/embed/" + gundam.embedId + "?rel=0";
            return (
              <>
                <div className="ratio ratio-16x9 centertube">
                  <iframe
                    src={vid}
                    id="video"
                    title="YouTube video"
                    className="roundedvideo"
                    allowFullScreen
                    allow="encrypted-media; gyroscope; picture-in-picture; web-share;"
                  ></iframe>
                </div>
              </>
            );
          }
        })}
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </>
  );
};

export default GundInfo;
