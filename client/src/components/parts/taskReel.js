import TaskBox from "../parts/taskBox"
import '../../styles/taskReel.css'
import { useState } from "react";

// TODO: fetch data from API using props.endpoint later on

const TaskReel = (props) => {
  const data = props.data;
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
    color = 'title gray';
    action = 'Start';
  }
  else if (props.reelTitle === 'In Progress') {
    color = 'title yellow';
    action = 'Continue';
  }
  else if (props.reelTitle === 'Completed') {
    color = 'title green';
    action = 'Review';
  }

  return (
    <div className="task-reel text-white bg-darkest">
      <div className={color}>
        <h4 className="text-primary pl-2">{props.reelTitle}</h4>
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