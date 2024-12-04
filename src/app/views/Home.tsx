import "./styles.scss";
import Dashboard from "../containers/Dashboard/Dashboard";
import Sidebar from "../containers/Sidebar/Sidebar";
const Home = () => {
  return (
    <main className="main-layout">
      <Sidebar />
      <Dashboard />
    </main>
  );
};

export default Home;
