import React, { useState } from "react";
import '../../styles/generalTasks.css'
import TaskReel from "./taskReel";

const pendingTaskReelURL = 'performanceReview/incoming/pending';

const GeneralTasks = (props) => {
    const favorited = props.data.favorited === undefined ? [] : props.data.favorited
    const comingUp = props.data.comingUp === undefined ? [] : props.data.comingUp
    return (
        <div className="General-tasks-main bg-dark mr-3 ml-3 mb-3 mt-0">
            <div className="general-tasks-title text-white ml-5">
                <h1>My Tasks</h1>
            </div>
                <div className="general-tasks-reel-container p-3">
                    <TaskReel data={favorited} type={props.type} reelTitle={props.reelItems[0]} userType={props.userType} endpoint={pendingTaskReelURL} />
                    <TaskReel data={comingUp}  type={props.type} reelTitle={props.reelItems[1]} userType={props.userType} endpoint={pendingTaskReelURL} />
                </div>
        </div>
    )
}

export default GeneralTasks