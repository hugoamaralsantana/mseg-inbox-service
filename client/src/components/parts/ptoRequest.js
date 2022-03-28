import { Link } from "react-router-dom";
import Outgoing from '../parts/outgoing';
import '../../styles/partContainer.css'

const PTORequest = (props) => {
  if (props.expanded) {
    return (
      <div className="part-container-expanded bg-secondary d-flex flex-column">
        <Outgoing reelItems={props.reelItems} expanded="true"/>
      </div>
    )
  }
  return(
    <div className="part-container bg-secondary d-flex flex-column">
        <Outgoing reelItems={props.reelItems} expanded="true"/>
    </div>
  )
}

export default PTORequest;