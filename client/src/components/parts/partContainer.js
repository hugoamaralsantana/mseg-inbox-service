import { Link } from "react-router-dom";
import Incoming from '../parts/incoming';
import Outgoing from '../parts/outgoing';
import '../../styles/partContainer.css'

const PartContainer = (props) => {//check if page has 1 or two containers
  if (props.containerCount !== '1') {
    if (props.expanded) {
      return (
        <div className="part-container-expanded bg-secondary d-flex flex-column">
          <Incoming type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/>
          <Outgoing type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/>
        </div>
      )
    }
    return(
      <div className="part-container bg-secondary d-flex flex-column">
          <Incoming type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/>
          <Outgoing type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/>
      </div>
    )
  } else {
    if (props.expanded) {
      return (
        <div className="part-container-expanded bg-secondary d-flex flex-column">
          <Outgoing type={props.type} reelItems={props.reelItems} containerCount={props.containerCount} user={props.user}/>
        </div>
      )
    }
    return(
      <div className="part-container bg-secondary d-flex flex-column">
          <Outgoing type={props.type} reelItems={props.reelItems} containerCount={props.containerCount} user={props.user}/>
      </div>
    )
  }
}


export default PartContainer;