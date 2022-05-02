import React, { useState } from "react";
import axios from "axios";
import '../../styles/assignTrainingModal.css'

const AssignTrainingModal = (props) => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const email = userData.email
    const [recipient, updateRecipient] = useState('')
    const [link, updateLink] = useState('')

    function handleInput(e) {
        if (e.target.id === 'to-person') {updateRecipient(e.target.value)}
        else if (e.target.id === 'link') {updateLink(e.target.value)}
    }

    async function handleExit() {
        if (recipient === email) {return}
        await axios.get(`http://localhost:8082/users/email/${recipient}`)
        .then(res => {
           const data = {
               'recipient': res.data[0].first_name + ' ' + res.data[0].last_name,
               'recipient_id': res.data[0]._id,
               'training': link
           }
            props.createTask(data)
            props.closeModal()
        })
    }

    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    return(
        <div className={showHideClassName}>
            <div className='modal-main d-flex flex-column'>
                <div className='exit text-end pr-2 pt-1 align-self-end text-black' onClick={props.closeModal}>X</div>
                <div className='title ml-3 text-primary'><h3>Assign Training</h3></div>
                <form onSubmit={handleExit}>
                    <div className='to d-flex flex-column'>
                        <label className='ml-3 mt-2 text-black' htmlFor="to-person"><h4>To:</h4></label>
                        <input className='text ml-3 mr-3' type="text" id="to-person" name="to-person" value={recipient} onChange={handleInput} placeholder='Insert Employee Email' required></input>
                    </div>
                    <div className='link mt-2'>
                        <label className='ml-3 mt-2 text-black' htmlFor="link"><h4>Link:</h4></label>
                        <input className='text ml-3 mr-3' type="text" id="link" name="meslinksage" value={link} onChange={handleInput} placeholder='Insert Link...' required></input>
                    </div>
                    <div className='notes mt-1'>
                        <label className='ml-3 mt-4 text-black' htmlFor="notes"><h4>Message:</h4></label>
                        <textarea className='text ml-3 mr-3' type="text" id="notes-text" name="notes" rows='8' placeholder='Write anything you want the employee you are assigning a training to know...'></textarea>
                    </div>
                    <div className='submit bg-primary mr-2 mt-2 text-center d-flex'>
                        <div className='submit-button bg-primary text-white' value="Send" onClick={handleExit}>Send</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AssignTrainingModal