import React, { useState } from "react";
import TaskReel from "../parts/taskReel";
import '../../styles/outgoing.css'
import RequestPerformanceReviewModal from "../modals/requestPerformance";
import PTOModal from "../modals/PTO";
import AssignTrainingModal from "../modals/assignTraining";

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
      <AssignTrainingModal show={requestModalState} closeModal={closeModal} user={props.user}/>

    const outgoingCSS = props.containerCount === '1' ? 'outgoing-expanded d-flex bg-dark ml-3 mr-3 mb-2 flex-column justify-content-center' : 'outgoing d-flex bg-dark ml-3 mr-3 mb-2 flex-column justify-content-center'

        return (
            <div>
                <div className={outgoingCSS}>
                    <div className='title d-flex'>
                        <h1 className="text-white ml-5 pt-1">Outgoing</h1>
                        <img className="plus ml-2" src='/icons/plus-icon.svg' alt='add-modal' onClick={showModal}></img>
                    </div>
                    
                    {/* these endpoints are passed to components where we will fetch data from the API later on*/}
                    <div className='task-reel-container bg-dark m-2'>
                        <TaskReel source='outgoing' data={props.data.pending} type={props.type} reelTitle={props.reelItems[0]} user={props.user} endpoint={pendingTaskReelURL} />
                        <TaskReel source='outgoing' data={props.data.inProgress} type={props.type} reelTitle={props.reelItems[1]} user={props.user} endpoint={inProgressTaskReelURL} />
                        <TaskReel source='outgoing' data={props.data.completed} type={props.type} reelTitle={props.reelItems[2]} user={props.user} endpoint={completedTaskReelURL} />
                    </div>
                </div>
                {requestModal}
            </div>
        )
}

  export default Outgoing;
