import { Link } from "react-router-dom";
import React, { useState } from "react";
import '../../styles/taskbox.css';
import CompletePerformanceReviewModal from "../modals/completePerformance";
import RequestPerformanceReviewModal from "../modals/requestPerformance";
import PTOModal from "../modals/PTO";

const TaskBox = (props) => {
  const [completeModalState, updateCompleteModalState] = useState(false);
  const [requestModalState, updateRequestModalState] = useState(false);

  function showModal(source) {
    source === 'incoming' ? updateCompleteModalState(true) : updateRequestModalState(true);
  }

  function closeModal() {
    updateCompleteModalState(false);
    updateRequestModalState(false);
  }

  //here we do conditional for type of page were looking at (performanceReview, PTORequest, assignedTrainings)
  // const completeModal = <CompletePerformanceReviewModal show={completeModalState} closeModal={closeModal}/>
  // const completeModal = <PTOModal show={completeModalState} closeModal={closeModal}/>
  const completeModal = props.type === 'performanceReview' ? <CompletePerformanceReviewModal show={completeModalState} closeModal={closeModal}/> :
                        props.type === 'PTORequest' ? <PTOModal show={completeModalState} closeModal={closeModal} user={props.user}/> :
                        <></>
  const requestModal = <RequestPerformanceReviewModal show={requestModalState} closeModal={closeModal}/>
  const incoming = (
    <div className="task-box bg-secondary d-flex justify-content-between m-2">
        <div className="left-side pl-2">
          <h6 className="mb-0 lead address">From: Marius Minea</h6>
          <p className="mb-0 date">Recieved: 04/20/2020</p>
          <h7 className="start" onClick={() => showModal(props.source)}>{props.action}</h7>
        </div>
        <div className="right-side">
        </div>
        {completeModal}
    </div>
  )

  const outgoing = (
    <div className="task-box bg-secondary d-flex justify-content-between m-2">
        <div className="left-side pl-2">
          <h6 className="mb-0 lead address">From: Marius Minea</h6>
          <p className="mb-0 date">Recieved: 04/20/2020</p>
          <h7 className="start" onClick={() => showModal(props.source)}>{props.action}</h7>
        </div>
        <div className="right-side">
        </div>
        {requestModal}
    </div>
  )

  return props.source === 'incoming' ? incoming : outgoing
}

export default TaskBox;