import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import '../../styles/taskbox.css';
import CompletePerformanceReviewModal from "../modals/completePerformance";
import PTOModal from "../modals/PTO";


const TaskBox = (props) => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const id = userData._id
  const [completeModalState, updateCompleteModalState] = useState(false);
  const [requestModalState, updateRequestModalState] = useState(false);
  const [expanded, updateExpansion] = useState(false)
  const [remindExpand, updateRemind] = useState(false)
  const [dueDateExpand, updatedueDate] = useState(false)
  const [isStarred, updateStar] = useState(false);
  const [changeDate, changeDueDate] = useState('')
  const starFavorited = props.data.recipient_id === id ? props.data.recipient_favorited : props.data.sender_favorited
  const boxType = props.data.type === 'assignedTraining' ? 'Assigned Training' : props.data.type === 'PTORequest' ? 'PTO Request' : 'Performance Review'

  function showModal(e) {

    if (props.type === 'assignedTraining'){
      props.updateTask('inProgress', props.data)
      //open new link
      window.open(props.data.training);
    }
    else if (props.type === 'landingPage') {
      if (props.data.type === 'assignedTraining') {window.location.href = '/assignedTraining'}
      else if (props.data.type === 'performanceReview') {window.location.href = '/performanceReview'}
      else if (props.data.type === 'PTORequest') {window.location.href = '/PTORequest'}
    }
    else {
      updateCompleteModalState(true)
      e.stopPropagation();
    }
  }

  function finishTraining() {
    props.updateTask('completed', props.data)
  }

  function closeModal() {
    updateCompleteModalState(false);
  }

  function expandBox() {
    updateExpansion(!expanded)
  }

  function expandDueDate() {
    updatedueDate(!dueDateExpand)
  }

  function clickStar(e) {
    updateStar(!isStarred);
    props.starTask(props.data)
    e.stopPropagation();
  }

  function handleChange(e) {
    changeDueDate(e.target.value)
  }

  function handleDateChange() {
    props.updateDate(changeDate, props.data)
  }


  const taskBoxCSS = expanded ? 'task-box-expanded bg-secondary d-flex justify-content-between m-2 mb-0' : 'task-box bg-secondary d-flex justify-content-between m-2 mb-0';
  const expandedBoxCSS = expanded ? 'bg-secondary mt-1 ml-2 mr-2 mb-2' : 'expanded-none bg-secondary mt-1 ml-2 mr-2 mb-2'
  const completeModal = props.data.type === 'performanceReview' ? <CompletePerformanceReviewModal show={completeModalState} closeModal={closeModal} data={props.data} updateTask={props.updateTask}/> :
                        props.data.type === 'PTORequest' ? <PTOModal show={completeModalState} closeModal={closeModal} userType={props.userType + '-complete'} data={props.data} updateTask={props.updateTask}/> :
                        <></>;
  const action = props.type === 'landingPage' ? 'Go' : props.data.recipient_id === id ? props.action : 
                 props.reelTitle === 'Completed' ? props.action : ''
  const filterCSS = remindExpand ? 'd-flex ml-1' : 'none ml-1'
  const dueDateCSS = dueDateExpand ? 'd-flex ml-1' : 'none ml-1'

  const expandedBox = props.data.recipient_id === id ? 
  <div className={expandedBoxCSS}>
    <form className={filterCSS}>
        <input className='input' type='date' placeholder=""></input>
        <input className="option-submit" type='submit' value="Add"></input>
    </form>
    <div className="expand-option d-flex align-items-center m-1 text-pending">
      <img className="bell" src='/icons/due-date.svg' alt='remind me icon'></img>
      <h6 className="m-0 pl-1 option-text" onClick={expandDueDate}>Add Due Date</h6>
    </div>
    <form onSubmit={handleDateChange} className={dueDateCSS}>
        <input className='input' type='date' value={changeDate} onChange={handleChange} required placeholder=""></input>
        <input className="option-submit" type='submit' value="Add"></input>
    </form>
  </div> : ''

  const Star = () => {
    return starFavorited
      ? <img id="star-button" className="star-button" src='/icons/star-button-filled.svg' alt='' onClick={clickStar}></img>
      : <img id="star-button" className="star-button" src='/icons/star-button-unfilled.svg' alt='' onClick={clickStar}></img>;
  }
  return (
    <div>
      <div className={taskBoxCSS} onClick={expandBox}>
          <div className="left-side pl-2">
            <h6 className="mb-0 lead address">
              {props.data.sender_id === id ? 'To: ': 'From: '} 
              {props.data.sender_id === id ? props.data.recipient: props.data.sender}
            </h6>
            { 
              props.data.sender_comments ? 
              <p className="mb-0">Notes: {props.data.sender_comments}</p> : null
            }
            <p className="mb-0 date">Due: {new Date(props.data.due_date).toLocaleDateString("en-US")}</p>
            <p className={`mb-0 date display-${props.type !== 'landingPage' ? 'none' : ''}`}>{boxType}</p>
            <h7 className={`start display-${props.data.status==='completed' && props.type === 'assignedTraining' ? 'none' : ''}`} onClick={showModal}>{action}</h7>
            <h7 className={`start ml-2 display-${props.type !== 'assignedTraining' || props.data.status !== 'inProgress'  ? 'none' : ''}`} onClick={finishTraining}>Finish</h7>
          </div>
          <div className="right-side">
            <Star/>
            <div className="profile-icon">
              <div className="profile-icon-initial">{props.data.sender_id === id ? props.data.recipient[0]: props.data.sender[0]}</div>
            </div>
          </div>
      </div>
      {/* {expandedBox} */}
      {completeModal}
    </div>
  )
}

export default TaskBox;