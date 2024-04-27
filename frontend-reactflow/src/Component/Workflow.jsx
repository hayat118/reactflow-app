import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  // Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

import "../App.css";
import Sidebar from "./Sidebar";
import WorkflowList from "./WorkflowList";

const initialNodes = [
  {
    id: "0",
    type: "start",
    data: { label: "start" },
    position: { x: 250, y: 5 },
  },
];

let id = 1;
const getId = () => `dndnode_${id++}`;

const Workflow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [workflowId, setWorkflowId] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  //
  const generateWorkflowId = () => {
    return `workflow_${Date.now()}`;
  };
  //

  const handleSave = () => {
    const workflowData = {
      id: generateWorkflowId(),
      nodes,
      edges,
    };

    axios
      .post("http://localhost:3001/users/save-workflow", workflowData)
      .then((response) => {
        console.log(response.data);
        setWorkflowId(response.data.id);
        // console.log();
        setSuccessMessage(true);
        setNodes([]);
        setEdges([]);
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error saving workflow:", error);
      });
  };

  //

  return (
    <div className="container">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <div className="flex space-btn">
            <h3>Workflow Id:{workflowId}</h3>
            <button className="button" onClick={handleSave}>
              Save Workflow
            </button>
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          ></ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default Workflow;
