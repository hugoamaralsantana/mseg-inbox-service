import { Link } from "react-router-dom";
import TaskReel from "../parts/taskReel";
import '../../styles/incoming.css'

const pendingTaskReelURL = 'performanceReview/incoming/pending';
const inProgressTaskReelURL = 'performanceReview/incoming/inProgress';
const completedTaskReelURL = 'performanceReview/incoming/completed';

const Incoming = (props) => {
  if(props.expanded === "true"){
    return (
        <div className="incoming-expanded d-flex bg-dark ml-3 mr-3 mb-2 mt-2 flex-column justify-content-center">
          <h1 className="text-white ml-5 pt-1">Incoming</h1>
          {/* these endpoints are passed to components where we will fetch data from the API later on*/}
          <div className='task-reel-container d-flex bg-dark m-2 align-items-end justify-content-center h-95'>
              <TaskReel name={props.reelItems[0]} endpoint={pendingTaskReelURL} />
              <TaskReel name={props.reelItems[1]} endpoint={inProgressTaskReelURL} />
              <TaskReel name={props.reelItems[2]} endpoint={completedTaskReelURL} />
          </div>
        </div>
    )
  }
  else{
    return (
      <div className="incoming d-flex bg-dark ml-3 mr-3 mb-2 mt-2 flex-column justify-content-center">
        <h1 className="text-white ml-5 pt-1">Incoming</h1>
        {/* these endpoints are passed to components where we will fetch data from the API later on*/}
        <div className='task-reel-container d-flex bg-dark m-2 align-items-end justify-content-center h-95'>
            <TaskReel name={props.reelItems[0]} endpoint={pendingTaskReelURL} />
            <TaskReel name={props.reelItems[1]} endpoint={inProgressTaskReelURL} />
            <TaskReel name={props.reelItems[2]} endpoint={completedTaskReelURL} />
        </div>
      </div>
    )
  }

}

export default Incoming;