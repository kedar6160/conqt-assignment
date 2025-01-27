import React from "react";
import DraggableWidget from "./DraggableWidget";
import "./Sidebar.css";

const Sidebar = () => {

    const widgets = ["Text", "Button", "Image", "Form"];
    return (

        <div className="sidebar">
            <h3>Widgets</h3>
            {widgets.map((widget,idx)=>(
                <DraggableWidget key={idx} type={widget} />
            ))}
        </div>
    );
}

export default Sidebar;