import "../App.css";
import Workflow from "./Workflow";
import Header from "./Header";
// import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="flex">
        {/* <Sidebar /> */}
        <Workflow />
      </div>
    </>
  );
};

export default Home;
