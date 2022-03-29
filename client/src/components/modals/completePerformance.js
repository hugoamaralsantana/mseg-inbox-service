import '../../styles/completePerformanceReviewModal.css'

const CompletePerformanceReviewModal = (props) => {
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";

    return(
        <div className={showHideClassName}>
            <div className="modal-main d-flex flex-column">
                <div className='exit text-end pr-2 pt-1 align-self-end text-black' onClick={props.closeModal}>X</div>
                <div className='title ml-3 text-primary'><h3>Complete Performance Review</h3></div>
                <form>
                    <div className='overall-comments'>
                        <div className='d-flex flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="overall-comments"><h4>Overall Comments:</h4></label>
                            <textarea className='text ml-3 mr-3' type="text" id="overall-comments" name="overall-comments" rows='4' col='40' required placeholder='Write overall comments you want the employee you are completing a review for to know...'></textarea>
                        </div>
                    </div>
                    <div className='growth characteristic mt-1'>
                        <div>
                            <div className='growth-score'>
                                <label className='ml-3 text-black' htmlFor="growth"><h4>Growth Feedback Score:</h4></label>
                                <input className='gst' type="number" id="growth-score" min="1" max="5" required name="growth-score" placeholder='0-5'></input>
                            </div>
                            <div className='growth-comment'>
                                <textarea className='text ml-3 mr-3' type="text" id="growth-text" name="growth-text" rows="2" required placeholder='Provide feedback on how the employee has grown in their role throughout the year...'></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='kindness characteristic mt-1'>
                        <div>
                            <div className='kindness-score'>
                                <label className='ml-3 text-black' htmlFor="kindness"><h4>Kindness Feedback Score:</h4></label>
                                <input className='kst' type="number" id="kindness-score" min="1" max="5" required name="kindness-score" placeholder='0-5'></input>
                            </div>
                            <div className='kindness-comment'>
                                <textarea className='text ml-3 mr-3' type="text" id="kindness-text" name="kindness-text" rows="2" required placeholder='Provide feedback on wherether or not the employee was enjoyable to work with / overall interaction...'></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='delivery characteristic mt-1'>
                        <div className='delivery-score'>
                                <label className='ml-3 text-black' htmlFor="delivery"><h4>Delivery Feedback Score:</h4></label>
                                <input className='dst' type="number" id="delivery-score" min="1" max="5" required name="delivery-score" placeholder='0-5'></input>
                        </div>
                        <div className='delivery-comment'>
                            <textarea className='text ml-3 mr-3' type="text" id="delivery-text" name="delivery-text" rows="2" required placeholder='Provide feedback on whether not the employee was able to deliver work in a timely, consistent, and quality manner...'></textarea>
                        </div>
                    </div>
                    <div className='submit bg-primary mr-2 mt-1 text-center d-flex'>
                        <input className='submit-button bg-primary text-white' type="submit" value="Send"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompletePerformanceReviewModal