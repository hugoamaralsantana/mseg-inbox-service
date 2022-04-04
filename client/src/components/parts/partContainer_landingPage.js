import { Link } from "react-router-dom";
import Outgoing from '../parts/myTasks';
import '../../styles/partContainer_landingPage.css'
import Incoming from '../parts/createATask';
import myTasks from "../parts/myTasks";

const partContainer_landingPage = (props) => {
  if (props.expanded) {
    return (
      <div className="part-containerlp-expanded bg-secondary d-flex flex-column">
       <Incoming reelItems={props.reelItems}/> {/*doesn't work if I put <createATask reelItems={props.reelItems} probably need to change reelItems to reelItems2 or smth/> */}
       <Outgoing reelItems={props.reelItems}/> {/*doesn't work if I put <myTasks reelItems={props.reelItems} probably need to change reelItems to reelItems2 or smth/> */}
      </div>
    )
  }
  return(
    <div className="part-containerlp bg-secondary d-flex flex-column">
        <Incoming reelItems={props.reelItems}/> {/*doesn't work if I put <createATask reelItems={props.reelItems} probably need to change reelItems to reelItems2 or smth/> */}
        <Outgoing reelItems={props.reelItems}/> {/*doesn't work if I put <myTasks reelItems={props.reelItems}/> */}
    </div>
  )
}


export default partContainer_landingPage;