import React, { useState } from "react";
import '../../styles/profile-button-box.css'

const ProfileButtonBox = (props) => {
    const showHideClassName = props.boxState ? "box d-flex justify-content-end align-items-start" : "box display-none";
    const expanded = props.expanded ? 'expanded ': 'non-expanded '

    document.addEventListener('mouseup', function(e) {
        const container = document.getElementById('main');
        if (!container.contains(e.target)) {
            props.closeBox()
        }
    })

    function handleColumnOpening() {
        props.closeBox()
        props.showProfileColumn()
    }

    function handleSignOut() {
       window.location.href = '/'
    }

    return (
        <div className={expanded + showHideClassName}>
            <div  id='main'>
                <div id='profile-info' className="d-flex m-1 p-1">
                    <div id='box-profile-icon' className="d-flex align-items-center justify-content-center">
                        <div id='box-profile-icon-initial' className=""><h4 className="mb-0">{props.user_name[0]}</h4></div>
                    </div>
                    <div id='name' className="ml-2"><h6 className="fw-bold">{props.user_name}</h6></div>
                </div>
                <div id='profile-button' className="m-1 p-1"><h7 className="" onClick={handleColumnOpening}>Profile</h7></div>
                <div id='logout' className="m-1 p-1"><div id='profile-button' className=""><h7 onClick={handleSignOut} className="">Sign Out</h7></div></div>
            </div>
        </div>
    )
}

export default ProfileButtonBox