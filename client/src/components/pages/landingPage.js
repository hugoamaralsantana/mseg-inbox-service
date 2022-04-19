import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import '../../styles/landingPage.css'
import PartContainer from "../parts/partContainer"
import mockData from "../../mockData.js";

const favorited_data = mockData.data.favorited;
const user_type = mockData.user_type;
const user_name = mockData.user_name

const data = {'favorited': favorited_data, 'comingUp': []}

const LandingPage = () => {
  const [expanded, updateState] = useState(true);
  const reelItems = ['Favorited', 'Coming up']
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
      <NavBar title="Landing Page" />
      <div className="d-inline-flex overflow-hidden">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={data} type='landingPage' reelItems={reelItems} expanded={expanded} user={user} user_name={user_name} containerCount='1'/>
      </div>
    </div>
  )
}

export default LandingPage;