import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import DraggableItem from "./DraggableItem"; // Import your DraggableItem component
import img1 from "../Images/img1.png";
import img2 from "../Images/img2.png";
import img3 from "../Images/img3.png";
import img4 from "../Images/img4.png";
import { GrSelect } from "react-icons/gr";
import { BiText } from "react-icons/bi";
import { IoMdColorPalette } from "react-icons/io";
import { FiRotateCw } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const HomePage = () => {
  const [droppedItems, setDroppedItems] = React.useState([]); // To keep track of dropped items
  const [selectedItemId, setSelectedItemId] = React.useState(null); // To keep track of the selected item ID
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [isTexting, setIsTexting] = React.useState(false);
  const [text, setText] = React.useState(""); // To store user-entered text
  const [textPosition, setTextPosition] = React.useState({ x: 0, y: 0 });
  const rightBoxRef = React.useRef(null);

  // Define the drop target
  const [, drop] = useDrop({
    accept: "ITEM",
    drop: (item, monitor) => {
      const { x, y } = monitor.getClientOffset();

      // Calculate the new position based on the mouse position within the right box
      const rightBoxRect = rightBoxRef.current.getBoundingClientRect();
      const newX = x - rightBoxRect.left;
      const newY = y - rightBoxRect.top;

      setDroppedItems([
        ...droppedItems,
        { id: Date.now(), imageSrc: item.imageSrc, x: newX, y: newY },
      ]);
    },
  });

  const handleSelectItem = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handleDeleteItem = () => {
    if (selectedItemId) {
      const updatedItems = droppedItems.filter((item) => item.id !== selectedItemId);
      setDroppedItems(updatedItems);
      setSelectedItemId(null);
    }
  };

  const handleRotateItem = () => {
    if (selectedItemId) {
      const updatedItems = droppedItems.map((item) => {
        if (item.id === selectedItemId) {
          return { ...item, rotation: (item.rotation || 0) + 45 };
        }
        return item;
      });
      setDroppedItems(updatedItems);
    }
  };

  const handleToggleSelectTool = () => {
    setIsSelecting(!isSelecting);
    setIsTexting(false);
  };

  const handleToggleTextTool = () => {
    setIsTexting(!isTexting);
    setIsSelecting(false);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const handleAddText = () => {
    if (selectedItemId) {
      // Add the entered text to the selected item
      const updatedItems = droppedItems.map((item) => {
        if (item.id === selectedItemId) {
          return { ...item, text: text };
        }
        return item;
      });
      setDroppedItems(updatedItems);
      setIsTexting(!isTexting);
      setIsSelecting(false);
    }
  };

  return (
    <div>
      <div>
        <div className="left-box">
          {/* Small square shape boxes with draggable items */}
          <div className="square-box">
            <DraggableItem imageSrc={img1} /> {/* Use your own image source */}
          </div>
          <div className="square-box">
            <DraggableItem imageSrc={img2} /> {/* Use your own image source */}
          </div>
          <div className="square-box">
            <DraggableItem imageSrc={img3} /> {/* Use your own image source */}
          </div>
          <div className="square-box">
            <DraggableItem imageSrc={img4} /> {/* Use your own image source */}
          </div>
          <div className="square-box">
            <DraggableItem imageSrc={img2} /> {/* Use your own image source */}
          </div>
        </div>
      </div>
      <div className="box-right" id="box-right" ref={(node) => {
        rightBoxRef.current = node;
        drop(node);
      }}>
        {/* Display dropped items in box-right */}
        {droppedItems.map((item) => (
          <div
            key={item.id}
            className="drop-items"
            style={{
              left: item.x,
              top: item.y,
              transform: `rotate(${item.rotation || 0}deg)`,
              border: selectedItemId === item.id ? "2px solid red" : "2px solid transparent",
              position: "absolute",
            }}
            onClick={() => handleSelectItem(item.id)}
          >
            <img src={item.imageSrc} alt="Dropped Item" className="img-css" />
            {item.text && <div className="text-overlay">{item.text}</div>}
          </div>
        ))}
      </div>
      <div className="edit-box">
        <div className="icons">
          <GrSelect onClick={handleToggleSelectTool} style={{ color: isSelecting ? "red" : "inherit" }} />
          <BiText onClick={handleToggleTextTool} style={{ color: isTexting ? "red" : "inherit" }} />
          <IoMdColorPalette />
          <FiRotateCw onClick={handleRotateItem} />
          <AiOutlineDelete onClick={handleDeleteItem} />
        </div>
        {isTexting && (
          <div>
            <input type="text" value={text} onChange={handleTextChange} />
            <button onClick={handleAddText}>Add Text</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
