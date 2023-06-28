import axios from "axios";

export const fetchLaunchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/'
      );
      //  console.log("EXXXXXX",response.data)
      delete response.data['promo:vx:data:168'];
      delete response.data['promo:vx:data:139'];
      delete response.data['promo:vx:data:107'];
      delete response.data['promo:vx:data:162'];
      delete response.data['promo:vx:data:163'];
      delete response.data['global_config'];
      delete response.data['history'];
      delete response.data['radio'];
      delete response.data['browse_discover'];
      delete response.data.modules['radio'];
      delete response.data.modules['promo:vx:data:168'];
      delete response.data.modules['promo:vx:data:139'];
      delete response.data.modules['promo:vx:data:107'];
      delete response.data.modules['promo:vx:data:162'];
      delete response.data.modules['promo:vx:data:163'];

      const value = response.data.modules;
      delete response.data['modules'];
      const launch = {}
      for (let key in response.data) {
        launch[key] = response.data[key]
        // console.log(key, response.data[key]);
        launch[key].title = value[key].title ? value[key].title : "Pick Your Mood"
      }
      // console.log(launch)
      return launch;
    } catch (error) {
      console.error(error);
    }
  };