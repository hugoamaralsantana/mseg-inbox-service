import React, { useState } from "react";
import '../../styles/custom.scss'
import '../../styles/sidebar.css'

const SideBar = (props) => {
    function arrowClick() {
        props.expandSideBar();
    }
    const [width, updateWidth] = useState(window.screen.width)

    window.addEventListener('resize', () => {
        updateWidth(window.screen.width)
    })
    //console.log(window.screen.height)
    if (props.expanded && width > 1000) {
        return(
            <div className="sidebar-extended d-flex flex-column justify-content-between align-items-center">
                <div className='top d-flex flex-column justify-content-start'>
                    <a href="/performanceReview">
                        <div className='icon-container-extended d-flex align-items-center justify-content-start'>
                            <img className="icon" id="perforace-review-icon" src='/icons/performance-review-icon.svg' alt="perforace-review-icon"/>
                            <h7>Performance Review</h7>
                        </div>
                    </a>
                    <a href="/PTORequest">
                        <div className='icon-container-extended d-flex align-items-center justify-content-start'>
                            <img className="icon" id="pto-request-icon" src='/icons/pto-request-icon.svg' alt="pto-request-icon"/>
                            <h7>PTO Request</h7>
                        </div>
                    </a>
                    <a href="/assignedTraining">
                        <div className='icon-container-extended d-flex align-items-center justify-content-start'>
                            <img className="icon" id="assigned-training-icon" src='/icons/assigned-training-icon.svg' alt="assigned-training-icon"/>
                            <h7>Assigned Training</h7>
                        </div>
                    </a>
                </div>
                <div className='bottom'>
                    <span id="arrow-expanded" onClick={arrowClick}>&#10229;</span>
                </div>
            </div>
        )
    }
    
         return(
            <div className="sidebar d-flex flex-column justify-content-between align-items-center">
                <div className='top d-flex flex-column justify-content-start'>
                    <a href="/performanceReview">
                        <div className='icon-container d-flex align-items-center justify-content-start'>
                            <img className="icon" id="perforace-review-icon" src='/icons/performance-review-icon.svg' alt="perforace-review-icon"/>
                        </div>
                    </a>
                    <a href="/PTORequest">
                        <div className='icon-container d-flex align-items-center justify-content-start'>
                            <img className="icon" id="pto-request-icon" src='/icons/pto-request-icon.svg' alt="pto-request-icon"/>
                        </div>
                    </a>
                    <a href="/assignedTraining">
                        <div className='icon-container d-flex align-items-center justify-content-start'>
                            <img className="icon" id="assigned-training-icon" src='/icons/assigned-training-icon.svg' alt="assigned-training-icon"/>
                        </div>
                    </a>
                </div>
                <div className='bottom'>
                    <span id="arrow" onClick={arrowClick}>&#8594;</span>
                </div>
            </div>
        )

};

export default SideBar;