import React, { useState } from "react";
import '../../styles/PTOModal.css'

const PTOModal = (props) => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const email = userData.email
    const [reason, updateReason] = useState(props.userType === 'Employee' ? '' : props.data.pto_type)
    const [startDate, updateStartDate] = useState(props.userType === 'Employee' ? '' : props.data.pto_start.substring(0, 10))
    const [endDate, updateEndDate] = useState(props.userType === 'Employee' ? '' : props.data.pto_end.substring(0, 10))
    const [notes, updateNotes] = useState(props.userType === 'Employee' ? '' : props.data.sender_comments)
    const [answer, updateAnswer] = useState(props.userType === 'Employee' ? '' : props.data.recipient_comments)
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";

    function handleChange(e) {
        if (e.target.id === 'reason') {updateReason(e.target.value)}
        else if (e.target.id === 'start-date') {updateStartDate(e.target.value)}
        else if (e.target.id === 'end-date') {updateEndDate(e.target.value)}
        else if (e.target.id === 'notes') {updateNotes(e.target.value)}
        else if (e.target.id === 'answer') {
            if (props.data.status === 'completed') {alert('Cannot edit once submitted'); return;}
            updateAnswer(e.target.value)
        }
    }

    function handleExit(str) {
        const data = {
            "sender_comments": notes,
            "recipient_comments": answer,
            "pto_type": reason,
            "pto_start": startDate.substring(0, 10),
            "pto_end": endDate.substring(0, 10),
        }
        if (str === 'exit') {
            props.closeModal()
            if (props.data.status !== 'completed') {
                props.updateTask('exit', props.data, data)
            }
            return
        } else if (str === 'submit') {
            props.updateTask('submit', props.data, data)
            props.closeModal()
            return
        }
        props.createTask(data)
        props.closeModal()
    }

    const request = (
        <div className={showHideClassName}>
            <div className="main d-flex flex-column">
                <div className='exit text-end pr-2 pt-1 align-self-end text-black' onClick={props.closeModal}>X</div>
                <div className='title ml-3 text-primary'><h3>Employee PTO Request</h3></div>
                <form>
                    <div className='reason d-flex flex-column'>
                        <label className='ml-3 mt-2 text-black' htmlFor="reason"><h4 className='mb-0'>Reason:</h4></label>
                        <input className='long-text ml-3' list='reasons' name='reasons' value={reason} id='reason' required placeholder='Select a reason for request' onChange={handleChange}></input>
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
                            <input className='short-text ml-3' type='date' name='start-date' id='start-date' value={startDate} onChange={handleChange} required></input>
                        </div>
                        <div className='end flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="end-date"><h4 className='mb-0'>End:</h4></label>
                            <input className='short-text ml-3' type='date' name='end-date' id='end-date' value={endDate} onChange={handleChange} required></input>
                        </div>
                    </div>
                    <div className='notes'>
                        <label className='ml-3 mt-2 text-black' htmlFor="notes"><h4 className='mb-0'>Notes:</h4></label>
                        <textarea className='long-text ml-3 mr-3' type="text" id="notes" name="notes" rows='4' col='40' value={notes} onChange={handleChange} placeholder='Add some additional details about the nature of this request'></textarea>
                    </div>
                    <div className='submit bg-primary mr-2 mt-1 text-center d-flex'>
                        <div className='submit-button-pto bg-primary text-white' onClick={handleExit}>Send</div>
                    </div>
                </form>
            </div>
        </div>
    )

    const approve = (
        <div className={showHideClassName}>
            <div className="main d-flex flex-column">
                <div className='exit text-end pr-2 pt-1 align-self-end text-black' onClick={() => handleExit('exit')}>X</div>
                <div className='title ml-3 text-primary'><h3>Employee PTO Request</h3></div>
                <form onSubmit={() => handleExit('submit')}>
                    <div className='info d-flex'>
                        <div className='from flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="from"><h4 className='mb-0'>From:</h4></label>
                            <input className='short-text ml-3' name='from' id='name' value={props.userType === 'Employee' ? '' : props.data.sender} disabled='disabled'></input>
                        </div>
                        <div className='reason flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="reason"><h4 className='mb-0'>Reason:</h4></label>
                            <input className='short-text ml-3' name='reason' id='reason-manager' value={reason} disabled='disabled'></input>
                        </div>
                    </div>
                    <div className='dates d-flex'>
                        <div className='start flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="start-date"><h4 className='mb-0'>Start:</h4></label>
                            <input className='short-text ml-3' type='date' name='start-date' value={startDate} disabled='disabled' required></input>
                        </div>
                        <div className='end flex-column'>
                            <label className='ml-3 mt-2 text-black' htmlFor="end-date"><h4 className='mb-0'>End:</h4></label>
                            <input className='short-text ml-3' type='date' name='end-date' value={endDate} disabled='disabled' required></input>
                        </div>
                    </div>
                    <div className='notes'>
                        <label className='ml-3 mt-2 text-black' htmlFor="notes"><h4 className='mb-0'>Notes:</h4></label>
                        <textarea className='long-text ml-3 mr-3' type="text" id="notes" name="notes" value={notes} disabled='disabled' rows='4' col='40' placeholder='Add some additional details about the nature of this request'></textarea>
                    </div>
                    <div className='submit-answer d-flex justify-content-between'>
                        <div className='answer'>
                            <input className='shortest-text ml-3 mt-1 text-black' list='answers' id='answer' name='answers' value={answer} disabled={props.userType === 'Employee' ? '' : props.data.status === 'completed' ? 'disabled' : ''} onChange={handleChange} required placeholder='Yes/No'></input>
                            <datalist id='answers'>
                                <option value='Yes'></option>
                                <option value='No'></option>
                            </datalist>
                        </div>
                        <div className={`submit bg-primary mr-2 mt-1 text-center d-${props.userType === 'Employee' ? 'flex' : props.data.status === 'completed' ? 'none' : 'flex'}`}>
                            <input className='submit-button-pto bg-primary text-white' type="submit" value="Send"></input>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    )
    return props.userType === 'Manager-complete' || props.userType === 'Employee-complete' ? approve : request
}

export default PTOModal