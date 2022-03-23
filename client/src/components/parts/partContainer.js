import { Link } from "react-router-dom";
import Incoming from '../parts/incoming';
import Outgoing from '../parts/outgoing';
import '../../styles/partContainer.css'

const PartContainer = (props) => {
  if (props.expanded) {
    return (
      <div className="part-container-expanded bg-secondary d-flex flex-column">
        <Incoming type={props.type} showModal={props.showModal} closeModal={props.closeModal} reelItems={props.reelItems}/>
        <Outgoing reelItems={props.reelItems}/>
      </div>
    )
  }
  return(
    <div className="part-container bg-secondary d-flex flex-column">
        <Incoming type={props.type} showModal={props.showModal} closeModal={props.closeModal} reelItems={props.reelItems}/>
        <Outgoing reelItems={props.reelItems}/>
    </div>
  )
}

export default PartContainer;