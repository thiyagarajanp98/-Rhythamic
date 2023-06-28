import './AlbumDetails.css';
import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DROPDOWN':
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case 'SELECT_OPTION':
      return {
        ...state,
        selectedOption: action.payload,
        isOpen: false
      };
    default:
      return state;
  }
};

const initialState = {
  isOpen: false,
  selectedOption: null
};

const AlbumDetails = ({ image, title, album, singers, duration }) => {
  const handleButtonClick = (buttonType) => {
    // Handle button click based on buttonType
    console.log(`Button ${buttonType} clicked`);
  };

  const secondsToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDropdonwButtonClick = () => {
    dispatch({ type: 'TOGGLE_DROPDOWN' });
  };

  const handleOptionClick = (option) => {
    dispatch({ type: 'SELECT_OPTION', payload: option });
  };
  return (
    <div className="image-with-title-container">
      <div className="image-with-title-content">
        <img
          src={image}
          alt="Image"
          className="image-with-title-img"
        />
        <div>
          <h2>{title}</h2>
          <p>{album} by {singers}</p>
          <p>Duration  ·  {secondsToMinutes(duration)} sec</p>
          <div className="button-container">
            <button onClick={() => handleButtonClick('Button 1')} className='play'>
              Play Now
            </button>
            <div className="dropdown-button">
              <button onClick={handleDropdonwButtonClick}>Open Dropdown</button>
              {state.isOpen && (
                <div className="dropdown">
                  <ul>
                    <li onClick={() => handleOptionClick('Option 1')}>Option 1</li>
                    <li onClick={() => handleOptionClick('Option 2')}>Option 2</li>
                    <li onClick={() => handleOptionClick('Option 3')}>Option 3</li>
                  </ul>
                </div>
              )}
              {state.selectedOption && <p>Selected option: {state.selectedOption}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AlbumDetails;
