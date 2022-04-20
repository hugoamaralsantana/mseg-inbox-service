import { Link } from "react-router-dom";
import Incoming from '../parts/incoming';
import Outgoing from '../parts/outgoing';
import '../../styles/partContainer.css'
import ProfileButtonBox from "./profile-button-box";

const PartContainer = (props) => {//check if page has 1 or two containers
  const expandedCSS = props.expanded ? "part-container-expanded bg-secondary d-inline-flex flex-column" : "part-container bg-secondary d-flex flex-column"
  const parentCSS = props.expanded ? "parent-expanded": "parent"
  const IncomingJSX = () => <Incoming data={props.data.incoming} type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/>;
  const OutgoingJSX = () => <Outgoing data={props.data.outgoing} type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/>;
  if (props.type === 'performanceReview') {
    return (
      <div className={parentCSS}>
        <ProfileButtonBox expanded={props.expanded} user_name={props.user_name} boxState={props.boxState} closeBox={props.closeBox}/>
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
        <ProfileButtonBox expanded={props.expanded} user_name={props.user_name} boxState={props.boxState} closeBox={props.closeBox}/>
        <div className={expandedCSS}>

          {props.user === 'employee' 
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
        <ProfileButtonBox expanded={props.expanded} user_name={props.user_name} boxState={props.boxState} closeBox={props.closeBox}/>
        <div className={expandedCSS}>
          {props.user === 'employee' || props.user === 'manager' 
          ?
          IncomingJSX()
          :
          OutgoingJSX()}
        </div>
        </div>
      )
  }
  
}


export default PartContainer;