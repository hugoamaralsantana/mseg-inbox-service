import { Link } from "react-router-dom";
import TaskBox from "../parts/taskBox"
import '../../styles/taskReel.css'

// TODO: fetch data from API using props.endpoint later on

const TaskReel = (props) => {
  let color;
  if (props.name === 'Pending') {color = 'title gray'}
  else if (props.name === 'In Progress') {color = 'title yellow'}
  else if (props.name === 'Completed') {color = 'title green'}
  else if (props.name === 'My Day') {color = 'title green'}
  else if (props.name === 'Favorited') {color = 'title green'}
  else if (props.name === 'Coming Up') {color = 'title green'}
  return (
    <div className="task-reel ml-3 mr-3 mb-1 text-white bg-darkest">
      <div className={color}>
        <h4 className="text-primary pl-2">{props.name}</h4>
      </div>
      <div className="task-box-container">
        <TaskBox />
        <TaskBox />
        <TaskBox />
        <TaskBox />
        <TaskBox />
        <TaskBox />
      </div>
    </div>
  )
}

export default TaskReel;