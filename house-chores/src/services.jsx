import { Link } from "react-router-dom"
import closeIcon from './assets/close-circle.svg'
import worker from "./assets/Worker_minion.png"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Services() {
  const navigate = useNavigate()
  const [services, setServices] = useState(null)


  useEffect(() => {
    fetch('http://localhost:5000/services')
    .then(res => res.json())
    .then(data => console.log(data))
  }, [])

  function close() {
    navigate(-1)
  }
    return (
        <>
        <div className="bigger-align-center">
            <div className="services-section">
              <span className="icon-close" onClick={close}><img src={closeIcon} alt="close icon"/></span>
              <img src={worker} alt="Minion at work." className="worker-minion"/>
              <h3>Services</h3>
              <div className="scroll-services">
                <Link to='/services/1'><button>Doing dishes</button></Link>
                <Link to='/services/2'><button>Full house clean-up</button></Link>
                <Link to='/services/3'><button>Item pick-up</button></Link>
                <Link to='/services/4'><button>Pet sitting</button></Link>
                <Link to='/services/5'><button>Elderly/Invalid sitting</button></Link>
                <Link to='/services/6'><button>Baby sitting</button></Link>
                <Link to='/services/7'><button>Party catering</button></Link>
                <Link to='/services/8'><button>Food preparation</button></Link>
                <Link to='/services/9'><button>Kitchen clean-up</button></Link>
                <Link to='/services/10'><button>Laundry clean-up</button></Link>
              </div>
            </div>
        </div>
        </>
    )
}