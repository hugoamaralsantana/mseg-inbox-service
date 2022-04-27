import React, { useState } from "react";
import '../../styles/profile_column.css'

const ProfileColumn = (props) => {
    const showHideClassName = props.profileColumnState ? "column d-flex justify-content-end align-items-start" : "column display-none";
    const expanded = props.expanded ? 'expanded ': 'non-expanded '

    const locale = 'en';
    const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update

     React.useEffect(() => {
        const timer = setInterval(() => { // Creates an interval which will update the current data every minute
            // This will trigger a rerender every component that uses the useDate hook.
         setDate(new Date());
        }, 60 * 1000);
        return () => {
        clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
        }
    }, []);

    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

    document.addEventListener('mouseup', function(e) {
        const container = document.getElementById('column-main');
        if (!container.contains(e.target)) {
            props.closeBox()
        }
    })

    return(
        <div className={expanded + showHideClassName}>
            <div id='column-main'>
                <div id='profile-icon-container' className="d-flex justify-content-center pb-2 pt-2">
                    <div id='column-profile-icon' className="d-flex align-items-center justify-content-center">
                        <div id='column-profile-icon-initial' className="">{props.user_name[0]}</div>
                    </div>
                </div>
                <div id='profile-info' className="p-2">
                    <div id='name' className="">
                        <h7 className='fw-light'>Name</h7>
                        <h6>{props.user_name}</h6>
                    </div>
                    <div id='time' className="">
                        <h7 className='fw-light'>Time</h7>
                        <h6>{time}</h6>
                    </div>
                    <div id='email' className="">
                        <h7 className='fw-light'>Email</h7>
                        <h6>{props.user_email}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileColumn 