// DraggableItem.js

import React from "react";
import { useDrag } from "react-dnd";

const DraggableItem = ({ imageSrc }) => {
  const [, ref] = useDrag({
    type: "ITEM",
    item: { type: "ITEM", imageSrc },
  });
 
  return (
    <div className="draggable-item" ref={ref}>
      <img src={imageSrc} alt="Draggable Item" className="img-css"/>
    </div>
  );
};

export default DraggableItem;
