import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Component/Home";
import ExecutionPage from "./Component/ExecutionPage";
import "./App.css";
import WorkflowList from "./Component/WorkflowList";

const router = createBrowserRouter([
  {
    index: true,
    element: <Home />,
  },
  {
    path: "execute",
    element: <ExecutionPage />,
  },
  {
    path: "workflowlist",
    element: <WorkflowList />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
