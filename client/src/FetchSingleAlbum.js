import axios from "axios";

export const FetchSingleAlbum = async (id,song) => {
    try {
      let url=(`http://localhost:8080/album/${id}`);
        
        const response = await axios.get(url);
        response.data.list.map((data,index)=>{
          if(data.id === song){
            delete response.data.list[index];
          }
        })
        console.log("More from album Fetched",response.data)
        return response.data;
      } catch (error) {
        console.error(error);
      }
  };

  