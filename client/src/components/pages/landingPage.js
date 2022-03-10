
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import '../../styles/landingPage.css'

const LandingPage = () => {
  return (
    <div>
      <NavBar title="Landing Page" />
      <SideBar expanded={true}/>
    </div>
  )
}

export default LandingPage;