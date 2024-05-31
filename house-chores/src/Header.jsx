
function Header() {
    return (
        <>
            <header>
                <div class="main-title">
                  <img src="main_minion.png" alt="minion dancing" class="main-icon"/>
                  <h1>PUMZIKA</h1>
                </div>
                <div class="not-logged-in">
                    <a>Log in</a>
                    <a>Sign up</a>
                </div>
                <div class="logged-in-user hide">
                  <h3>Hello Sharon Muthoni</h3>
                  <img src="hello.png" alt="minion saying hello" class="hello-icon"/>
                </div>
                <div class="logged-in hide">
                  <a class="not-home">Services</a>
                  <a>My chores</a>
                  <a>Log out</a>
                </div>
            </header>
        </>
    )

}

export default Header;
