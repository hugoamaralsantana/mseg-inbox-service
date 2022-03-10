import { Link } from "react-router-dom";
import TaskReel from "../parts/taskReel";

const pendingTaskReelURL = 'performanceReview/incoming/pending';
const inProgressTaskReelURL = 'performanceReview/incoming/inProgress';
const completedTaskReelURL = 'performanceReview/incoming/completed';

const Incoming = (props) => {
  return (
    <div className="incoming d-flex bg-dark m-2">
      {/* these endpoints are passed to components where we will fetch data from the API later on*/}
      <TaskReel name={props.reelItems[0]} endpoint={pendingTaskReelURL} />
      <TaskReel name={props.reelItems[1]} endpoint={inProgressTaskReelURL} />
      <TaskReel name={props.reelItems[2]} endpoint={completedTaskReelURL} />
    </div>
  )
}

export default Incoming;