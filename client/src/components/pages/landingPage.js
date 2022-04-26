import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import '../../styles/landingPage.css'
import PartContainer from "../parts/partContainer"
import mockData from "../../mockData.js";

const favorited_data = mockData.data.favorited;
const user_type = mockData.user_type;
const user_name = mockData.user_name



const LandingPage = (props) => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const firstName = userData.first_name
  const lastName = userData.last_name
  const id = userData._id
  const userType = userData.user_type
  const [landingpageData, setLandingPageData] = useState({});
  const [expanded, updateState] = useState(true);
  const reelItems = ['Favorited', 'Coming up']
  const user = user_type;
  const [boxState, updateBoxState] = useState(false);

  function expandSideBar() {
    if (expanded) {
      updateState(false);
    }
    else {
        updateState(true);
    }
  }

  useEffect(() => {
    console.log('cheese')
    async function update() {
      const data = {'favorited': [], 'comingUp': []}
      let allData = []
      await axios.get(`http://localhost:8082/assignedTrainings/userData/${id}`)
      .then(res => {
        const incoming = res.data.incoming
        const outgoing = res.data.outgoing
        allData = allData.concat(incoming)
        allData = allData.concat(outgoing)
      })
      await axios.get(`http://localhost:8082/performanceReviews/userData/${id}`)
      .then(res => {
        const incoming = res.data.incoming
        const outgoing = res.data.outgoing
        allData = allData.concat(incoming)
        allData = allData.concat(outgoing)
      })
      await axios.get(`http://localhost:8082/PTORequests/userData/${id}`)
      .then(res => {
        const incoming = res.data.incoming
        const outgoing = res.data.outgoing
        allData = allData.concat(incoming)
        allData = allData.concat(outgoing)
      })
      console.log(allData)
      allData.forEach(task => {
        if (task.sender_id === id && task.sender_favorited) {data.favorited.push(task)}
        else if (task.recipient_id === id && task.recipient_favorited) {data.favorited.push(task)}
        const one_day=1000*60*60*24;
        const serverDateTime= moment();
        const newDate = new Date(task.due_date);
        //Calculate difference btw the two dates, and convert to days
        console.log((newDate - serverDateTime)/one_day)
        const diff = Math.ceil((newDate - serverDateTime)/one_day);
        if(diff <= 7 && task.status !== 'completed') {data.comingUp.push(task)}  
      })
      console.log(data)
      setLandingPageData(data)
    }
    update()
  }, [id])

  function showBox() {
    updateBoxState(true);
}
  
function closeBox() {
    updateBoxState(false);
}

  return (
    <div>
      <NavBar title="Landing Page" showBox={showBox}/>
      <div className="d-inline-flex overflow-hidden">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={landingpageData} type='landingPage' reelItems={reelItems} expanded={expanded} userType={userType} user_name={firstName + ' ' + lastName} containerCount='1' boxState={boxState} closeBox={closeBox}/>
      </div>
    </div>
  )
}

export default LandingPage;