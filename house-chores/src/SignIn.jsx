import closeIcon from './assets/close-circle.svg'
import mailIcon from "./assets/mail.svg"
import closeEye from "./assets/eye-off.svg"
import openEye from "./assets/eye.svg"
import happy from "./assets/minion_icon.png"
import { Link, useNavigate, useLocation } from 'react-router-dom'


export default function SignIn() {
  const navigate = useNavigate()

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
                <label><img src={closeEye} className="hidden-password hide"/></label>
                <label><img src={openEye} className="clear-password"/></label><br/>
                <div className="user-options">
                  <a href="#">Don't have an account?</a>
                  <a href="#">Forgot password?</a>
                </div>
                <input type="submit" value="Log in" className="log-in-button" />
              </form>
            </div>
            </div>
        </>
    )
}
