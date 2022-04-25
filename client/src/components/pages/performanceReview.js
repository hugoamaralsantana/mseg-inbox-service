import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import PartContainer from "../parts/partContainer"
import moment from 'moment';

console.log(JSON.parse(localStorage.getItem('userData')))

const PerformanceReview = (props) => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const firstName = userData.first_name
  const lastName = userData.last_name
  const id = userData._id
  const userType = userData.user_type
  const [expanded, updateState] = useState(true);
  // const [modalState, updateModalState] = useState(false);
  const [performanceReviewData, setPerformanceReviewData] = useState({});
  const reelItems = ['Pending', 'In Progress', 'Completed']
  //problem is that theres just one modal for this page, we need each task to have its own
  const [boxState, updateBoxState] = useState(false);
  const [effectCheck, updateCheck] = useState(false)
  const isMounted = useRef(false);

  useEffect(() => {
    async function update() {
    await axios.get(`http://localhost:8082/performanceReviews/userData/${id}`)
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
        setPerformanceReviewData(returnData)
      })
      .catch(err => console.log(err))
  }
    update()
  }, [effectCheck, id])

  async function updateTask(status, task, data) {
    await axios.put(`http://localhost:8082/performanceReviews/${task._id}`, {
        "type": task.type,
        "status": status === 'closed' ? 'inProgress' : status === 'submit' ? 'completed' : 'pending',
        "recipient": task.recipient,
        "recipient_id": task.recipient_id,
        "due_date": task.due_date,
        "sender": task.sender,
        "sender_id": task.sender_id,
        "overall_comments": data.overall_comments,
        "recipient_comments": task.recipient_comments,
        "sender_comments": task.sender_comments,
        "growth_score": data.growth_score,
        "growth_comments": data.growth_comments,
        "kindness_score": data.kindness_score,
        "kindness_comments": data.kindness_comments,
        "delivery_score": data.delivery_score,
        "delivery_comments": data.delivery_comments,
        "sender_favorited": task.sender_favorited,
        "recipient_favorited": task.recipient_favorited
    })
    .then(res => {
      console.log(isMounted)
      if (effectCheck) {updateCheck(false)}
      else updateCheck(true)
    })
  }

  async function createTask(data) {
    console.log(data)
    await axios.post('http://localhost:8082/performanceReviews/', {
        "type": 'performanceReview',
        "status": 'pending',
        "recipient": data.recipient,
        "recipient_id": data.recipient_id,
        "due_date": moment().add(14, 'days').format('YYYY-MM-DD'),
        "sender": firstName + ' ' + lastName,
        "sender_id": id,
        "overall_comments": null,
        "recipient_comments": null,
        "sender_comments": null,
        "growth_score": null,
        "growth_comments": null,
        "kindness_score": null,
        "kindness_comments": null,
        "delivery_score": null,
        "delivery_comments": null,
        "sender_favorited": false,
        "recipient_favorited": false
    })
    .then(res => {
      if (effectCheck) {updateCheck(false)}
      else updateCheck(true)
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
      {/* TODO: when I change title = Performance Review, it gets rid of some 
      of the navbar (styling issue) */}
      <NavBar title="Performance Review" showBox={showBox}/> 
      <div className="d-inline-flex overflow-hidden">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={performanceReviewData} type='performanceReview' reelItems={reelItems} expanded={expanded} userType={userType} user_name={firstName + ' ' + lastName} containerCount='2' boxState={boxState} closeBox={closeBox} updateTask={updateTask} createTask={createTask}/>
      </div>
    </div>
  )
}

export default PerformanceReview;