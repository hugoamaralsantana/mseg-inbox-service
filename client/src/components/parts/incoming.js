import { Link } from "react-router-dom";
import TaskReel from "../parts/taskReel";
import '../../styles/incoming.css'

const pendingTaskReelURL = 'performanceReview/incoming/pending';
const inProgressTaskReelURL = 'performanceReview/incoming/inProgress';
const completedTaskReelURL = 'performanceReview/incoming/completed';



const Incoming = (props) => {
  const incomingCSS = props.containerCount === '1' ? "incoming-expanded d-flex bg-dark ml-3 mr-3 mb-2 mt-2 flex-column justify-content-center" : "incoming d-flex bg-dark ml-3 mr-3 mb-2 mt-2 flex-column justify-content-center"
    return (
        <div className={incomingCSS}>
          <h1 className="text-white ml-5 pt-1">Incoming</h1>
          {/* these endpoints are passed to components where we will fetch data from the API later on*/}
          <div className='task-reel-container d-flex bg-dark m-2 align-items-end justify-content-center h-95'>
              <TaskReel source='incoming' data={props.data.pending} type={props.type} showModal={props.showModal} closeModal={props.closeModal} reelTitle={props.reelItems[0]} endpoint={pendingTaskReelURL} />
              <TaskReel source='incoming' data={props.data.inProgress} type={props.type} showModal={props.showModal} closeModal={props.closeModal} reelTitle={props.reelItems[1]} endpoint={inProgressTaskReelURL} />
              <TaskReel source='incoming' data={props.data.completed} type={props.type} showModal={props.showModal} closeModal={props.closeModal} reelTitle={props.reelItems[2]} endpoint={completedTaskReelURL} />
          </div>
        </div>
    )
}

export default Incoming;