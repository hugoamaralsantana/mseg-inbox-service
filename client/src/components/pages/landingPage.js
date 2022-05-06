import React, { useEffect, useState, useRef } from "react";
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
  const [changingData, updateChangeingData] = useState({})
  const sideBarLocalStorage = window.localStorage.getItem('sidebar-expanded') === 'true' ? true : false;
  const [expanded, updateState] = useState(sideBarLocalStorage);
  const reelItems = ['Favorited', 'Coming up']
  const user = user_type;
  const [boxState, updateBoxState] = useState(false);
  const [effectCheck, updateCheck] = useState(false)
  const check = useRef(false)

  function expandSideBar() {
    if (expanded) {
      updateState(false);
    }
    else {
        updateState(true);
    }
  }

  useEffect(() => {
    async function update() {
      const data = {'favorited': [], 'comingUp': []}
      let allData = []
      if (userType !== 'Admin') {
        await axios.get(`http://localhost:8082/assignedTrainings/userData/${id}`)
        .then(res => {
          const incoming = res.data.incoming
          const outgoing = res.data.outgoing
          allData = allData.concat(incoming)
          allData = allData.concat(outgoing)
        })
      }
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
      allData.sort((a, b) => (a.due_date > b.due_date) ? 1: -1)
      allData.forEach(task => {
        if (task.status === 'completed') {return}
        if (task.sender_id === id && task.sender_favorited) {data.favorited.push(task)}
        else if (task.recipient_id === id && task.recipient_favorited) {data.favorited.push(task)}
        data.comingUp.push(task)
        // const one_day=1000*60*60*24;
        // const serverDateTime= moment();
        // const newDate = new Date(task.due_date);
        // //Calculate difference btw the two dates, and convert to days
        // const diff = Math.ceil((newDate - serverDateTime)/one_day);
        // if(diff <= 7 && task.status !== 'completed') {data.comingUp.push(task)}  
      })
      setLandingPageData(data)
      if (!check.current) {
        updateChangeingData(data)
        check.current = true
      }
    }
    update()
  }, [effectCheck, id])

  async function filterData(filter) {
    let returnData = {'favorited': [], 'comingUp': []}
    const favorited = changingData.favorited
    const comingUp = changingData.comingUp
    favorited.forEach(task => {
      if (task.recipient_id === id && task.sender.toLowerCase().startsWith(filter.toLowerCase())) {
        returnData.favorited.push(task)
      }
      else if (task.sender_id === id && task.recipient.toLowerCase().startsWith(filter.toLowerCase())) {
        returnData.favorited.push(task)
      }
    })
    comingUp.forEach(task => {
      if (task.sender_id === id && task.recipient.toLowerCase().startsWith(filter.toLowerCase())) {
        returnData.comingUp.push(task)
      }
      else if (task.recipient_id === id && task.sender.toLowerCase().startsWith(filter.toLowerCase())) {
        returnData.comingUp.push(task)
      }
    })
    setLandingPageData(returnData)
  }

  function expandSideBar() {
    const sideBar = window.localStorage.getItem('sidebar-expanded') === 'true' ? 'false' : 'true';
    window.localStorage.setItem('sidebar-expanded', sideBar)
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
      <NavBar title="Landing Page" showBox={showBox} filterData={filterData}/>
      <div className="d-inline-flex overflow-hidden">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={landingpageData} type='landingPage' reelItems={reelItems} expanded={expanded} userType={userType} user_name={firstName + ' ' + lastName} containerCount='1' boxState={boxState} closeBox={closeBox}/>
      </div>
    </div>
  )
}

export default LandingPage;