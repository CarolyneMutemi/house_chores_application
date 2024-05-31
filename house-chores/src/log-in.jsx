export default function Login() {
    return (
        <>
        <div className="align-center">
            <div className="log-in">
              <img src="minion_icon.png" alt="Happy minion." className="minion"/>
              <span className="icon-close"><img src="close-circle.svg" alt="close icon" /></span>
              <form action="#" method="POST">
                <h4 className="welcome-back-text">Welcome back :)</h4>
                <input type="email" placeholder="Email" minlength="5"  className="username" id="email" required/>
                <label for="email"><img src="mail.svg" className="email-icon"/></label><br/>
                <input type="password" placeholder="Password" minlength="5" className="password" id="password" required/>
                <label><img src="eye-off.svg" className="hidden-password"/></label>
                <label><img src="eye.svg" className="clear-password hide"/></label><br/>
                <div className="user-options">
                  <a href="#">Don't have an account?</a>
                  <a href="#">Forgot password?</a>
                </div>
                <input type="submit" value="Log in" className="log-in-button" />
              </form>
            </div>
            <div className="register">
            <img src="signup_minion.png" alt="Minion with a book." className="minion"/>
              <span className="icon-close"><img src="close-circle.svg" alt="close icon"/></span>
              <form action="#" method="POST">
                <h4 className="Signup-text">You speak Minionese? Pwede na?</h4>
                <input type="text" placeholder="First name" className="firstname" required /><br/>
                <input type="text" placeholder="Last name" className="lastname" required /><br/>
                <input type="email" placeholder="Email" minlength="5"  className="username" id="new-email" required/>
                <label for="new-email"><img src="mail.svg" className="email-icon"/></label><br/>
                <input type="password" placeholder="Password" minlength="5" className="password" id="new-password" required/>
                <label><img src="eye-off.svg" className="hidden-password"/></label>
                <label><img src="eye.svg" className="clear-password hide"/></label><br/>
                <p className="back-to-login"><a href="#">Have an account?</a></p><br/>
                <input type="submit" value="Sign up" className="sign-up-button" />
              </form>
            </div>
            
        </div>
        </>
    )
}