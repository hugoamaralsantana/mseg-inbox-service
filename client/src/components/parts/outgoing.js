import React from 'react';
import TaskReel from "../parts/taskReel";

const pendingTaskReelURL = 'performanceReview/outgoing/pending';
const inProgressTaskReelURL = 'performanceReview/outgoing/inProgress';
const completedTaskReelURL = 'performanceReview/outgoing/completed';

const Outgoing = () => {
    return (
        <div>
            {/* these endpoints are passed to components where we will fetch data from the API later on*/}
            <TaskReel name='Pending' endpoint={pendingTaskReelURL}></TaskReel>
            <TaskReel name='In Progress' endpoint={inProgressTaskReelURL}></TaskReel>
            <TaskReel name='Completed' endpoint={completedTaskReelURL}></TaskReel>
        </div>
    )
}

  export default Outgoing;
