import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/custom.scss'
import '../../styles/navbar.css'


const NavBar = (props) => {
    const pageTitle = props.title
    return(
        <nav id="navbar" className="navbar navbar-light bg-secondary d-flex align-items-center justify-content-between">
            <div className='brand d-flex align-items-center'>
                <a href="/landingPage"><img className="col-sm-auto" id="ukg-icon" src='/ukg_logo_white.svg' alt="settings-outline" width={45} height={25} /> </a>
                <a href="/landingPage"> <h1 id="page-title" className="col-sm-auto">Inbox - {pageTitle}</h1></a>
            </div>
            <div id="navbarSupportedContent d-flex justify-content-md-end align-items-center">
                <div class="d-flex justify-content-md-end align-items-center">
                    <form className="form col-md-auto" height={150}>
                        <input id="search-bar" type="search" placeholder="Search" aria-label="Search"></input>
                    </form>
                    <img className="col-md-auto" id="settings-icon" src='/icons/settings-outline.svg' alt="settings-icon" width={45} height={45} />
                    <img className="col-md-auto" id="profile-icon" src='/icons/person-circle-outline.svg' alt="person-circle-outline" width={45} height={45} />
                </div>
            </div>
        </nav>

    )
};

export default NavBar;