import axios from "axios";

export const fetchAlbumDetails = async (id,type) => {
    try {
        let url=(`http://localhost:8080/details/${id}/${type}`)
        const response = await axios.get(url);
        console.log("Fetched",response.data)
        // const launch = {};
        // let song;
        // for (let key in response.data) {
        //     song = key
        //   launch[key] = response.data[key];
        //   launch[key].index=key;
        // }
        // console.log("Fetched",launch[song])
        // response.data['image']=response.data['image'].replace('150x150.jpg', '500x500.jpg')
        // response.data['title']=response.data['title'].replaceAll('&quot;', '"')
        // const result=response.data.map(item => ({
        //   ...item,
        //   image: response.data['image'].replace('150x150.jpg', '500x500.jpg'),
        //   title:response.data['title'].replaceAll('&quot;', '"')
        // }));
        return response.data;
      } catch (error) {
        console.error(error);
      }
  };

  