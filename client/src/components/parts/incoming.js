import { Link } from "react-router-dom";
import TaskReel from "../parts/taskReel";
import '../../styles/incoming.css'

const pendingTaskReelURL = 'performanceReview/incoming/pending';
const inProgressTaskReelURL = 'performanceReview/incoming/inProgress';
const completedTaskReelURL = 'performanceReview/incoming/completed';



const Incoming = (props) => {
  const pending = props.data !== undefined ? props.data.filter(task => task.status === 'pending') : []
  const inProgress = props.data !== undefined ? props.data.filter(task => task.status === 'inProgress') : []
  const completed = props.data !== undefined ? props.data.filter(task => task.status === 'completed') : []
  const incomingCSS = props.containerCount === '1' ? "incoming-expanded d-flex bg-dark ml-3 mr-3 mb-2 flex-column justify-content-around" : "incoming d-flex bg-dark ml-3 mr-3 mb-2 flex-column justify-content-around"
    return (
        <div className={incomingCSS}>
          <div>
          <h1 className="box-title text-white pb-1">Incoming</h1>
          </div>
          {/* these endpoints are passed to components where we will fetch data from the API later on*/}
          <div className='task-reel-container bg-dark mb-2'>
              <TaskReel source='incoming' data={pending} type={props.type} reelTitle={props.reelItems[0]} userType={props.userType} endpoint={pendingTaskReelURL} updateTask={props.updateTask}/>
              <TaskReel source='incoming' data={inProgress} type={props.type} reelTitle={props.reelItems[1]} userType={props.userType} endpoint={inProgressTaskReelURL} updateTask={props.updateTask}/>
              <TaskReel source='incoming' data={completed} type={props.type} reelTitle={props.reelItems[2]} userType={props.userType} endpoint={completedTaskReelURL} updateTask={props.updateTask}/>
          </div>
        </div>
    )
}

export default Incoming;