import http from "../http-common"

class GundamDataService{
    getAll(page = 0) {
        return http.get(`?page=${page}`);
      }
    
   
      // find(query, by = "name", page = 0) {
      //   return http.get(`?${by}=${query}&page=${page}`);
      // } 
      find(name){
        return http.post("/search", {
    
          name: name,
       
        })
      }
      getbyId(id){
        return http.get(`/id/${id}`)
      }
    
    
}

export default new GundamDataService();