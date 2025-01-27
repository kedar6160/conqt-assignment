import React from "react";
import "./PreviewToggle.css";
const PreviewToggle = ({ isPreview, toggelPreview }) => {
    return(
<button className="preview-toggle" onClick={toggelPreview}>
    {isPreview ? "Edit" : "Preview"}
</button>

    );

}

export default PreviewToggle;