import React, { useState } from "react";
import axios from "axios";
import '../../styles/completePerformanceReviewModal.css'

const RequestPerformanceReviewModal = (props) => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const email = userData.email
    const [recipient, updateRecipient] = useState('')
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    function handleInput(e) {
        updateRecipient(e.target.value)
    }

    async function handleExit(string) {
        console.log('bling')
        if (recipient === email) {alert('Cant send request to yourself'); return}
        await axios.get(`http://localhost:8082/users/email/${recipient}`)
        .then(res => {
            console.log(res.data[0])
           const data = {
               'recipient': res.data[0].first_name + ' ' + res.data[0].last_name,
               'recipient_id': res.data[0]._id
           }
            props.createTask(data)
            props.closeModal()
        })
    }

    return(
        <div className={showHideClassName}>
            <div className='modal-main d-flex flex-column'>
                <div className='exit text-end pr-2 pt-1 align-self-end text-black' onClick={props.closeModal}>X</div>
                <div className='title ml-3 text-primary'><h3>Request Performance Review</h3></div>
                <form onSubmit={() => handleExit('request')}>
                    <div className='to d-flex flex-column'>
                        <label className='ml-3 mt-2 text-black' htmlFor="to-person"><h4>To:</h4></label>
                        <input className='text ml-3 mr-3' type="text" id="to-person" name="to-person" placeholder='Insert Employee Email' value={recipient} onChange={handleInput} required></input>
                    </div>
                    <div className='message mt-2'>
                        <label className='ml-3 mt-4 text-black' htmlFor="message"><h4>Message:</h4></label>
                        <textarea className='text ml-3 mr-3' type="text" id="message-text" name="message" rows='12' placeholder='Write anything you want the employee you are requesting a review from to know...'></textarea>
                    </div>
                    <div className='submit bg-primary mr-2 mt-2 text-center d-flex'>
                        <div className='submit-button bg-primary text-white' onClick={handleExit}>Send</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RequestPerformanceReviewModal