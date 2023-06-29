import './AlbumDetails.css';
import React, { useState, useEffect, useRef, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { fetchAlbumDetails } from './FetchAlbumDetails';

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALBUM_DETAIL':
      return { ...state, albumData: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const initialState = {
  albumData: null,
  loading: true,
};

const AlbumDetails = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { albumData, loading } = state;
  const [songtype, setSongType] =useState(false);
  const [albumtype, setAlbumType] =useState(false);
  const [playlisttype, setPlaylistType] =useState(false);

  const location = useLocation();
  const propsData = location.state;
  // console.log("State - ", propsData);

  useEffect(() => {
    // Fetch album data
    const fetchAlbumData = async () => {
      try {
        const response = await fetchAlbumDetails(propsData.perma_url.substr(propsData.perma_url.lastIndexOf('/') + 1, propsData.perma_url.length - 1), propsData.type);
        if(propsData.type === 'song'){
          setSongType(true)
          dispatch({ type: 'SET_ALBUM_DETAIL', payload: response.songs[0] });
        }
        else {
          setAlbumType(true)
          dispatch({ type: 'SET_ALBUM_DETAIL', payload: response});
        }
        
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        console.error(error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
      
    };
    fetchAlbumData(); // Call the fetchAlbumData function
  }, []);

  useEffect(() => {
    console.log("Details", albumData)
    // console.log( albumData.list.map((data)=>+data.more_info.duration).reduce((accumulator, currentValue) => accumulator + currentValue, 0))
    // albumData["image"]=albumData.image.replace('150x150.jpg', '500x500.jpg')
    // albumData["title"]=albumData.title.replaceAll('&quot;', '"')
  }, [albumData]);

  const handleButtonClick = (buttonType) => {
    // Handle button click based on buttonType
    console.log(`Button ${buttonType} clicked`);
  };

  const secondsToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    setPosition({ x: clientX, y: clientY });
    setShowMenu(true);
  };

  const handleMenuClick = () => {
    setShowMenu(false);
    // Perform actions based on the selected menu item
    // ...
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="image-with-title-container">
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {albumData && <div className="image-with-title-content">
        <img
          src={albumData.image.replace('150x150.jpg', '500x500.jpg')}
          alt="Image"
          className="image-with-title-img"
        />
        <div>
          <h2>{albumData.title.replaceAll('&quot;', '"')}</h2>
          {songtype && <><p>{albumData.more_info.album.replaceAll('&quot;', '"')} by {albumData.more_info.artistMap.primary_artists.map((data)=>data.name).join(', ')}</p>
          <p>Duration  ·  {secondsToMinutes(+albumData.more_info.duration)} sec</p></>}
          {albumtype && <><p> by {albumData.more_info.artistMap.primary_artists.map((data)=>data.name).join(', ')}  ·  {albumData.list.length-1} Songs</p>
          <p>Duration  ·  {secondsToMinutes(albumData.list.map((data)=>+data.more_info.duration).reduce((accumulator, currentValue) => accumulator + currentValue, 0))} sec</p></>}
          <div className="button-container">
            <button onClick={() => handleButtonClick('Button 1')} className='play'>
              Play Now
            </button>
            <button onClick={handleContextMenu} className='more'>
              · · ·
            </button>
            {showMenu && (
              <div
                ref={menuRef}
                style={{
                  top: position.y,
                  left: position.x
                }}
                className='dropdown'
              >
                <ul>
                  <li onClick={handleMenuClick}>Menu Item 1</li>
                  <li onClick={handleMenuClick}>Menu Item 2</li>
                  <li onClick={handleMenuClick}>Menu Item 3</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
};


export default AlbumDetails;
