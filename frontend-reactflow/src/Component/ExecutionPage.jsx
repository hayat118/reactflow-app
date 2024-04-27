import axios from "axios";
import React, { useState, useEffect } from "react";
import "../App.css";

const ExecutionPage = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState("");
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflowContent, setSelectedWorkflowContent] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        setWorkflows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching workflows:", error);
      });
  }, []);

  //
  const handleSelectWorkflow = () => {
    console.log(selectedWorkflow);
    if (!selectedWorkflow) {
      alert("Please select a workflow.");
      return;
    }

    axios
      .get(`http://localhost:3001/users/${selectedWorkflow}`)
      .then((response) => {
        console.log(response.data.workflow, "resss");
        setSelectedWorkflowContent(response.data.workflow);
      })
      .catch((error) => {
        console.error("Error fetching workflow content:", error);
      });
  };
  //

  return (
    <div className="execute-container">
      <h2 className="h2">Run Workflow Screen</h2>
      <div className="execute-box">
        <h3>Drag and drop Files here to Upload</h3>
        <input type="file" accept=".csv" />
      </div>
      <div>
        <label htmlFor="workflow">Select Workflow Id:</label>
        <select
          id="workflow"
          value={selectedWorkflow}
          onChange={(e) => setSelectedWorkflow(e.target.value)}
        >
          <option value="">Select Workflow:</option>
          {workflows.map((workflow) => (
            <option key={workflow.id} value={workflow.id}>
              {workflow.id}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button onClick={handleSelectWorkflow}>Run Workflow</button>
      </div>
      {selectedWorkflowContent && (
        <div>
          <h3>Content of Selected Workflow:</h3>
          <div className=" auto node-box">
            {selectedWorkflowContent.nodes.map((node) => (
              <li className=" node-inside" key={node.id}>
                <p>{node.type}</p>
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutionPage;
