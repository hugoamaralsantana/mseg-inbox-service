import '../../styles/PTOModal.css'

const PTOModal = (props) => {
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    const request = (
        <div className={showHideClassName}>
            <div className="main d-flex flex-column">
                <div className='exit text-end pr-2 pt-1 align-self-end text-black' onClick={props.closeModal}>X</div>
                <div className='title ml-3 text-primary'><h3>Employee PTO Request</h3></div>
                <form>
                    <div className='reason d-flex flex-column'>
                        <label className='ml-3 mt-2 text-black' htmlFor="reason"><h4 className='mb-0'>Reason:</h4></label>
                        <input className='long-text ml-3' list='reasons' name='reasons' required placeholder='Select a reason for request'></input>
                        <datalist id='reasons'>
                            <option value='Sick Time'></option>
                            <option value='Jury Duty'></option>
                            <option value='Vacation'></option>
                            <option value='Parental Leave'></option>
                        </datalist>
                    </div>
                    <div className='dates d-flex'>
                        <div className='start flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="start-date"><h4 className='mb-0'>Start:</h4></label>
                            <input className='short-text ml-3' type='date' name='start-date' required></input>
                        </div>
                        <div className='end flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="end-date"><h4 className='mb-0'>End:</h4></label>
                            <input className='short-text ml-3' type='date' name='end-date' required></input>
                        </div>
                    </div>
                    <div className='notes'>
                        <label className='ml-3 mt-2 text-black' htmlFor="notes"><h4 className='mb-0'>Notes:</h4></label>
                        <textarea className='long-text ml-3 mr-3' type="text" id="notes" name="notes" rows='4' col='40' placeholder='Add some additional details about the nature of this request'></textarea>
                    </div>
                    <div className='submit bg-primary mr-2 mt-1 text-center d-flex'>
                        <input className='submit-button bg-primary text-white' type="submit" value="Send"></input>
                    </div>
                </form>
            </div>
        </div>
    )

    const approve = (
        <div className={showHideClassName}>
            <div className="main d-flex flex-column">
                <div className='exit text-end pr-2 pt-1 align-self-end text-black' onClick={props.closeModal}>X</div>
                <div className='title ml-3 text-primary'><h3>Employee PTO Request</h3></div>
                <form>
                    <div className='info d-flex'>
                        <div className='from flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="from"><h4 className='mb-0'>From:</h4></label>
                            <input className='short-text ml-3' name='from'></input>
                        </div>
                        <div className='reason flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="reason"><h4 className='mb-0'>Reason:</h4></label>
                            <input className='short-text ml-3' name='reason'></input>
                        </div>
                    </div>
                    <div className='dates d-flex'>
                        <div className='start flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="start-date"><h4 className='mb-0'>Start:</h4></label>
                            <input className='short-text ml-3' type='date' name='start-date' required></input>
                        </div>
                        <div className='end flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="end-date"><h4 className='mb-0'>End:</h4></label>
                            <input className='short-text ml-3' type='date' name='end-date' required></input>
                        </div>
                    </div>
                    <div className='notes'>
                        <label className='ml-3 mt-2 text-black' htmlFor="notes"><h4 className='mb-0'>Notes:</h4></label>
                        <textarea className='long-text ml-3 mr-3' type="text" id="notes" name="notes" rows='4' col='40' placeholder='Add some additional details about the nature of this request'></textarea>
                    </div>
                    <div className='submit-answer d-flex justify-content-between'>
                        <div className='answer'>
                            <input className='shortest-text ml-3 mt-1 text-black' list='answers' name='answers' placeholder='Yes/No'></input>
                            <datalist id='answers'>
                                <option value='Yes'></option>
                                <option value='No'></option>
                            </datalist>
                        </div>
                        <div className='submit bg-primary mr-2 mt-1 text-center d-flex'>
                            <input className='submit-button bg-primary text-white' type="submit" value="Send"></input>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    )
    return props.userType === 'manager' ? approve : request
}

export default PTOModal