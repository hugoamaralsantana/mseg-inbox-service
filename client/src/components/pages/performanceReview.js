import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import PartContainer from "../parts/partContainer"
import mockData from "../../mockData.js";

const performance_review_data = mockData.data.performanceReviewPage;
const user_type = mockData.user_type;

const PerformanceReview = (props) => {
  const [expanded, updateState] = useState(true);
  // const [modalState, updateModalState] = useState(false);
  const reelItems = ['Pending', 'In Progress', 'Completed']
  //problem is that theres just one modal for this page, we need each task to have its own

  function expandSideBar() {
    if (expanded) {
      updateState(false);
    }
    else {
      updateState(true);
    }
  }

  const user = user_type;


  return (
    <div>
      {/* TODO: when I change title = Performance Review, it gets rid of some 
      of the navbar (styling issue) */}
      <NavBar title="Performance Review" /> 
      <div className="d-flex overflow-hidden">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={performance_review_data} type='performanceReview' reelItems={reelItems} expanded={expanded} user={user} containerCount='2'/>
      </div>
    </div>
  )
}

export default PerformanceReview;