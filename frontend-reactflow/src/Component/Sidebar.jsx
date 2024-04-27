import React from "react";
import "../App.css";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    // console.log(event, "ev");
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="aside-box">
      <aside>
        <div className="description">Workflow Nodes</div>
        <div
          className=" dndnode start"
          onDragStart={(event) => onDragStart(event, "start")}
          draggable
        >
          start
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "filter_data")}
          draggable
        >
          Filter data
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "wait")}
          draggable
        >
          Wait
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "convert_format")}
          draggable
        >
          Convert Format
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "send_request")}
          draggable
        >
          Send POST Request
        </div>
        <div
          className="dndnode end"
          onDragStart={(event) => onDragStart(event, "end")}
          draggable
        >
          End
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
