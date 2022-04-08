import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import PartContainer from "../parts/partContainer"
import mockData from "../../mockData.js";

const pto_request_data = mockData.data.PTORequestPage;
const user_type = mockData.user_type;

const PTORequestPage = (props) => {
  const [expanded, updateState] = useState(true);
  const [filteredData, filterData] = useState(pto_request_data)
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
    for (const key in pto_request_data.incoming) {
      newObj.incoming[key] = pto_request_data.incoming[key].filter(task => {
        if (task.sender.toLowerCase().startsWith(filter.toLowerCase())){
          return true;
        }
        else return false;
      })
    }
    for (const key in pto_request_data.outgoing) {
      newObj.outgoing[key] = pto_request_data.outgoing[key].filter(task => {
        if (task.recipient.toLowerCase().startsWith(filter.toLowerCase())) return true;
        else return false;
      })
    }
    filterData(newObj)
  }
  return (
    <div>
      <NavBar title="PTO Request" filteringData={filteringData}/> 
      <div className="d-flex">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={filteredData} type='PTORequest' reelItems={reelItems} expanded={expanded} user={user} containerCount='1'/>
      </div>
    </div>
  )
}

export default PTORequestPage;