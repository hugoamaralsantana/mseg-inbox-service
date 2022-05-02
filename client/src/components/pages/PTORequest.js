import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import PartContainer from "../parts/partContainer"
import mockData from "../../mockData.js";
import moment from "moment";

const PTORequestPage = (props) => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const firstName = userData.first_name
  const lastName = userData.last_name
  const id = userData._id
  const userType = userData.user_type
  const managerid = userData.manager_id
  const [expanded, updateState] = useState(true);
  const reelItems = ['Pending', 'In Progress', 'Completed']
  const [PTORequestData, setPTORequestData] = useState({});
  const [changingData, updateChangeingData] = useState({})
  const [boxState, updateBoxState] = useState(false);
  const [effectCheck, updateCheck] = useState(false)
  const check = useRef(false)


  useEffect(() => {
    async function update() {
    await axios.get(`http://localhost:8082/PTORequests/userData/${id}`)
      .then(res => {
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
        setPTORequestData(returnData)
        if (!check.current) {
          updateChangeingData(returnData)
          check.current = true
        }
      })
      .catch(err => console.log(err))
  }
    update()
  }, [effectCheck, id])

  function filterData(filter) {
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
    setPTORequestData(returnData)
  }

  async function updateTask(status, task, data) {
    await axios.put(`http://localhost:8082/PTORequests/${task._id}`, {
      "type": "PTORequest",
      "status": status === 'exit' ? 'inProgress' : status === 'submit' ? 'completed' : 'pending',
      "recipient": task.recipient,
      "recipient_id": task.recipient_id,
      "due_date": task.due_date,
      "sender": task.sender,
      "sender_id": task.sender_id,
      "recipient_comments": status === 'exit' || status === 'submit' ? data.recipient_comments : task.recipient_comments,
      "sender_comments": task.sender_comments,
      "pto_type": task.pto_type,
      "pto_start": task.pto_start,
      "pto_end": task.pto_end,
      "sender_favorited": task.sender_favorited,
      "recipient_favorited": task.recipient_favorited
    })
    .then(res => {
      if (effectCheck) {updateCheck(false)}
      else updateCheck(true)
    })
  }

  async function createTask(data) {
    await axios.get(`http://localhost:8082/users/${managerid}`)
    .then(async (res) => {
      await axios.post('http://localhost:8082/PTORequests/', {
        "type": "PTORequest",
        "status": "pending",
        "recipient": res.data.first_name + ' ' + res.data.last_name,
        "recipient_id": managerid,
        "due_date": "2022-04-25",
        "sender": firstName + ' ' + lastName,
        "sender_id": id,
        "recipient_comments": null,
        "sender_comments": data.sender_comments,
        "pto_type": data.pto_type,
        "pto_start": data.pto_start,
        "pto_end": data.pto_end,
        "sender_favorited": false,
        "recipient_favorited": false
      })
      .then(res => {
        if (effectCheck) {updateCheck(false)}
        else updateCheck(true)
      })
    })
  }


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
      <NavBar title="PTO Request" showBox={showBox} filterData={filterData}/> 
      <div className="d-flex overflow-hidden">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={PTORequestData} type='PTORequest' reelItems={reelItems} expanded={expanded} userType={userType} user_name={firstName + ' ' + lastName} containerCount='1' boxState={boxState} closeBox={closeBox} updateTask={updateTask} createTask={createTask}/>
      </div>
    </div>
  )
}

export default PTORequestPage;