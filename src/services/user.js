import http from "../http-common"
import dotenv from "dotenv"
import axios from "axios";

class UserDataService{
    
    auth (username0, password0) {

 return http.post("/login", {
    
    username: username0,
    password: password0
  })
}

getgoogleuser(arg){
   http.defaults.withCredentials = true;
   return  http
   .get("/googleuser/" + `${arg}`)
}
createuser(username0, password0){
   return http.post("/user", {
      
      username: username0,
      password: password0
    })
}
   stillSigned(token0){
  
   return http.post("/checklogin",{
    
      token: token0
    }
   
   )
      
   }

   signOut(token0){
    return http.post("/logout",{
      token: token0

    })
   }
   getLiked(token0){
      return http.post("/getliked",{

         token: token0
      })
   }

   googleLogin(jwt){
     
    return http.post("/googlelogin", {
    
        jwt: jwt
      },{
         withCredentials : true,
      })
   }
   liked(additem,token){
return http.put("/addliked", {
   additem: additem,
   token: token
})
   }

   unliked(removeitem,token){
      return http.put("/removeliked", {
         removeitem: removeitem,
         token: token
      })
         }
   //http.get(`${sub}`);
    
    
}

export default new UserDataService();