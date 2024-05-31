
function Header() {
    return (
        <>
            <header>
                <div className="main-title">
                  <img src="main_minion.png" alt="minion dancing" className="main-icon"/>
                  <h1>PUMZIKA</h1>
                </div>
                <div className="not-logged-in">
                    <a>Log in</a>
                    <a>Sign up</a>
                </div>
                <div className="logged-in-user hide">
                  <h3>Hello Sharon Muthoni</h3>
                  <img src="hello.png" alt="minion saying hello" className="hello-icon"/>
                </div>
                <div className="logged-in hide">
                  <a className="not-home">Services</a>
                  <a>My chores</a>
                  <a>Log out</a>
                </div>
            </header>
        </>
    )

}

export default Header;
