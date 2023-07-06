import "./AlbumDetails.css";
import React, { useState, useEffect, useRef, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { fetchAlbumDetails } from "./FetchAlbumDetails";
import { FetchSingleAlbum } from "./FetchSingleAlbum";
import Dropdown from "./Dropdown";

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ALBUM_DETAIL":
      return { ...state, albumData: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_MORE_FROM_ALBUM":
      return { ...state, moreFromAlbum: action.payload };
    default:
      return state;
  }
};

const initialState = {
  albumData: null,
  loading: true,
  moreFromAlbum: null,
};

const AlbumDetails = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { albumData, loading, moreFromAlbum } = state;
  const [songtype, setSongType] = useState(false);
  const [albumtype, setAlbumType] = useState(false);
  const [playlisttype, setPlaylistType] = useState(false);

  const location = useLocation();
  const propsData = location.state;
  // console.log("State - ", propsData);

  useEffect(() => {
    // Fetch album data
    const fetchAlbumData = async (id, type) => {
      try {
        const response = await fetchAlbumDetails(id, type);
        if (type === "song") {
          setSongType(true);
          dispatch({ type: "SET_ALBUM_DETAIL", payload: response.songs[0] });
          console.log("Details", albumData);
        } else if (type === "album") {
          setAlbumType(true);
          dispatch({ type: "SET_ALBUM_DETAIL", payload: response });
          console.log("Details", albumData);
        } else if (type === "playlist") {
          setPlaylistType(true);
          dispatch({ type: "SET_ALBUM_DETAIL", payload: response });
          console.log("Details", albumData);
        }

        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        console.error(error);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchAlbumData(
      propsData.perma_url.substr(
        propsData.perma_url.lastIndexOf("/") + 1,
        propsData.perma_url.length - 1
      ),
      propsData.type
    ); // Call the fetchAlbumData function
  }, []);

  const more = async () => {
    try {
      const response =
        albumData.type == "song"
          ? await FetchSingleAlbum(
              albumData.more_info.album_url.substr(
                albumData.more_info.album_url.lastIndexOf("/") + 1,
                albumData.more_info.album_url.length - 1
              ),
              albumData.id
            )
          : null;
      dispatch({ type: "SET_MORE_FROM_ALBUM", payload: response });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      console.error(error);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    more();
  }, [albumData]);

  const handleButtonClick = (buttonType) => {
    // Handle button click based on buttonType
    console.log(`Button ${buttonType} clicked`);
  };

  const secondsToTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let timeString = "";

    if (hours > 0) {
      timeString += `${hours < 10 ? "0" : ""}${hours}:`;
    }

    timeString += `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;

    return timeString;
  };

  return (
    <div className="image-with-title-container">
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {albumData && (
        <div className="image-with-title-content">
          <img
            src={albumData.image.replace("150x150.jpg", "500x500.jpg")}
            alt="Image"
            className="image-with-title-img"
          />
          <div>
            <h2>{albumData.title.replaceAll("&quot;", '"')}</h2>
            {songtype && (
              <>
                <p>
                  {albumData.more_info.album.replaceAll("&quot;", '"')} by{" "}
                  {albumData.more_info.artistMap.primary_artists
                    .map((data) => data.name)
                    .join(", ")}
                </p>
                <p>
                  Duration · {secondsToTime(+albumData.more_info.duration)} sec
                </p>
              </>
            )}
            {albumtype && (
              <>
                <p>
                  {" "}
                  by{" "}
                  {albumData.more_info.artistMap.primary_artists
                    .map((data) => data.name)
                    .join(", ")}{" "}
                  · {albumData.more_info.song_count} Songs
                </p>
                <p>
                  Duration ·{" "}
                  {secondsToTime(
                    albumData.list
                      .map((data) => +data.more_info.duration)
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                  )}{" "}
                  sec
                </p>
              </>
            )}
            {playlisttype && (
              <>
                <p>
                  {" "}
                  {albumData.subtitle} · {albumData.list_count} Songs
                </p>
              </>
            )}
            <div className="button-container">
              <button
                onClick={() => handleButtonClick("Button 1")}
                className="play"
              >
                Play Now
              </button>
              <Dropdown items={["Menu Item 1", "Menu Item 2", "Menu Item 3"]} />
            </div>
          </div>
        </div>
      )}
      {moreFromAlbum && moreFromAlbum.list_count > 1 ? (
        <div className="item-list">
          <h2 className="more-title">
            More from {albumData.more_info.album.replaceAll("&quot;", '"')}{" "}
          </h2>
          {moreFromAlbum.list.map((item, index) => (
            <div key={index} className="item-row">
              <div className="item-cell">{item.title}</div>
              <div className="item-cell">
                {item.subtitle.substr(0, item.subtitle.lastIndexOf(" - "))}
              </div>
              <div className="item-cell">
                {secondsToTime(item.more_info.duration)}
              </div>
              <div className="item-cell">
                <Dropdown
                  items={["Menu Item 1", "Menu Item 2", "Menu Item 3"]}
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default AlbumDetails;
