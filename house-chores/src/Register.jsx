import bookMinion from './assets/signup_minion.png';
import closeIcon from "./assets/close-circle.svg";
import mailIcon from "./assets/mail.svg"
import closeEye from "./assets/eye-off.svg"
import openEye from "./assets/eye.svg"
import { useNavigate, useLocation } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate()

  function close() {
    navigate(-1)
  }
    return (
        <>
        <div className="align-center">
            <div className="register">
                <img src={bookMinion} alt="Minion with a book." className="minion"/>
              <span className="icon-close" onClick={close}><img src={closeIcon} alt="close icon"/></span>
              <form action="#" method="POST">
                <h4 className="Signup-text">You speak Minionese? Pwede na?</h4>
                <input type="text" placeholder="First name" className="firstname" required /><br/>
                <input type="text" placeholder="Last name" className="lastname" required /><br/>
                <input type="email" placeholder="Email" minLength="5"  className="username" id="new-email" required/>
                <label htmlFor="new-email"><img src={mailIcon} className="email-icon"/></label><br/>
                <input type="password" placeholder="Password" minLength="5" className="password" id="new-password" required/>
                <label><img src={closeEye} className="hidden-password hide"/></label>
                <label><img src={openEye} className="clear-password"/></label><br/>
                <p className="back-to-login"><a href="#">Have an account?</a></p><br/>
                <input type="submit" value="Sign up" className="sign-up-button" />
              </form>
            </div>
            </div>
        </>
    )
}