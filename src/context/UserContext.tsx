import { createContext, useEffect, useState } from "react";

type UserContext = {
    user: {};
    setUser: React.Dispatch<React.SetStateAction<{}>>;
  };
   export const UserContext = createContext<null | UserContext>(null);
  type Props = {
    children: React.ReactNode;
  }
export const UserContextProvider =({children}: Props) =>{
  
    if(localStorage.getItem("userData")=== "undefined"){
        localStorage.setItem("userData","{}")
    }
      // @ts-ignore
      
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData"))|| {});
    
    useEffect(() => {
        console.log("user updated, persist state");
        
        localStorage.setItem("userData", JSON.stringify(user));
        
      }, [user]);
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
//export default UserContext;
