import React, { useState } from "react";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import PartContainer from "../parts/partContainer"
import mockData from "../../mockData.js";

const pto_request_data = mockData.data.PTORequestPage;
const user_type = mockData.user_type;
const user_name = mockData.user_name
const user_email = mockData.user_email

const PTORequestPage = (props) => {
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
      <NavBar title="PTO Request" showBox={showBox}/> 
      <div className="d-flex">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={pto_request_data} type='PTORequest' reelItems={reelItems} expanded={expanded} user={user} user_name={user_name} user_email={user_email} containerCount='1' boxState={boxState} closeBox={closeBox}/>
      </div>
    </div>
  )
}

export default PTORequestPage;