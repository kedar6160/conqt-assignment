import React, { useEffect, useState } from 'react';
import Sidebar from './Component/Sidebar/Sidebar';
import Canvas from './Component/Canvas/Canvas';
import PropertiesPanel from './Component/PropertiesPanel/PropertiesPanel';
import PreviewToggle from './Component/PreviewToggle/PreviewToggle';
import { saveLayout,loadLayout } from './Component/Utils/localStorageUtils';
import RightSidebar from './Component/RightSidebar/RightSidebar';
import './App.css';

function App() {
const [widgets,setWidgets] = useState(loadLayout());
const [selectedWidget,setSelectedWidget] = useState(null);
const [isPreview,setIsPreview] = useState(false);
useEffect(()=>{ 
  if(widgets.length){
    localStorage.setItem("widgets",JSON.stringify(widgets));
  }
},[widgets]);

useEffect(()=>{
  const savedWidgets = JSON.parse(localStorage.getItem("widgets"));
  if(savedWidgets){
    setWidgets(savedWidgets);
  }
},[]);

const addWidget = (widget)=>{
  const newWidget = {
    ...widget,id:Date.now(),
  };
  setWidgets((prevWidgets)=>[...prevWidgets,newWidget]);
}

const toggelPreview = ()=>{
  setIsPreview(!isPreview);
} 
const handleWidgetSelect = (widget)=>{
  setSelectedWidget(widget);
}

const updatedWidget = (updatedWidget)=>{
  const updatedWidgets = widgets.map((widget)=>widget.id===updatedWidget.id?updatedWidget:widget);
 
setWidgets(updatedWidgets);
saveLayout(updatedWidgets);
};
const handleEditWidget = (updatedWidget)=>{
setWidgets(prevWidgets=>prevWidgets.map((widget)=>widget.id===updatedWidget.id?updatedWidget:widget));
setSelectedWidget(updatedWidget);
}
const handleResize = (id,newWidth,newHeight)=>{
const updatedWidget = widgets.find(widget=>widget.id===id);
updatedWidget.width = newWidth;
updatedWidget.height = newHeight;
handleEditWidget(updatedWidget);
}
// const selectedWidget = widgets.find((widget)=>widget.id===selectedWidget);


  return (
 
    <div className="App">
      <Sidebar handleWidgetSelect={handleWidgetSelect} /> 

      <Canvas 
      widgets={widgets}
      addWidget={addWidget}
      isPreviewMode={isPreview}
      selectedWidget={setSelectedWidget}
      handleWidgetSelect={handleWidgetSelect}
      handleEditWidget={updatedWidget}
      handleResize={handleResize}
      />
      <RightSidebar selectedWidget={selectedWidget} updateWidget={updatedWidget} />
      <PropertiesPanel 
      selectedWidget={selectedWidget}
      updatedWidget={updatedWidget}
       />
       <PreviewToggle isPreview={isPreview} toggelPreview={toggelPreview} />

    </div>
 
  );
}

export default App;
