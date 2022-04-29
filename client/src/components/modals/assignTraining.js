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
        console.log()
        if (recipient === email) {return}
        const data = {
            'training': link
        }
        props.createTask(data)
        props.closeModal()
    }

    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    return(
        <div className={showHideClassName}>
            <div className='modal-main-rp d-flex flex-column'>
                <div className='exit text-end pr-2 pt-1 align-self-end text-black' onClick={props.closeModal}>X</div>
                <div className='title ml-3 text-primary'><h3>Assign Training</h3></div>
                <form onSubmit={handleExit}>
                    {/* <div className='to d-flex flex-column'>
                        <label className='ml-3 mt-2 text-black' htmlFor="to-person"><h4>To:</h4></label>
                        <input className='text ml-3 mr-3' type="text" id="to-person" name="to-person" value={recipient} onChange={handleInput} placeholder='Insert Employee Email' required></input>
                    </div> */}
                    <div className='link mt-2'>
                        <label className='ml-3 mt-2 text-black' htmlFor="link"><h4>Link:</h4></label>
                        <input className='text ml-3 mr-3' type="text" id="link" name="meslinksage" value={link} onChange={handleInput} placeholder='Insert Link...' required></input>
                    </div>
                    <div className='submit bg-primary mr-2 mt-4 text-center d-flex'>
                        <div className='submit-button bg-primary text-white' value="Send" onClick={handleExit}>Send to all employees</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AssignTrainingModal