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
  const [userData, setUserData] = useState({});
  const [assignedTrainingData, setAssignedTrainingData] = useState({});

  const [expanded, updateState] = useState(true);
  const [boxState, updateBoxState] = useState(false);
  const reelItems = ['Pending', 'In Progress', 'Completed']
  const user = user_type;

  useEffect(() => {
    async function update() {
    await axios.get('http://localhost:8082/assignedTrainings/userData/625f267aa6aeb39ee40b7aa8')
      .then(res => {
        console.log(res.data)
        const incoming = res.data.incoming
        const outgoing = res.data.outgoing
        let returnData = {'incoming': [], 'outgoing': []}
        let incomingArr = []
        let outgoingArr = []
        incoming.sort((a, b) => (b.due_date > a.due_date) ? 1: -1)
        outgoing.sort((a, b) => (b.due_date > a.due_date) ? 1: -1)
        incoming.forEach(task => {
          if (task.recipient_favorited) {
            incomingArr.unshift(task); return
          } else {incomingArr.push(task)}
        })
        outgoing.forEach(task => {
          if (task.sender_favorited) {
            outgoingArr.unshift(task); return
          } else {outgoingArr.push(task)}
        })
        returnData.incoming = incomingArr
        returnData.outgoing = outgoingArr
        setAssignedTrainingData(returnData)
      })
      .catch(err => console.log(err))
  }
    update()
    console.log('HI')
  }, [])

  function expandSideBar() {
    if (expanded) {
      updateState(false);
    }
    else {
        updateState(true);
    }
  }
  function showBox() {
    updateBoxState(true);
  }
  
  function closeBox() {
      updateBoxState(false);
  }
  return (
    <div>
      <NavBar title="Assign Training" showBox={showBox}/> 
      <div className="d-flex">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={assignedTrainingData} type='assignedTraining' reelItems={reelItems} expanded={expanded} user={user} user_name={user_name} containerCount='1' boxState={boxState} closeBox={closeBox}/>
      </div>
    </div>
  )
}

export default AssignedTraining;