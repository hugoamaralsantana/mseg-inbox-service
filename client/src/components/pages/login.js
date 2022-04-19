
import '../../styles/Login.css'
import axios from "axios";

const Login = () => {

    const handleLogin = async(e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (email === '' || password === '') {
            alert('Please complete all user fields before logging in.')
            return
        }
        await axios.post('http://localhost:8082/users/login', {
            email: email,
            password: password
        })
        .then(response => {
          if (!response.data) {
            alert('Error logging in. No user found.')
            // reset input fields
            document.getElementById('email').value = ''
            document.getElementById('password').value = ''
            return
          }
          console.log(response.data)
          // save user data in local storage
          localStorage.setItem("userData", JSON.stringify(response));
          // route to assigned training page for now
          window.location.href = '/assignedTraining'
        })
        .catch(err => {
            console.log(err);
        })
    }

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
                    <input id="email" type="email" className="form-control" placeholder="name@example.com" />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                    <input id="password"  type="password" className="form-control" placeholder="Password" />
                    <label id="password" htmlFor="password">Password</label>
                </div>
                <a href="#" className="text-primary font-weight-bold mb-4 mt-2 text-decoration-none">Forgot Password</a>
                <a id="login" onClick={handleLogin}><button className="pl-4 pr-4 btn btn-med btn-primary rounded-pill">Login</button></a>
            </form>     
            </div>
        </div>
    )
}

export default Login;
