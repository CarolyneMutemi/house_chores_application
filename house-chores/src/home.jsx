import { Link } from "react-router-dom";

function Home() {
    return (
        <>
        <div className="home">
            <p className="about-text">Let us do your chores</p>
            <Link to="/services"><button className="services-button">Services</button></Link>
        </div>
        </>
    )
}

export default Home;
