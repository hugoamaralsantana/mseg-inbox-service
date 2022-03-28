import React, { useState } from "react";
import TaskReel from "../parts/taskReel";
import '../../styles/outgoing.css'
import RequestPerformanceReviewModal from "../modals/requestPerformance";
import PTOModal from "../modals/PTO";

const pendingTaskReelURL = 'performanceReview/outgoing/pending';
const inProgressTaskReelURL = 'performanceReview/outgoing/inProgress';
const completedTaskReelURL = 'performanceReview/outgoing/completed';

const Outgoing = (props) => {
    const [requestModalState, updateRequestModalState] = useState(false);

    function showModal() {
        updateRequestModalState(true);
      }
    
    function closeModal() {
        updateRequestModalState(false);
    }

    const requestModal = props.type === 'performanceReview' ? <RequestPerformanceReviewModal show={requestModalState} closeModal={closeModal}/> :
      props.type === 'PTORequest' ? <PTOModal show={requestModalState} closeModal={closeModal} user={props.user}/> :
      <></>
    if(props.containerCount === '1'){
        return (
            <div>
                <div className='outgoing-expanded d-flex bg-dark ml-3 mr-3 mb-2 mt-2 flex-column justify-content-center'>
                    <div className='title d-flex'>
                        <h1 className="text-white ml-5 pt-1">Outgoing</h1>
                        <img className="plus ml-2" src='/icons/plus-icon.svg' alt='add-modal' onClick={showModal}></img>
                    </div>
                    
                    {/* these endpoints are passed to components where we will fetch data from the API later on*/}
                    <div className='task-reel-container d-flex bg-dark m-2 align-items-end justify-content-center h-95'>
                        <TaskReel source='outgoing' type={props.type} name={props.reelItems[0]} endpoint={pendingTaskReelURL} />
                        <TaskReel source='outgoing' type={props.type} name={props.reelItems[1]} endpoint={inProgressTaskReelURL} />
                        <TaskReel source='outgoing' type={props.type} name={props.reelItems[2]} endpoint={completedTaskReelURL} />
                    </div>
                </div>
                {requestModal}
            </div>
        )
    }
    else{
        return (
            <div className='outgoing d-flex bg-dark ml-3 mr-3 mb-2 mt-2 flex-column justify-content-center'>
                <div className='title d-flex'>
                    <h1 className="text-white ml-5 pt-1">Outgoing</h1>
                    <img className="plus ml-2" src='/icons/plus-icon.svg' alt='add-modal' onClick={showModal}></img>
                </div>
                {/* these endpoints are passed to components where we will fetch data from the API later on*/}
                <div className='task-reel-container d-flex bg-dark m-2 align-items-end justify-content-center h-95'>
                    <TaskReel source='outgoing' type={props.type} name={props.reelItems[0]} endpoint={pendingTaskReelURL} />
                    <TaskReel source='outgoing' type={props.type} name={props.reelItems[1]} endpoint={inProgressTaskReelURL} />
                    <TaskReel source='outgoing' type={props.type} name={props.reelItems[2]} endpoint={completedTaskReelURL} />
                </div>
                {requestModal}
            </div>
        )
    }
}

  export default Outgoing;
