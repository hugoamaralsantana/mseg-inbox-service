import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import mockData from "../../mockData.js";

import PartContainer from "../parts/partContainer"

const assigned_training_data = mockData.data.assignedTrainingPage;
const user_type = mockData.user_type;

const AssignedTraining = (props) => {
  const [expanded, updateState] = useState(true);
  const [filteredData, filterData] = useState(assigned_training_data)
  const reelItems = ['Pending', 'In Progress', 'Completed']
  const user = user_type;

  function expandSideBar() {
    if (expanded) {
      updateState(false);
    }
    else {
        updateState(true);
    }
  }

  function filteringData(filter) {
    const newObj = {
      "incoming":{
          "pending":[
          ],
          "inProgress":[
              
          ],
          "completed":[
              
          ]
      },
      "outgoing":{
          "pending":[
          ],
          "inProgress":[
              
          ],
          "completed":[
              
          ]
      }
    }
    for (const key in assigned_training_data.incoming) {
      newObj.incoming[key] = assigned_training_data.incoming[key].filter(task => {
        if (task.sender.toLowerCase().startsWith(filter.toLowerCase())){
          return true;
        }
        else return false;
      })
    }
    for (const key in assigned_training_data.outgoing) {
      newObj.outgoing[key] = assigned_training_data.outgoing[key].filter(task => {
        if (task.recipient.toLowerCase().startsWith(filter.toLowerCase())) return true;
        else return false;
      })
    }
    filterData(newObj)
  }
  return (
    <div>
      <NavBar title="Assign Training" filteringData={filteringData}/> 
      <div className="d-flex">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={filteredData} type='assignedTraining' reelItems={reelItems} expanded={expanded} user={user} containerCount='1'/>
      </div>
    </div>
  )
}

export default AssignedTraining;