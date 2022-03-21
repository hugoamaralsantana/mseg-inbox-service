import { Link } from "react-router-dom";
import '../../styles/taskbox.css'

const TaskBox = (props) => {
  return (
    <div className="task-box bg-secondary d-flex justify-content-between m-2">
        <div className="left-side pl-2">
          <h6 className="mb-0 lead address">From: Marius Minea</h6>
          <p className="mb-0 date">Recieved: 04/20/2020</p>
          <h7 className="start">Start</h7>
        </div>
        <div className="right-side">
        </div>
    </div>
  )
}

export default TaskBox;