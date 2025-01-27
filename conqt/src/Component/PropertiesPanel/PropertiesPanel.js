import React from "react";
import "./PropertiesPanel.css";
const PropertiesPanel = ({selectedWidget, updatedWidget}) => {
    if(!selectedWidget){ return <div className="properties-panel">Select a WIDGET</div>;}

    const handleChange =(e) =>{
        updatedWidget({...selectedWidget, [e.target.name]:e.target.value});
    }

    return(
        <div className="properties-panel">
            <h3>Edit Properties</h3>
            <label>
                Text:
                <input name="text" value={selectedWidget.text ||""} onChange={handleChange} />
            </label>
        </div>
    );
}
export default PropertiesPanel;