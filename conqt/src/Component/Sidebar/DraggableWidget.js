import React from "react";
import { useDrag } from "react-dnd";

const DraggableWidget = ({ type }) => {

    const [, dragRef] = useDrag(()=>({
        type: "WIDGET",
        item: { type },
    }));

    return (

        <div ref={dragRef} className="draggable-widget">
            {type}
        </div>
    );
}
export default DraggableWidget;