import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import mockData from "../../mockData.js";
import axios from "axios";

import PartContainer from "../parts/partContainer"

const assigned_training_data = mockData.data.assignedTrainingPage;
const user_type = mockData.user_type;
const user_name = mockData.user_name

const AssignedTraining = (props) => {

  // DRAFT FOR FRONTEND INTEGRATION
  // const [userData, setUserData] = useState({});
  // const [assignedTrainingData, setAssignedTrainingData] = useState({});

  // const callAssignedTrainingAPI = () => {
  //   useEffect(async() => {
  //     await axios.get('http://localhost:8082/assignedTrainings/userData/6257a21d43e724e24c03dd55/incoming')
  //     .then(response => {
  //       console.log(response.data)
  //       setAssignedTrainingData(response.data)
  //     })
  //     .catch(err => console.log(err))
  //   }, [])
  // }

  // callUserDataAPI();
  // callAssignedTrainingAPI();

  // assigned training API return example
  // {
  //   incoming: [{AssignedTraining}, {AssignedTraining}, ...]
  //   outgoing: [{AssignedTraining}, {AssignedTraining}, ...]
  // }

  const [expanded, updateState] = useState(true);
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
  return (
    <div>
      <NavBar title="Assign Training" /> 
      <div className="d-flex">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={assigned_training_data} type='assignedTraining' reelItems={reelItems} expanded={expanded} user={user} user_name={user_name} containerCount='1'/>
      </div>
    </div>
  )
}

export default AssignedTraining;