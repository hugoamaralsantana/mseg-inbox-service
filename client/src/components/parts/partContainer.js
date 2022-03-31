import { Link } from "react-router-dom";
import Incoming from '../parts/incoming';
import Outgoing from '../parts/outgoing';
import '../../styles/partContainer.css'

const PartContainer = (props) => {//check if page has 1 or two containers
  const expandedCSS = props.expanded ? "part-container-expanded bg-secondary d-flex flex-column" : "part-container bg-secondary d-flex flex-column"
  let singleView
  if (props.type === 'PTORequest') {
    singleView = props.user === 'employee' || props.user === 'admin' ? <Outgoing type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/> :
                                                        <Incoming type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/>
  }else {
    singleView = props.user === 'admin' ? <Outgoing type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/> :
                                          <Incoming type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/>
  }
  if (props.containerCount !== '1') {
      return (
        <div className={expandedCSS}>
          <Incoming type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/>
          <Outgoing type={props.type} reelItems={props.reelItems} user={props.user} containerCount={props.containerCount}/>
        </div>
      )
  } else {
      return (
        <div className={expandedCSS}>
          {singleView}
        </div>
      )
  }
}


export default PartContainer;