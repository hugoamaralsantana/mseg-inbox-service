import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import '../../styles/taskbox.css';
import CompletePerformanceReviewModal from "../modals/completePerformance";
import PTOModal from "../modals/PTO";


const TaskBox = (props) => {
  const [completeModalState, updateCompleteModalState] = useState(false);
  const [requestModalState, updateRequestModalState] = useState(false);
  const [expanded, updateExpansion] = useState(false)
  const [remindExpand, updateRemind] = useState(false)
  const [dueDateExpand, updatedueDate] = useState(false)
  const [isStarred, updateStar] = useState(false);

  const starFavorited = props.source === 'incoming' ? props.data.recipient_favorited : props.data.sender_favorited


  function showModal(e) {
    if (props.type === 'assignedTraining'){
      props.updateTask('inProgress', props.data)
      //open new link
      window.open(props.data.training);
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

  function expandRemind() {
    updateRemind(!remindExpand)
  }

  function expandDueDate() {
    updatedueDate(!dueDateExpand)
  }

  function clickStar(e) {
    updateStar(!isStarred);
    props.starTask(props.data)
    e.stopPropagation();
  }

  const taskBoxCSS = expanded ? 'task-box-expanded bg-secondary d-flex justify-content-between m-2 mb-0' : 'task-box bg-secondary d-flex justify-content-between m-2 mb-0';
  const expandedBoxCSS = expanded ? 'bg-secondary mt-1 ml-2 mr-2 mb-2' : 'expanded-none bg-secondary mt-1 ml-2 mr-2 mb-2'
  const completeModal = props.type === 'performanceReview' ? <CompletePerformanceReviewModal show={completeModalState} closeModal={closeModal} data={props.data} updateTask={props.updateTask}/> :
                        props.type === 'PTORequest' ? <PTOModal show={completeModalState} closeModal={closeModal} userType={props.userType + '-complete'} data={props.data} updateTask={props.updateTask}/> :
                        <></>;
  const action = props.source === 'incoming' ? props.action : 
                 props.reelTitle === 'Completed' ? props.action : ''
  const filterCSS = remindExpand ? 'd-flex ml-1' : 'none ml-1'
  const dueDateCSS = dueDateExpand ? 'd-flex ml-1' : 'none ml-1'

  const expandedBox = props.source === 'incoming' ? 
  <div className={expandedBoxCSS}>
    <div className="expand-option d-flex align-items-center m-1 text-pending">
      <img className="bell" src='/icons/remind-me.svg' alt='remind me icon'></img>
      <h6 className="m-0 pl-1 option-text" onClick={expandRemind}>Remind Me</h6>
    </div>
    <form className={filterCSS}>
        <input className='input' type='date' placeholder=""></input>
        <input className="option-submit" type='submit' value="Add"></input>
    </form>
    <div className="expand-option d-flex align-items-center m-1 text-pending">
      <img className="bell" src='/icons/due-date.svg' alt='remind me icon'></img>
      <h6 className="m-0 pl-1 option-text" onClick={expandDueDate}>Add Due Date</h6>
    </div>
    <form className={dueDateCSS}>
        <input className='input' type='date' placeholder=""></input>
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
              {props.source === 'outgoing' ? 'To: ': 'From: '} 
              {props.source === 'outgoing' ? props.data.recipient: props.data.sender}
            </h6>
            <p className="mb-0 date">Due: {new Date(props.data.due_date).toLocaleDateString("en-US")}</p>
            <h7 className={`start display-${props.data.status==='completed' && props.type === 'assignedTraining' ? 'none' : ''}`} onClick={showModal}>{action}</h7>
            <h7 className={`start ml-2 display-${props.type !== 'assignedTraining' || props.data.status !== 'inProgress'  ? 'none' : ''}`} onClick={finishTraining}>Finish</h7>
          </div>
          <div className="right-side">
            <Star/>
            <div className="profile-icon">
              <div className="profile-icon-initial">{props.source === 'outgoing' ? props.data.recipient[0]: props.data.sender[0]}</div>
            </div>
          </div>
      </div>
      {expandedBox}
      {completeModal}
    </div>
  )
}

export default TaskBox;