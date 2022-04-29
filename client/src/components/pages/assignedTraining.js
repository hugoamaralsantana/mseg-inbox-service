import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import mockData from "../../mockData.js";
import axios from "axios";
import moment from "moment";

import PartContainer from "../parts/partContainer"


const AssignedTraining = (props) => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const firstName = userData.first_name
  const lastName = userData.last_name
  const id = userData._id
  const userType = userData.user_type
  const [assignedTrainingData, setAssignedTrainingData] = useState({});
  const [changingData, updateChangeingData] = useState({})
  const [expanded, updateState] = useState(true);
  const [boxState, updateBoxState] = useState(false);
  const reelItems = ['Pending', 'In Progress', 'Completed']
  const [effectCheck, updateCheck] = useState(false)
  const check = useRef(false);

  useEffect(() => {
    async function update() {
    await axios.get(`http://localhost:8082/assignedTrainings/userData/${id}`)
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
        if (!check.current) {
          updateChangeingData(returnData)
          check.current = true
        }
      })
      .catch(err => console.log(err))
  }
    update()
    console.log('HI')
  }, [effectCheck, id])

  function filterData(filter) {
    if (filter === '') {
      if (effectCheck) {updateCheck(false)}
      else updateCheck(true)
    }
    let returnData = {'incoming': [], 'outgoing': []}
    const incoming = changingData.incoming
    const outgoing = changingData.outgoing
    incoming.forEach(task => {
      if (task.sender.toLowerCase().startsWith(filter.toLowerCase())) {
        returnData.incoming.push(task)
      }
    })
    outgoing.forEach(task => {
      if (task.recipient.toLowerCase().startsWith(filter.toLowerCase())) {
        returnData.outgoing.push(task)
      }
    })
    setAssignedTrainingData(returnData)
  }

  async function updateTask(status, task) {
    await axios.put(`http://localhost:8082/assignedTrainings/${task._id}`, {
      "type": "assignedTraining",
      "status": status,
      "recipient": task.recipient,
      "recipient_id": task.recipient_id,
      "sender": task.sender,
      "sender_id": task.sender_id,
      "due_date": task.due_date,
      "recipient_comments": task.recipient_comments,
      "sender_comments": task.sender_comments,
      "training": task.training,
      "is_completed": task.is_completed,
      "sender_favorited": task.sender_favorited,
      "recipient_favorited": task.recipient_favorited
    })
    .then(res => {
      if (effectCheck) {updateCheck(false)}
      else updateCheck(true)
    })
  }

  async function createTask(data) {
    console.log(data)
    await axios.post('http://localhost:8082/assignedTrainings/sendAll', {
      "type": "assignedTraining",
      "status": "pending",
      "recipient": null,
      "recipient_id": null,
      "sender": firstName + ' ' + lastName,
      "sender_id": id,
      "due_date": moment().add(14, 'days').format('YYYY-MM-DD'),
      "recipient_comments": null,
      "sender_comments": null,
      "training": data.training,
      "is_completed": false,
      "sender_favorited": false,
      "recipient_favorited": false
    })
    .then(res => {
      if (effectCheck) {updateCheck(false)}
      else updateCheck(true)
    })
  }

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
      <NavBar title="Assign Training" showBox={showBox} filterData={filterData}/> 
      <div className="d-flex overflow-hidden">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={assignedTrainingData} type='assignedTraining' reelItems={reelItems} expanded={expanded} userType={userType} user_name={firstName + ' ' + lastName} containerCount='1' boxState={boxState} closeBox={closeBox} updateTask={updateTask} createTask={createTask}/>
      </div>
    </div>
  )
}

export default AssignedTraining;