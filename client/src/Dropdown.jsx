import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";
const Dropdown = ({ items }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    const checkDropdownOverflow = () => {
      if (menuRef.current) {
        const dropdownHeight = menuRef.current.offsetHeight;
        console.log("drop", dropdownHeight);
        const viewportHeight = window.innerHeight;
        console.log("down", viewportHeight);
        console.log("pos", position.y);
        const positionY =
          position.y + dropdownHeight >= viewportHeight ? 20 : 50;
        setPosition({ x: 0, y: positionY });
      }
    };

    if (showMenu) {
      checkDropdownOverflow();
    }
  }, [showMenu]);

  const handleContextMenu = (event) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    setPosition({ x: clientX, y: clientY });
    setShowMenu(true);
  };

  const handleMenuClick = (item) => {
    // Handle the menu item click here
    console.log(`Clicked on ${item}`);
    setShowMenu(false);
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
    <div className="dropdown">
      <button onClick={handleContextMenu} className="more">
        · · ·
      </button>
      {showMenu && (
        <ul
          ref={menuRef}
          style={{
            top: position.y,
            left: position.x,
          }}
          className="dropdown-menu"
        >
          {items.map((item, index) => (
            <li key={index} onClick={() => handleMenuClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
