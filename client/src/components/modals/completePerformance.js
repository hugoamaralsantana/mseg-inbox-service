import '../../styles/completePerformanceReviewModal.css'
import React, { useState } from "react";
//Work on submit
//View when outgoing is completed
const CompletePerformanceReviewModal = (props) => {
    const [overallComments, updateOverallComments] = useState(props.data.overall_comments)
    const [growthScore, updateGrowthScore] = useState(props.data.growth_score)
    const [growthComments, updateGrowthComments] = useState(props.data.growth_comments)
    const [kindnessScore, updateKindnessScore] = useState(props.data.kindness_score)
    const [kindnessComments, updateKindnessComments] = useState(props.data.kindness_comments)
    const [deliveryScore, updateDeliveryScore] = useState(props.data.delivery_score)
    const [deliveryComments, updateDeliveryComments] = useState(props.data.delivery_comments)
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    function handleExit(string) {
        if (props.data.status === 'completed') {
            props.closeModal();
            return;
        }
        const data ={
            "overall_comments": overallComments,
            "growth_score": growthScore !== '' ? parseInt(growthScore) : null,
            "growth_comments": growthComments,
            "kindness_score": kindnessScore !== '' ? parseInt(kindnessScore) : null,
            "kindness_comments": kindnessComments,
            "delivery_score": deliveryScore !== '' ? parseInt(deliveryScore) : null,
            "delivery_comments": deliveryComments
        }
        if (string === 'closed') {
            props.closeModal();
            props.updateTask(string, props.data, data)
        } else {
            props.updateTask(string, props.data, data)
        }
    }

    function handleInput(e) {
        if (props.data.status === 'completed') {alert('Cannot edit once submitted'); return;}
        if (e.target.id === 'overall-comments') {updateOverallComments(e.target.value)} 
        else if (e.target.id === 'growth-score') {updateGrowthScore(e.target.value)}
        else if (e.target.id === 'growth-text') {updateGrowthComments(e.target.value)}
        else if (e.target.id === 'kindness-score') {updateKindnessScore(e.target.value)}
        else if (e.target.id === 'kindness-text') {updateKindnessComments(e.target.value)}
        else if (e.target.id === 'delivery-score') {updateDeliveryScore(e.target.value)}
        else if (e.target.id === 'delivery-text') {updateDeliveryComments(e.target.value)}
    }

    return(
        <div className={showHideClassName}>
            <div className="modal-main d-flex flex-column">
                <div className='exit text-end pr-2 pt-1 align-self-end text-black' onClick={() => handleExit('closed')}>X</div>
                <div className='title ml-3 text-primary'><h3>Complete Performance Review</h3></div>
                <form onSubmit={() => handleExit('submit')}>
                    <div className='overall-comments'>
                        <div className='d-flex flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="overall-comments"><h4>Overall Comments:</h4></label>
                            <textarea className='text ml-3 mr-3' type="text" id="overall-comments" name="overall-comments" rows='4' col='40' value={overallComments !== null ? overallComments : ''} onChange={handleInput} disabled={props.data.status === 'completed' ? 'disabled' : ''} required placeholder='Write overall comments you want the employee you are completing a review for to know...'></textarea>
                        </div>
                    </div>
                    <div className='growth characteristic mt-1'>
                        <div>
                            <div className='growth-score'>
                                <label className='ml-3 text-black' htmlFor="growth"><h4>Growth Feedback Score:</h4></label>
                                <input className='gst' type="number" id="growth-score" min="1" max="5" required name="growth-score" placeholder='0-5' value={growthScore !== null ? growthScore : ''} onChange={handleInput} disabled={props.data.status === 'completed' ? 'disabled' : ''}></input>
                            </div>
                            <div className='growth-comment'>
                                <textarea className='text ml-3 mr-3' type="text" id="growth-text" name="growth-text" rows="2" value={growthComments !== null ? growthComments : ''} onChange={handleInput} disabled={props.data.status === 'completed' ? 'disabled' : ''} required placeholder='Provide feedback on how the employee has grown in their role throughout the year...'></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='kindness characteristic mt-1'>
                        <div>
                            <div className='kindness-score'>
                                <label className='ml-3 text-black' htmlFor="kindness"><h4>Kindness Feedback Score:</h4></label>
                                <input className='kst' type="number" id="kindness-score" min="1" max="5" required name="kindness-score" placeholder='0-5'value={kindnessScore !== null ? kindnessScore : ''} onChange={handleInput} disabled={props.data.status === 'completed' ? 'disabled' : ''}></input>
                            </div>
                            <div className='kindness-comment'>
                                <textarea className='text ml-3 mr-3' type="text" id="kindness-text" name="kindness-text" rows="2" value={kindnessComments !== null ? kindnessComments : ''} onChange={handleInput} disabled={props.data.status === 'completed' ? 'disabled' : ''} required placeholder='Provide feedback on wherether or not the employee was enjoyable to work with / overall interaction...'></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='delivery characteristic mt-1'>
                        <div className='delivery-score'>
                                <label className='ml-3 text-black' htmlFor="delivery"><h4>Delivery Feedback Score:</h4></label>
                                <input className='dst' type="number" id="delivery-score" min="1" max="5" required name="delivery-score" placeholder='0-5' value={deliveryScore !== null ? deliveryScore : ''} onChange={handleInput} disabled={props.data.status === 'completed' ? 'disabled' : ''}></input>
                        </div>
                        <div className='delivery-comment'>
                            <textarea className='text ml-3 mr-3' type="text" id="delivery-text" name="delivery-text" rows="2" value={deliveryComments !== null ? deliveryComments : ''} onChange={handleInput} disabled={props.data.status === 'completed' ? 'disabled' : ''} required placeholder='Provide feedback on whether not the employee was able to deliver work in a timely, consistent, and quality manner...'></textarea>
                        </div>
                    </div>
                    <div className={`submit bg-primary mr-2 mt-1 text-center d-${props.data.status === 'completed' ? 'none' : 'flex'}`}>
                        <input className='submit-button bg-primary text-white'  type="submit" value="Send"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompletePerformanceReviewModal