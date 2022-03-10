import { Link } from "react-router-dom";
import TaskBox from "../parts/taskBox"

// TODO: fetch data from API using props.endpoint later on

const TaskReel = (props) => {
  return (
    <div className="task-reel m-4 text-white bg-darkest">
        <h3>{props.name}</h3>
        <TaskBox></TaskBox>
    </div>
  )
}

export default TaskReel;