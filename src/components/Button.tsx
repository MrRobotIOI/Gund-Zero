//Template shortcut: rafce
import React from "react";
//proprs interface to make button dynamic
//TZHis means we have a variable wiof a specific type that is able to change
interface Props {
  children: string;
  color: string;
  onClick: () => void;
}
//add props param
const Button = ({ children, onClick, color }: Props) => {
  return (
    //replace the middle with the props param which can recieve input from app.tsx
    <button
      type="button"
      className={"btn btn-" + color + " btn btn-outline-warning"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
