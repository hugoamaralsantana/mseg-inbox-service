import React, { useState } from "react";
import '../../styles/generalTasks.css'
import TaskReel from "./taskReel";

const pendingTaskReelURL = 'performanceReview/incoming/pending';

const GeneralTasks = (props) => {
    return (
        <div className="General-tasks-main bg-dark m-3">
            <div className="general-tasks-title text-white ml-5">
                <h1>My Tasks</h1>
            </div>
                <div className="general-tasks-reel-container p-3">
                    <TaskReel data={props.data.favorited} type={props.type} reelTitle={props.reelItems[0]} user={props.user} endpoint={pendingTaskReelURL} />
                    <TaskReel data={props.data.comingUp} type={props.type} reelTitle={props.reelItems[1]} user={props.user} endpoint={pendingTaskReelURL} />
                </div>
        </div>
    )
}

export default GeneralTasks