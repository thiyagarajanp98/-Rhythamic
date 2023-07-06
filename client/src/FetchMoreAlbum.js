import axios from "axios";

export const FetchMoreAlbum = async (api, input) => {
  try {
    let url = `http://localhost:8080/moreAlbums/${api}/${input}`;

    const response = await axios.get(url);
    response.data.list.map((data, index) => {
      if (data.id === song) {
        delete response.data.list[index];
      }
    });
    console.log("More fetched Modules", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
