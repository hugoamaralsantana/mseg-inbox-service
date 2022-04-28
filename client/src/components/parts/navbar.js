import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../../styles/custom.scss'
import '../../styles/navbar.css'



const NavBar = (props) => {
    const pageTitle = props.title
    const userData = JSON.parse(localStorage.getItem('userData'));
    function handleFilter() {
        props.filterData(document.getElementById('search-bar').value)
    }
    return(
        <nav id="navbar" className="navbar navbar-light bg-secondary d-flex align-items-center justify-content-between">
            <div className='brand d-flex align-items-center'>
                <a href='/landingPage'><img className="brand-part" id="ukg-icon" src='/ukg_logo_white.svg' alt="settings-outline" width={80} height={50} /></a>
                <h1 id="inbox-title" className="brand-part">Inbox -</h1>
                <h1 id="page-title" className="brand-part">{pageTitle}</h1>
                <form className="form brand-part" height={150}>
                        <input id="search-bar" type="search" placeholder={"Search " + pageTitle} onKeyUp={handleFilter} aria-label="Search"></input>
                </form>
            </div>
            <div class="navbarSupportedContent">
                <div class="d-flex justify-content-md-end align-items-center">
                    <p className="mt-auto mb-auto mr-2 text-white">User Type: {userData.user_type}</p>
                    <img onClick={props.showBox} className="col-md-auto mr-3" id="profile-icon" src='/icons/person-circle-outline.svg' alt="person-circle-outline" width={45} height={45} />
                </div>
            </div>
        </nav>

    )
};

export default NavBar;