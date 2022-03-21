import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import PartContainer from "../parts/partContainer"

const PerformanceReview = (props) => {
  const [expanded, updateState] = useState(true);
  const reelItems = ['Pending', 'In Progress', 'Completed']

  function expandSideBar() {
    if (expanded) {
      updateState(false);
  }
  else {
      updateState(true);
  }
  }
  return (
    <div>
      {/* TODO: when I change title = Performance Review, it gets rid of some 
      of the navbar (styling issue) */}
      <NavBar title="Performance Review" /> 
      <div className="d-flex">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer reelItems={reelItems} expanded={expanded}/>
      </div>
    </div>
  )
}

export default PerformanceReview;