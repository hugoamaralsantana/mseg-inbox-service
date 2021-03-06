import React, { useState } from "react";
import Incoming from '../parts/incoming';
import Outgoing from '../parts/outgoing';
import '../../styles/partContainer.css'
import ProfileButtonBox from "./profile-button-box";
import GeneralModalSelect from "./generalModalSelect";
import GeneralTasks from "./generalTasks";
import ProfileColumn from "./profile_column";

const PartContainer = (props) => {//check if page has 1 or two containers
  const expandedCSS = props.expanded ? "part-container-expanded bg-secondary d-inline-flex flex-column" : "part-container bg-secondary d-inline-flex flex-column"
  const parentCSS = props.expanded ? "parent-expanded": "parent"
  const [profileColumnState, updateProfileColumnState] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'))
  const email = userData.email

  function showProfileColumn() {
    console.log('ligma')
    updateProfileColumnState(true);
  }

  function closeProfileColumn() {
    updateProfileColumnState(false);
  }

  const IncomingJSX = () => <Incoming data={props.data.incoming} type={props.type} reelItems={props.reelItems} userType={props.userType} containerCount={props.containerCount} updateTask={props.updateTask}/>;
  const OutgoingJSX = () => <Outgoing data={props.data.outgoing} type={props.type} reelItems={props.reelItems} userType={props.userType} containerCount={props.containerCount} createTask={props.createTask}/>;
  if (props.type === 'performanceReview') {
    return (
      <div className={parentCSS}>
        <ProfileButtonBox expanded={props.expanded} user_name={props.user_name} boxState={props.boxState} closeBox={props.closeBox} showProfileColumn={showProfileColumn}/>
        <ProfileColumn expanded={props.expanded} user_name={props.user_name} user_email={email} profileColumnState={profileColumnState} closeBox={closeProfileColumn}/>
        <div className={expandedCSS}>
          {IncomingJSX()}
          {OutgoingJSX()}
        </div>
      </div>
    )
  }
  else if (props.type === 'PTORequest') {
    return (
      <div className={parentCSS}>
        <ProfileButtonBox expanded={props.expanded} user_name={props.user_name} boxState={props.boxState} closeBox={props.closeBox} showProfileColumn={showProfileColumn}/>
        <ProfileColumn expanded={props.expanded} user_name={props.user_name} user_email={email} profileColumnState={profileColumnState} closeBox={closeProfileColumn}/>
        <div className={expandedCSS}>

          {props.userType === 'Employee' 
            ?
            OutgoingJSX()
            :
            IncomingJSX()
          }
        </div>
      </div>
    )
  } 
  else if (props.type === 'assignedTraining') {
    return (
      <div className={parentCSS}>
        <ProfileButtonBox expanded={props.expanded} user_name={props.user_name} boxState={props.boxState} closeBox={props.closeBox} showProfileColumn={showProfileColumn}/>
        <ProfileColumn expanded={props.expanded} user_name={props.user_name} user_email={email} profileColumnState={profileColumnState} closeBox={closeProfileColumn}/>
        <div className={expandedCSS}>
          {props.userType === 'Employee' || props.userType === 'Manager' 
          ?
          IncomingJSX()
          :
          OutgoingJSX()}
        </div>
        </div>
      )
  }
  else if (props.type === 'landingPage') {
    return(
      <div className={parentCSS}>
        <ProfileButtonBox expanded={props.expanded} user_name={props.user_name} boxState={props.boxState} closeBox={props.closeBox} showProfileColumn={showProfileColumn}/>
        <ProfileColumn expanded={props.expanded} user_name={props.user_name} user_email={email} profileColumnState={profileColumnState} closeBox={closeProfileColumn}/>
        <div className={expandedCSS}>
          {/* <GeneralModalSelect /> */}
          <GeneralTasks data={props.data} type={props.type} reelItems={props.reelItems} userType={props.userType} containerCount={props.containerCount}/>
        </div>
      </div>
    )
  }
  
}


export default PartContainer;