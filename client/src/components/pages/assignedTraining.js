import React, { useState } from "react";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import PartContainer from "../parts/partContainer"

const AssignedTraining = (props) => {
  const [expanded, updateState] = useState(true);
  const reelItems = ['Pending', 'In Progress', 'Completed']
  const user = 'admin'

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
      <NavBar title="Assign Training" /> 
      <div className="d-flex">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer type='assignedTraining' reelItems={reelItems} expanded={expanded} user={user} containerCount='1'/>
      </div>
    </div>
  )
}

export default AssignedTraining;