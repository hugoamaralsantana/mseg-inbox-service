import axios from "axios";
import TaskBox from "../parts/taskBox"
import '../../styles/taskReel.css'
import { useEffect, useState, useRef } from "react";

// TODO: outgoing fix

const TaskReel = (props) => {
  const data = props.data;
  // const favoritedOrder = favoriteOrder(data)
  const [dataList, updateTaskBoxOrder] = useState([])
  const isMounted = useRef(false);
  const favorited = props.source === 'outgoing' ? 'sender_favorited' : 'recipient_favorited'
  let color;
  let action;

  useEffect(() => {
    function update() {
      if (!isMounted.current) {
        updateTaskBoxOrder(props.data)
      }
    }
    update()
  })

  async function starTask(task) {
    isMounted.current = true
    console.log(task)
    if (props.type === 'assignedTraining') {
      await axios.put(`http://localhost:8082/${props.type}s/${task._id}`, {
          "type": task.type,
          "status": task.status,
          "recipient": task.recipient,
          "recipient_id": task.recipient_id,
          "sender": task.sender,
          "sender_id": task.sender_id,
          "due_date": task.due_date,
          "recipient_comments": task.recipient_comments,
          "sender_comments": task.sender_comments,
          "training": task.training,
          "is_completed": task.is_completed,
          "recipient_favorited": props.source === 'incoming' ? !task.recipient_favorited : task.recipient_favorited,
          "sender_favorited": props.source === 'outgoing' ? !task.sender_favorited : task.sender_favorited
      })
      .then((res) => {
        const newArr = dataList.map(dataTask => {
          if (dataTask._id === task._id) {
            return res.data
          } return dataTask
        })
        let returnArr = []
        newArr.sort((a, b) => (b.due_date > a.due_date) ? 1: -1)
        newArr.forEach(task => {
          if (task[favorited]) {
            returnArr.unshift(task)
          } else {returnArr.push(task)}
        })
        updateTaskBoxOrder(returnArr)
      })
    } else if (props.type === 'performanceReview') {
        await axios.put(`http://localhost:8082/${props.type}s/${task._id}`, {
          "type": task.type,
          "status": task.status,
          "recipient": task.recipient,
          "recipient_id": task.recipient_id,
          "due_date": task.due_date,
          "sender": task.sender,
          "sender_id": task.sender_id,
          "overall_comments": task.overall_comments,
          "recipient_comments": task.recipient_comments,
          "sender_comments": task.sender_comments,
          "growth_score": task.growth_score,
          "growth_comments": task.growth_comments,
          "kindness_score": task.kindness_score,
          "kindness_comments": task.kindness_comments,
          "delivery_score": task.delivery_score,
          "delivery_comments": task.delivery_comments,
          "sender_favorited": props.source === 'outgoing' ? !task.sender_favorited : task.sender_favorited,
          "recipient_favorited": props.source === 'incoming' ? !task.recipient_favorited : task.recipient_favorited
        })
        .then((res) => {
          const newArr = dataList.map(dataTask => {
            if (dataTask._id === task._id) {
              return res.data
            } return dataTask
          })
          let returnArr = []
          newArr.sort((a, b) => (b.due_date > a.due_date) ? 1: -1)
          newArr.forEach(task => {
            if (task[favorited]) {
              returnArr.unshift(task)
            } else {returnArr.push(task)}
          })
          updateTaskBoxOrder(returnArr)
        })
    } else if (props.type === 'PTORequest') {
      await axios.put(`http://localhost:8082/${props.type}s/${task._id}`, {
        "type": task.type,
        "status": task.status,
        "recipient": task.recipient,
        "recipient_id": task.recipient_id,
        "due_date": task.due_date,
        "sender": task.sender,
        "sender_id": task.sender_id,
        "recipient_comments": task.recipient_comments,
        "sender_comments": task.sender_comments,
         "pto_type": task.pto_type,
         "pto_start": task.pto_start,
         "pto_end": task.pto_end,
        "sender_favorited": props.source === 'outgoing' ? !task.sender_favorited : task.sender_favorited,
        "recipient_favorited": props.source === 'incoming' ? !task.recipient_favorited : task.recipient_favorited
        })
        .then((res) => {
          const newArr = dataList.map(dataTask => {
            if (dataTask._id === task._id) {
              return res.data
            } return dataTask
          })
          let returnArr = []
          newArr.sort((a, b) => (b.due_date > a.due_date) ? 1: -1)
          newArr.forEach(task => {
            if (task[favorited]) {
              returnArr.unshift(task)
            } else {returnArr.push(task)}
          })
          updateTaskBoxOrder(returnArr)
        })
    }
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

  // console.log(data)

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
            key={task._id}
            data={task}
            source={props.source}
            type={props.type}
            reelTitle={props.reelTitle}
            action={action}
            userType={props.userType}
            starTask={starTask}
            updateTask={props.updateTask}
          />)
        }
      </div>
    </div>
  )
}

export default TaskReel;