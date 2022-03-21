import { Link } from "react-router-dom";
import Incoming from '../parts/incoming';
import '../../styles/partContainer.css'

const AssignTraining = (props) => {
  if (props.expanded) {
    return (
      <div className="part-container-expanded bg-secondary d-flex flex-column">
        <Incoming reelItems={props.reelItems} expanded="true"/>
      </div>
    )
  }
  return(
    <div className="part-container bg-secondary d-flex flex-column">
        <Incoming reelItems={props.reelItems} expanded="true"/>
    </div>
  )
}

export default AssignTraining;