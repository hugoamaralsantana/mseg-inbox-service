import '../../styles/assignTrainingModal.css'

const AssignTrainingModal = (props) => {
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    return(
        <div className={showHideClassName}>
            <div className='modal-main d-flex flex-column'>
                <div className='exit text-end pr-2 pt-1 align-self-end text-black' onClick={props.closeModal}>X</div>
                <div className='title ml-3 text-primary'><h3>Assign Training</h3></div>
                <form>
                    <div className='to d-flex flex-column'>
                        <label className='ml-3 mt-2 text-black' htmlFor="to-person"><h4>To:</h4></label>
                        <input className='text ml-3 mr-3' type="text" id="to-person" name="to-person" placeholder='Search Employee...' required></input>
                    </div>
                    <div className='link mt-2'>
                        <label className='ml-3 mt-2 text-black' htmlFor="link"><h4>Link:</h4></label>
                        <input className='text ml-3 mr-3' type="text" id="linkt" name="meslinksage"placeholder='Insert Link...' required></input>
                    </div>
                    <div className='notes mt-1'>
                        <label className='ml-3 mt-4 text-black' htmlFor="notes"><h4>Message:</h4></label>
                        <textarea className='text ml-3 mr-3' type="text" id="notes-text" name="notes" rows='8' placeholder='Write anything you want the employee you are assigning a training to know...'></textarea>
                    </div>
                    <div className='submit bg-primary mr-2 mt-2 text-center d-flex'>
                        <input className='submit-button bg-primary text-white' type="submit" value="Send"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AssignTrainingModal