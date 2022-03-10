import { Link } from "react-router-dom";
import Incoming from '../parts/incoming';
import Outgoing from '../parts/outgoing';

const PartContainer = () => {
  return (
    <div>
      <Incoming></Incoming>
      <Outgoing></Outgoing>
    </div>
  )
}

export default PartContainer;