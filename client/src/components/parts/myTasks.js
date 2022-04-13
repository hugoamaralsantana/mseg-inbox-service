import React from 'react';
import TaskReel from "../parts/taskReel";
import '../../styles/myTasks.css'

const FavoritedTaskReelURL = 'landingPage/myTasks/Favorited';
const comingUpTaskReelURL = 'landingPage/myTasks/comingUp';

const myTasks = (props) => {
    return (
        <div className='myTasks d-flex bg-dark ml-3 mr-3 mb-2 mt-2 flex-column justify-content-center'>
            <h1 className="text-white ml-5 pt-1">My Tasks</h1>
            {/* these endpoints are passed to components where we will fetch data from the API later on*/}
            <div className='task-reel-container d-flex bg-dark p-2 align-items-end justify-content-around  h-95'>
            <TaskReel source='createATask' type={props.type} showModal={props.showModal} closeModal={props.closeModal} reelTitle={props.reelItems[0]} endpoint={FavoritedTaskReelURL} />
            <TaskReel source='createATask' type={props.type} showModal={props.showModal} closeModal={props.closeModal} reelTitle={props.reelItems[1]} endpoint={comingUpTaskReelURL} />
            </div>
        </div>
    )
}

  export default myTasks;
