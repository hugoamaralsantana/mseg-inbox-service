import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import PartContainer from "../parts/partContainer"

const PerformanceReview = () => {
  return (
    <div>
      {/* TODO: when I change title = Performance Review, it gets rid of some 
      of the navbar (styling issue) */}
      <NavBar title="Performance *" /> 
      <PartContainer></PartContainer>
      <SideBar expanded={true}/>
    </div>
  )
}

export default PerformanceReview;