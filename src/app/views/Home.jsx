import styles from "./styles.scss";
import Dashboard from "../containers/Dashboard/Dashboard";
import Sidebar from "../containers/Sidebar/Sidebar";
const Home = () => {
    return(
       <main className="main-layout">
          <section>
            <Sidebar/>
          </section>
          <section>
            <Dashboard/>
          </section>
       </main>
    )
}

export default Home;