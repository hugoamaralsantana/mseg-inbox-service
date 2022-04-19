import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import mockData from "../../mockData.js";
import axios from "axios";

import PartContainer from "../parts/partContainer"

const assigned_training_data = mockData.data.assignedTrainingPage;
const user_type = mockData.user_type;

const AssignedTraining = (props) => {
  const [userData, setUserData] = useState({});
  const [assignedTrainingData, setAssignedTrainingData] = useState({});
  
  // const callUserDataAPI = () => {
  //   useEffect(async() => {
  //     await axios.get('http://localhost:8082/users/6257a21d43e724e24c03dd55')
  //     .then(response => {
  //       console.log(response.data)
  //       setUserData(response.data)
  //     })
  //     .catch(err => console.log(err))
  //   }, [])
  // }

  useEffect(() => {
    axios.get('http://localhost:8082/users/625f267aa6aeb39ee40b7aa8')
    .then(res => {
      setUserData(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get()
  })

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
  console.log(userData)
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
        <PartContainer data={assigned_training_data} type='assignedTraining' reelItems={reelItems} expanded={expanded} user={user} containerCount='1'/>
      </div>
    </div>
  )
}

export default AssignedTraining;