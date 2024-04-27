import React, { useState, useEffect } from "react";
import axios from "axios";

const WorkflowList = () => {
  const [workflows, setWorkflows] = useState([]);

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

  return (
    <div>
      <h2 className="h2">Workflow List</h2>
      <ul className="flex list-box">
        {workflows.map((workflow) => (
          <li className="node-box" key={workflow.id}>
            <p>Id:{workflow.id}</p>

            {workflow.nodes.map((node) => (
              <div key={node.id}>
                <p className="node-inside">{node.type}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkflowList;
