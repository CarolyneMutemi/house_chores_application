import closeIcon from './assets/close-circle.svg'
import mailIcon from "./assets/mail.svg"
import closeEye from "./assets/eye-off.svg"
import openEye from "./assets/eye.svg"
import happy from "./assets/minion_icon.png"
import { Link, useNavigate, useLocation } from 'react-router-dom'


export default function SignIn() {
  const navigate = useNavigate()

  function togglePassword() {
    let showPassword = document.getElementById('login-show')
    let hidePassword = document.getElementById('login-hide');
    let password = document.getElementById('password');
    if (password.type === 'password'){
      password.type = 'text';
      hidePassword.classList.add('hide')
      showPassword.classList.remove('hide')
    } else {
      password.type = 'password'
      hidePassword.classList.remove('hide')
      showPassword.classList.add('hide')
    }
  }

  function close() {
    navigate(-1)
  }

    return (
        <>
        <div className="align-center">
            <div className="log-in">
              <img src={happy} alt="Happy minion." className="minion"/>
              <span className="icon-close" onClick={close}><img src={closeIcon} alt="close icon" /></span>
              <form action="#" method="POST">
                <h4 className="welcome-back-text">Welcome back :)</h4>
                <input type="email" placeholder="Email" minLength="5"  className="username" id="email" required/>
                <label htmlFor="email"><img src={mailIcon} className="email-icon"/></label><br/>
                <input type="password" placeholder="Password" minLength="5" className="password" id="password" required/>
                <label><img src={closeEye} className="hidden-password" id='login-show' onClick={togglePassword}/></label>
                <label><img src={openEye} className="clear-password hide" id='login-hide' onClick={togglePassword}/></label><br/>
                <div className="user-options">
                  <Link to='/register' replace >Don't have an account?</Link>
                  <a href="#">Forgot password?</a>
                </div>
              </form>
              <button className="log-in-button">Log in</button>
            </div>
            </div>
        </>
    )
}
