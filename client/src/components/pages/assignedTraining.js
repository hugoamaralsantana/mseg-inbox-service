import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import mockData from "../../mockData.js";

import PartContainer from "../parts/partContainer"

const assigned_training_data = mockData.data.assignedTrainingPage;
const user_type = mockData.user_type;
const user_name = mockData.user_name
const user_email = mockData.user_email

const AssignedTraining = (props) => {
  const [expanded, updateState] = useState(true);
  const reelItems = ['Pending', 'In Progress', 'Completed']
  const user = user_type;
  const [boxState, updateBoxState] = useState(false);

  function showBox() {
      updateBoxState(true);
  }
    
  function closeBox() {
      updateBoxState(false);
  }

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
      <NavBar title="Assign Training" showBox={showBox}/> 
      <div className="d-flex">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={assigned_training_data} type='assignedTraining' reelItems={reelItems} expanded={expanded} user={user} user_name={user_name} user_email={user_email} containerCount='1' boxState={boxState} closeBox={closeBox}/>
      </div>
    </div>
  )
}

export default AssignedTraining;