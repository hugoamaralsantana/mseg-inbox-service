import React, { useState } from "react";
import '../../styles/generalModalSelect.css'
import PTOModal from "../modals/PTO";
import RequestPerformanceReviewModal from "../modals/requestPerformance";


const GeneralModalSelect = (props) => {
    const [requestModalState, updateRequestModalState] = useState(false);

    function showModal() {
        updateRequestModalState(true);
      }
    
    function closeModal() {
        updateRequestModalState(false);
    }

    return (
        <div class='modal-select bg-dark ml-3 mr-3'>
            <div id='modal-select-title' className="text-white ml-2"><h1>Create a Task</h1></div>
            <div id="modal-select-buttons" className="">
                <div className="modal-select-button text-white bg-darkest m-2 d-flex justify-content-center align-content-center">
                    <div className="bg-secondary m-2 p-1 modal-select-text"><h3 className="mb-0">Performance Review</h3></div>
                </div>
                <div className="modal-select-button text-white bg-darkest m-2 d-flex justify-content-center align-content-center">
                    <div className="bg-secondary m-2 p-1 modal-select-text"><h3 className="mb-0">PTO Request</h3></div>
                </div>
            </div>
        </div>
    )
}

export default GeneralModalSelect