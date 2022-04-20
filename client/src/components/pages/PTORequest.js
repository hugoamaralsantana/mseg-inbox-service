import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import PartContainer from "../parts/partContainer"
import mockData from "../../mockData.js";

const pto_request_data = mockData.data.PTORequestPage;
const user_type = mockData.user_type;
const user_name = mockData.user_name

const PTORequestPage = (props) => {
  const [expanded, updateState] = useState(true);
  const reelItems = ['Pending', 'In Progress', 'Completed']
  const user = user_type;
  const [PTORequestData, setPTORequestData] = useState({});
  const [boxState, updateBoxState] = useState(false);

  useEffect(() => {
    async function update() {
    await axios.get('http://localhost:8082/PTORequests/userData/625f267aa6aeb39ee40b7aa8')
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
        setPTORequestData(returnData)
      })
      .catch(err => console.log(err))
  }
    update()
  }, [])


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
        <PartContainer data={PTORequestData} type='PTORequest' reelItems={reelItems} expanded={expanded} user={user} user_name={user_name} containerCount='1' boxState={boxState} closeBox={closeBox}/>
      </div>
    </div>
  )
}

export default PTORequestPage;