import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import PartContainer_landingPage from "../parts/partContainer_landingPage";
import '../../styles/landingPage.css'

const LandingPage = (props) => {
const [expanded, updateState] = useState(true);
const reelItems = ['Favorited', 'Coming Up']

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
      <div className="d-flex">
      <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
      <PartContainer_landingPage reelItems={reelItems} expanded={expanded}/>
      </div>
    </div>
  )
}

export default LandingPage;