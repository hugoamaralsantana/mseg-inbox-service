import React, { Component } from 'react'
import '../../styles/Login.css'

export default class login extends Component {
    render() {
        return (
        <div className="login-background primaryColorBackground">
            <div className="form-signin">
            <form className="wrapperLogin">
                <div className='login-logo-title d-flex mb-2'>
                    <img className="mt-1" src='/ukg_logo.svg' alt="UKG-LOGO" width={72} height={57} />
                    <h2 className='mt-3 ml-2 fw-bold primaryColorText'>Inbox</h2>
                </div>
                <h3 className="mb-3 fw-bold primaryColorText">Login</h3>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <a href="#" className="primaryColorText font-weight-bold mb-4 mt-2 text-decoration-none">Forgot Password</a>
                <button className="pl-4 pr-4 btn btn-med btn-primary rounded-pill" type="submit">Login</button>
            </form>     
            </div>
        </div>
        )
    }
}
