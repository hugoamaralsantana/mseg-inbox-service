import React from 'react';
import TaskReel from "../parts/taskReel";

const pendingTaskReelURL = 'performanceReview/outgoing/pending';
const inProgressTaskReelURL = 'performanceReview/outgoing/inProgress';
const completedTaskReelURL = 'performanceReview/outgoing/completed';

const Outgoing = (props) => {
    return (
        <div className='outgoing d-flex bg-dark m-2'>
            {/* these endpoints are passed to components where we will fetch data from the API later on*/}
            <TaskReel name={props.reelItems[0]} endpoint={pendingTaskReelURL} />
            <TaskReel name={props.reelItems[1]} endpoint={inProgressTaskReelURL} />
            <TaskReel name={props.reelItems[2]} endpoint={completedTaskReelURL} />
        </div>
    )
}

  export default Outgoing;
