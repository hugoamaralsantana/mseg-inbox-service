import TaskBox from "../parts/taskBox"
import '../../styles/taskReel.css'
import { useState } from "react";

// TODO: fetch data from API using props.endpoint later on

const TaskReel = (props) => {
  const data = props.data;
  console.log(data.length)
  const favoritedOrder = favoriteOrder(data)
  const [dataList, updateTaskBoxOrder] = useState(favoritedOrder)
  let color;
  let action;

  function favoriteOrder(arr) {
    arr.sort((a, b) => (b.date._d > a.date._d) ? 1: -1)
    let favoritedOrdered = []
    arr.forEach((taskbox) => {
      if (taskbox.favorited) {
        favoritedOrdered.unshift(taskbox); return;}
      else {favoritedOrdered.push(taskbox)}
    })
    return favoritedOrdered
  }

  function starTask(id) {
    dataList.forEach((task) => {
      if (task.task_id === id) {
        task.favorited = !task.favorited;
      }
    })
    const newList = favoriteOrder(dataList)
    updateTaskBoxOrder(newList);
  }

  if (props.reelTitle === 'Pending') {
    color = 'title gray d-flex justify-content-between';
    action = 'Start';
  }
  else if (props.reelTitle === 'In Progress') {
    color = 'title yellow d-flex justify-content-between';
    action = 'Continue';
  }
  else if (props.reelTitle === 'Completed') {
    color = 'title green d-flex justify-content-between';
    action = 'Review';
  }

  return (
    <div className="task-reel text-white bg-darkest">
      <div className={color}>
        <h4 className="text-primary pl-2 mb-0">{props.reelTitle}</h4>
        <div id='task-count' className="d-flex align-items-center mr-3">
          <img className="" src='/icons/card-icon.svg' alt='card' width={22} height={22}></img>
          <h5 className="mb-0 text-primary">{data.length}</h5>
        </div>
      </div>
      <div className="task-box-container">
        {dataList.map((task) =>
          <TaskBox 
            key={task.task_id}
            data={task}
            source={props.source}
            type={props.type}
            reelTitle={props.reelTitle}
            action={action}
            userType={props.user}
            starTask={starTask}
          />)
        }
      </div>
    </div>
  )
}

export default TaskReel;