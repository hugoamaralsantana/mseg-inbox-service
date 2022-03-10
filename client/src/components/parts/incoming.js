import { Link } from "react-router-dom";
import TaskReel from "../parts/taskReel";

const pendingTaskReelURL = 'performanceReview/incoming/pending';
const inProgressTaskReelURL = 'performanceReview/incoming/inProgress';
const completedTaskReelURL = 'performanceReview/incoming/completed';

const Incoming = () => {
  return (
    <div>
      {/* these endpoints are passed to components where we will fetch data from the API later on*/}
      <TaskReel name='Pending' endpoint={pendingTaskReelURL}></TaskReel>
      <TaskReel name='In Progress' endpoint={inProgressTaskReelURL}></TaskReel>
      <TaskReel name='Completed' endpoint={completedTaskReelURL}></TaskReel>
    </div>
  )
}

export default Incoming;