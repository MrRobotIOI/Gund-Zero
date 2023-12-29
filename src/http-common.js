import axios from "axios";


export default axios.create({
withCredentials: true,
  
  baseURL: "https://gund-arm-backend-mrrobotioi.onrender.com/api/v1/gundams",
  headers: {
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    "Content-type": "application/json"
    //"https://gund-arm-backend-mrrobotioi.onrender.com/api/v1/gundams"
    //http://localhost:8000/api/v1/gundams
  }
  
}); 