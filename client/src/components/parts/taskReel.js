import { Link } from "react-router-dom";
import TaskBox from "../parts/taskBox"

// TODO: fetch data from API using props.endpoint later on

const TaskReel = (props) => {
  return (
    <div>
        <h3>{props.name}</h3>
        <TaskBox></TaskBox>
    </div>
  )
}

export default TaskReel;