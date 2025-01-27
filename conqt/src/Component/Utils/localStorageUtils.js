export const saveLayout = (layout) => {
    localStorage.setItem("pageLayout",JSON.stringify(layout));

};

export const loadLayout = () => {const layout = localStorage.getItem("pageLayout");
    return layout ? JSON.parse(layout) : [];
};