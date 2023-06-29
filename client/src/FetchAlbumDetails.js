import axios from "axios";

export const fetchAlbumDetails = async (id,type) => {
    try {
      let url=(`http://localhost:8080/details/${id}/${type}/1/50`);
        
        const response = await axios.get(url);
        console.log("Fetched",response.data)
        return response.data;
      } catch (error) {
        console.error(error);
      }
  };

  