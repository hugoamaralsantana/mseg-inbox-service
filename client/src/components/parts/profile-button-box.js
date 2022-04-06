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

    return (
        <div className={expanded + showHideClassName}>
            <div  id='main'className="box-main">

            </div>
        </div>
    )
}

export default ProfileButtonBox