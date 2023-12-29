import React from "react";
import Button from "./Button";
import Button2 from "./Button2";
interface Props {
  link: string;
  img : string;
}
const Card = ({ link, img }: Props) => {
  return (
    <>
      <div
        className="card bg-transparent shadowglow mb-3 p-3 infoimg"
        
        style={{ width: "18rem" }}
      >
        
        <img
          src={img}
          className="img-fluid rounded mb-3" /*alt="..."*/
        />
        
        <a className="text-center " href={link}>
          <Button2
            onClick={() => console.log("Clicked")}
            color="btn btn-outline-warning"
          >
            Details
          </Button2>
        </a>
      </div>
    </>
  );
};

export default Card;
