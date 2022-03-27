import { Link } from "react-router-dom";
import Incoming from '../parts/incoming';
import Outgoing from '../parts/outgoing';
import '../../styles/partContainer.css'

const PartContainer = (props) => {
  if (props.expanded) {
    return (
      <div className="part-container-expanded bg-secondary d-flex flex-column">
        <Incoming type={props.type} showModal={props.showModal} closeModal={props.closeModal} reelItems={props.reelItems} user={props.user}/>
        <Outgoing reelItems={props.reelItems} user={props.user}/>
      </div>
    )
  }
  return(
    <div className="part-container bg-secondary d-flex flex-column">
        <Incoming type={props.type} showModal={props.showModal} closeModal={props.closeModal} reelItems={props.reelItems} user={props.user}/>
        <Outgoing type={props.type} reelItems={props.reelItems} user={props.user}/>
    </div>
  )
}

export default PartContainer;