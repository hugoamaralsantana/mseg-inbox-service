import { Link } from "react-router-dom";
import Incoming from '../parts/incoming';
import Outgoing from '../parts/outgoing';
import '../../styles/partContainer.css'

const PartContainer = (props) => {//check if page has 1 or two containers
  const expandedCSS = props.expanded ? "part-container-expanded bg-secondary d-inline-flex flex-column" : "part-container bg-secondary d-flex flex-column"
  const IncomingJSX = () => <Incoming data={props.data.incoming} type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/>;
  const OutgoingJSX = () => <Outgoing data={props.data.outgoing} type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/>;
  if (props.type === 'performanceReview') {
    return <div className={expandedCSS}>
      {IncomingJSX()}
      {OutgoingJSX()}
    </div>
  }
  else if (props.type === 'PTORequest') {
    return <div className={expandedCSS}>
        {props.user === 'employee' 
          ?
          OutgoingJSX()
          :
          IncomingJSX()
        }
      </div>
  } 
  else if (props.type === 'assignedTraining') {
    return <div className={expandedCSS}>
      {props.user === 'employee' || props.user === 'manager' 
      ?
      IncomingJSX()
      :
      OutgoingJSX()}
    </div>
  }
  
}


export default PartContainer;