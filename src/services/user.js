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
   stillSigned(){
  
   return http.get("/checklogin",{
      withCredentials : true,
   })
      
   }

   signOut(){
    return http.post("/logout")
   }
   getLiked(){
      return http.get("/getliked")
   }

   googleLogin(jwt){
     
    return http.post("/googlelogin", {
    
        jwt: jwt
      },{
         withCredentials : true,
      })
   }
   liked(additem){
return http.put("/addliked", {
   additem: additem
})
   }

   unliked(removeitem){
      return http.put("/removeliked", {
         removeitem: removeitem
      })
         }
   //http.get(`${sub}`);
    
    
}

export default new UserDataService();