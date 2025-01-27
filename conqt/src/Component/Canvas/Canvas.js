
import React from "react";
import { useDrop } from "react-dnd";
import "./Canvas.css";

const Canvas = ({ widgets, addWidget, isPreviewMode,selectedWidget, handleWidgetSelect,handleEditWidget,handleResize}) => {


    const [, dropRef] = useDrop({
        accept: "WIDGET",
        drop: (item, monitor) => {
            if (!isPreviewMode) {
                const offset = monitor.getClientOffset();
                addWidget({ ...item, position: offset, id:Date.now(),
                    width:100,
                    height:100,
                });
            }
        }
    });

    const handleWidgetClick = (widget) => {
        handleWidgetSelect(widget);
    };
    const handleTextChange=(e)=>{
        const updatedWidget = {...selectedWidget,text:e.target.value};
        handleEditWidget(updatedWidget);
    }
    const handleResizeWidget = (e, direction)=>{
        if(selectedWidget && !isPreviewMode){
            const newWidth = direction === "right" ? e.clientX - selectedWidget.position.x : selectedWidget.width;
            const newHeight = direction === "bottom" ? e.clientY - selectedWidget.position.y : selectedWidget.height;
            handleResize(selectedWidget.id,newWidth,newHeight);
        }
    }
    const handleImageURLChange=(e)=>{
        const updatedWidget = {...selectedWidget,imageURL:e.target.value};
        handleEditWidget(updatedWidget);
    }

    return (
        <div ref={dropRef} className="canvas">
            {widgets.map((widget) => (
                <div key={widget.id}
                    className={`canvas-widget ${widget.id === selectedWidget?.id ?"selected": ""}`}

                    cursor={isPreviewMode ? "default" : "move"}
                    style={{
                        position: "absolute",
                        left: widget.position?.x || 0,
                        top: widget.position?.y || 0,
                        border: selectedWidget?.id === widget.id ? "2px solid blue" : "none",
                        width:widget.width||100,
                        height:widget.height||100,
                        zIndex: widget.id === selectedWidget?.id ? 100 : 1,
                    }}

                    onClick={() => handleWidgetClick(widget)}>

                    {widget.type === "Text" ?(
                        <input type="text" value={widget.text} onChange={handleTextChange} disabled={isPreviewMode}/>

                    ): widget.type === "Button" ? (
                        <button disabled={isPreviewMode}>{widget.text}</button>
                    ): widget.type === "Image" ? (
                        <img src={widget.imageURL} onChange={handleImageURLChange} alt="img" style={{ width: "100%" }} />
                    ): null}

                    {widget.id === selectedWidget?.id && !isPreviewMode && (<>
                        <div className="resizer top" onMouseDown={(e)=>handleResizeWidget(e,"top")}></div>
                        <div className="resizer right" onMouseDown={(e)=>handleResizeWidget(e,"right")}></div>
                        <div className="resizer bottom" onMouseDown={(e)=>handleResizeWidget(e,"bottom")}></div>
                        <div className="resizer left" onMouseDown={(e)=>handleResizeWidget(e,"left")}></div>
                  
                    </>)}
                </div>
            ))}
        </div>
    )
};

export default Canvas;
