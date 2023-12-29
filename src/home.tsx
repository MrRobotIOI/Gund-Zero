import Alert from "./components/Alert";
import Button from "./components/Button";
import Card from "./components/Card";
import { Routes, Route, Link } from "react-router-dom";
import ListGroup from "./components/ListGroup";
import GundamsList from "./components/gundams-list.js";
import Gundams from "./components/gundams";
import { Router } from "express";

function Home() {
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
      
      <Card img = "https://i1.wp.com/informationislnd.com/wp-content/uploads/2020/05/1101262-1.jpg?fit=640%2C1002&ssl=1" link="https://www.canadiangundam.com/"></Card>
      
      <a href="/gund">
        <Button onClick={() => console.log("Clicked")} color="warning">
          Press
        </Button>
        </a>
      
    </div>
    
  );
}

export default Home;
