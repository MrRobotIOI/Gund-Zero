import Alert from "./Alert";
import Button from "./Button";
import Card from "./Card";
import { Routes, Route, Link } from "react-router-dom";

function Gundams() {
  /* let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
 const handleSelectItem = (item:string) =>{
   console.log(item);

   <ListGroup items={items} heading='Cities' onSelectItem={handleSelectItem}/>
 }*/

  return (
    <div className="bg-rgb(1, 16, 22)">
      <Alert>
        Hello <span>World</span>
      </Alert>
      <Card
        img="https://i0.wp.com/informationislnd.com/wp-content/uploads/2021/08/MG_Wing_Gundam_Zero_EW_Ver.Ka_box.jpg"
        link="https://www.canadiangundam.com/"
      ></Card>
      <a href="https://www.canadiangundam.com/" target="_blank">
        <Button onClick={() => console.log("Clicked")} color="warning">
          Press
        </Button>
      </a>
    </div>
  );
  
}

export default Gundams;
