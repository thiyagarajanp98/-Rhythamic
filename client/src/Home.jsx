// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Home.css';
// import Navbar from './Navbar';
// import AlbumContainer from './AlbumContainer';
// import Sidebar from './Sidebar';
// import { fetchLaunchData } from './LaunchData';
// import AlbumDetails from './AlbumDetails';
// import { fetchAlbumDetails } from './FetchAlbumDetails';

// const Home = () => {
//   const [albums, setAlbums] = useState([]);
//   const [launchData, setLaunchData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // handleSearch data
//   const handleSearch = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/search/albums/');
//       const launch = {};
//       for (let key in response.data) {
//         launch[key] = response.data[key];
//       }
//       setAlbums(launch);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     // Fetch launch data
//     const fetchHomeData = async () => {
//       try {
//         const result = await fetchLaunchData();
//         setLaunchData(result);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };
//     fetchHomeData(); // Call the fetchHomeData function
//   }, []);

//   const [selectedAlbum, setSelectedAlbum] = useState(null);
//   const apicall= async(id)=>{
//     try {
//       const response = await fetchAlbumDetails(id)
//       setAlbums(response);
//       console.log(albums)
//       setLaunchData([])
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   }
//   const handleCardClick = (album) => {
//     setSelectedAlbum(album);
//     if (album[1]==='song'){
//       apicall(album[0]);
//     }
//     else if(album[1]==='album'){

//     }

//   };
//   console.log("AlbumID",selectedAlbum)

//   return (
//     <div className="Main-container">
//       <Sidebar />
//       <Navbar handleSearch={handleSearch} />
//       {loading && <div className="loader-container">
//         <div className="loader"></div>
//       </div>}
//       {launchData ? <>{Object.keys(launchData).map((key, index) => (
//         <AlbumContainer key={index} titles={launchData[key].title} launchData={launchData[key]} onClick={handleCardClick}/>
//       ))}</> : albums ? <AlbumDetails image={albums.image} title={albums.album}/>:null}
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import './Home.css';
import Navbar from './Navbar';
import AlbumContainer from './AlbumContainer';
import Sidebar from './Sidebar';
import { fetchLaunchData } from './LaunchData';
import AlbumDetails from './AlbumDetails';
import { fetchAlbumDetails } from './FetchAlbumDetails';

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALBUM_DETAIL':
      return { ...state, albumdetail: action.payload, launchData: null };
    case 'SET_LAUNCH_DATA':
      return { ...state, launchData: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SELECTED_ALBUM':
      return { ...state, selectedAlbum: action.payload };
    default:
      return state;
  }
};

const initialState = {
  albumdetail: null,
  launchData: null,
  loading: true,
  selectedAlbum: null,
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { albumdetail, launchData, loading, selectedAlbum } = state;

  // handleSearch data
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/search/albums/');
      const launch = {};
      for (let key in response.data) {
        launch[key] = response.data[key];
      }
      dispatch({ type: 'SET_LAUNCH_DATA', payload: launch });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    // Fetch launch data
    const fetchHomeData = async () => {
      try {
        const result = await fetchLaunchData();
        dispatch({ type: 'SET_LAUNCH_DATA', payload: result });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        console.error(error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    fetchHomeData(); // Call the fetchHomeData function
  }, []);

  const apicall = async (id) => {
    try {
      const response = await fetchAlbumDetails(id);
      dispatch({ type: 'SET_ALBUM_DETAIL', payload: response });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleCardClick = (album) => {
    dispatch({ type: 'SET_SELECTED_ALBUM', payload: album });

  };

  const isAlbumSelected = (albumId) => {
    if (selectedAlbum) {
      return selectedAlbum[0] === albumId;
    }
    return false;
  };

  useEffect(() => {
    if (selectedAlbum && selectedAlbum[1] === 'song') {
      apicall(selectedAlbum[0]);
    }
  }, [selectedAlbum]);

  useEffect(() => {
    console.log("selected album details got updated and the details are", albumdetail);
  }, [albumdetail]);

  return (
    <div className="Main-container">
      <Sidebar />
      <Navbar handleSearch={handleSearch} />
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {launchData ? (
        Object.keys(launchData).map((key, index) => (
          <AlbumContainer
            key={index}
            titles={launchData[key].title}
            launchData={launchData[key]}
            onClick={handleCardClick}
            check={isAlbumSelected}
          />
        ))
      ) : (
        albumdetail &&
        <AlbumDetails image={albumdetail.image.replace('150x150.jpg', '500x500.jpg')} title={albumdetail.song.replaceAll('&quot;', '"')} album={albumdetail.album.replaceAll('&quot;', '"')} singers={albumdetail.primary_artists} duration={albumdetail.duration} />

      )}
    </div>
  );
};

export default Home;
