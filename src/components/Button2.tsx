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
const Button2 = ({ children, onClick, color }: Props) => {
  return (
    //replace the middle with the props param which can recieve input from app.tsx
    //@ts-ignore
    <button type="button" className={color} onClick={onClick}>
     {/* @ts-ignore */}
      {children}
    </button>
  );
};

export default Button2;
