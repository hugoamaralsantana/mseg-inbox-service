import { Link } from "react-router-dom";
import TaskBox from "../parts/taskBox"
import '../../styles/taskReel.css'

// TODO: fetch data from API using props.endpoint later on

const TaskReel = (props) => {
  return (
    <div className="task-reel ml-3 mr-3 mb-1 text-white bg-darkest">
        <h3>{props.name}</h3>
        <TaskBox></TaskBox>
    </div>
  )
}

export default TaskReel;