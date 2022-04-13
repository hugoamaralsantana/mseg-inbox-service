import { Link } from "react-router-dom";
import TaskReel from "../parts/taskReel";
import '../../styles/incoming.css'

const pendingTaskReelURL = 'performanceReview/incoming/pending';
const inProgressTaskReelURL = 'performanceReview/incoming/inProgress';
const completedTaskReelURL = 'performanceReview/incoming/completed';



const Incoming = (props) => {
  console.log(props.data.pending)
  const incomingCSS = props.containerCount === '1' ? "incoming-expanded d-flex bg-dark ml-3 mr-3 mb-2 flex-column justify-content-around" : "incoming d-flex bg-dark ml-3 mr-3 mb-2 flex-column justify-content-around"
    return (
        <div className={incomingCSS}>
          <div>
          <h1 className="box-title text-white pb-1">Incoming</h1>
          </div>
          {/* these endpoints are passed to components where we will fetch data from the API later on*/}
          <div className='task-reel-container bg-dark mb-2'>
              <TaskReel source='incoming' data={props.data.pending} type={props.type} reelTitle={props.reelItems[0]} user={props.user} endpoint={pendingTaskReelURL} />
              <TaskReel source='incoming' data={props.data.inProgress} type={props.type} reelTitle={props.reelItems[1]} user={props.user} endpoint={inProgressTaskReelURL} />
              <TaskReel source='incoming' data={props.data.completed} type={props.type} reelTitle={props.reelItems[2]} user={props.user} endpoint={completedTaskReelURL} />
          </div>
        </div>
    )
}

export default Incoming;