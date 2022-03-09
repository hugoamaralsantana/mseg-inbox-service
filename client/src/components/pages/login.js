
import '../../styles/Login.css'


const Login = () => {
    return (
        <div className="login-background bg-primary">
            <div className="form-signin">
            <form className="wrapperLogin">
                <div className='login-logo-title d-flex mb-2'>
                    <img className="mt-1" src='/ukg_logo.svg' alt="UKG-LOGO" width={72} height={57} />
                    <h2 className='mt-3 ml-2 fw-bold text-primary'>Inbox</h2>
                </div>
                <h3 className="mb-3 fw-bold text-primary">Login</h3>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <a href="#" className="text-primary font-weight-bold mb-4 mt-2 text-decoration-none">Forgot Password</a>
                <a href="/landingPage"><button className="pl-4 pr-4 btn btn-med btn-primary rounded-pill" type="submit">Login</button></a>
            </form>     
            </div>
        </div>
    )
}

export default Login;
