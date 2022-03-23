import { Link } from "react-router-dom";
import TaskBox from "../parts/taskBox"
import '../../styles/taskReel.css'

// TODO: fetch data from API using props.endpoint later on

const TaskReel = (props) => {
  let color;
  let action;
  if (props.name === 'Pending') {
    color = 'title gray';
    action = 'Start';
  }
  else if (props.name === 'In Progress') {
    color = 'title yellow';
    action = 'Continue';
  }
  else if (props.name === 'Completed') {
    color = 'title green';
    action = 'Review';
  }
  return (
    <div className="task-reel ml-3 mr-3 mb-1 text-white bg-darkest">
      <div className={color}>
        <h4 className="text-primary pl-2">{props.name}</h4>
      </div>
      <div className="task-box-container">
        <TaskBox source={props.source} pageType={props.type} showModal={props.showModal} closeModal={props.closeModal} action={action}/>
        <TaskBox source={props.source} pageType={props.type} showModal={props.showModal} closeModal={props.closeModal} action={action}/>
        <TaskBox source={props.source} pageType={props.type} showModal={props.showModal} closeModal={props.closeModal} action={action}/>
        <TaskBox source={props.source} pageType={props.type} showModal={props.showModal} closeModal={props.closeModal} action={action}/>
        <TaskBox source={props.source} pageType={props.type} showModal={props.showModal} closeModal={props.closeModal} action={action}/>
        <TaskBox source={props.source} pageType={props.type} showModal={props.showModal} closeModal={props.closeModal} action={action}/>
      </div>
    </div>
  )
}

export default TaskReel;