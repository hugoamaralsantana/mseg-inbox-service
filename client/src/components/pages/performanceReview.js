import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import PartContainer from "../parts/partContainer"
import mockData from "../../mockData.js";

const performance_review_data = mockData.data.performanceReviewPage;
const user_type = mockData.user_type;
const user_name = mockData.user_name

const PerformanceReview = (props) => {
  const [expanded, updateState] = useState(true);
  // const [modalState, updateModalState] = useState(false);
  const [performanceReviewData, setPerformanceReviewData] = useState({});
  const reelItems = ['Pending', 'In Progress', 'Completed']
  //problem is that theres just one modal for this page, we need each task to have its own
  const [boxState, updateBoxState] = useState(false);

  useEffect(() => {
    async function update() {
    await axios.get('http://localhost:8082/performanceReviews/userData/625f267aa6aeb39ee40b7aa8')
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

  const user = user_type;


  return (
    <div>
      {/* TODO: when I change title = Performance Review, it gets rid of some 
      of the navbar (styling issue) */}
      <NavBar title="Performance Review" showBox={showBox}/> 
      <div className="d-inline-flex overflow-hidden">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={performanceReviewData} type='performanceReview' reelItems={reelItems} expanded={expanded} user={user} user_name={user_name} containerCount='2' boxState={boxState} closeBox={closeBox}/>
      </div>
    </div>
  )
}

export default PerformanceReview;