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
    .then(data => setServices(data))
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
                {
                  services && services.map((service) => <Link to={`/services/${service.id}`} state={service.name} key={service.id}><button>{service.name}</button></Link>)
                }
              </div>
            </div>
        </div>
        </>
    )
}