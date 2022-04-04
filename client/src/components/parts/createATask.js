import { Link } from "react-router-dom";
import TaskReel from "./taskReel";
import Button from 'react-bootstrap/Button';
import '../../styles/createATask.css'
import '../../styles/bts.css'

const createATask= (props) => {
  return (
    <div className="createATask d-flex bg-dark ml-3 mr-3 mb-2 mt-2 flex-column">
      <h1 className="text-white ml-5 pt-1">Create a Task</h1>
      {/* these endpoints are passed to components where we will fetch data from the API later on*/}
      <div className='task-reel-container d-flex bg-dark m-2 align-items-end justify-content-center'>
      <div className='bts'>
      <Button className="bts1" variant="primary" size="lg">Performance Review</Button>{' '}
      <Button className="bts2" variant="primary"size="lg">PTO Request</Button>{' '}
      <Button className="bts3" variant="primary"size="lg">Assigned Training</Button>{' '}
      </div>
      </div>
    </div>
  )
}

export default createATask;