import axios from "axios";

export const fetchAlbumDetails = async (id) => {
    try {
        let url='http://localhost:8080/song/'+id
        const response = await axios.get(url);
        // console.log(response)
        const launch = {};
        let song;
        for (let key in response.data) {
            song = key
          launch[key] = response.data[key];
          launch[key].index=key;
        }
        // console.log(launch[song])
        
        return launch[song];
      } catch (error) {
        console.error(error);
      }
  };

  