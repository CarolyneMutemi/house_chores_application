
export default function SignIn() {
    return (
        <>
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
        </>
    )
}
