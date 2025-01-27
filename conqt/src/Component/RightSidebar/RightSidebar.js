import React, { useEffect, useState } from "react";

const RightSidebar = ({ selectedWidget, updateWidget }) => {
    const [text, setText] = useState("");
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        if (selectedWidget) {
            if (selectedWidget.type === "Text") {
                setText(selectedWidget.text || "");
            } else if (selectedWidget.type === "Image") {
                setImageURL(selectedWidget.imageURL || "");
            }
        }
    }, [selectedWidget]);
    const handleTextChange = (e) => {
        setText(e.target.value);
        if (selectedWidget && selectedWidget.type === "Text") {
            updateWidget({ ...selectedWidget, text: e.target.value });
        }
    };

    const handleImageURLChange = (e) => {
        setImageURL(e.target.value);
        if (selectedWidget && selectedWidget.type === "Image") {
            updateWidget({ ...selectedWidget, imageURL: e.target.value });
        }
    };

    return (
        <div className="right-sidebar">
            {selectedWidget ? (
                <>{selectedWidget.type === "Text" && (
                    <div>
                        <label>Text</label>
                        <input
                            type="text"
                            value={text}
                            onChange={handleTextChange}
                        />
                    </div>
                )}{
                    selectedWidget.type === "Image" && (
                        <div>
                            <label>Image URL</label>
                            <input
                                type="text"
                                value={imageURL}
                                onChange={handleImageURLChange}
                            />
                        </div>
                    )
                }

                </>) : (
                <div className="no-widget-selected">No Widget Selected</div>
            )}
        </div>

    );
};

export default RightSidebar;