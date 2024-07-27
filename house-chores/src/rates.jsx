import closeIcon from './assets/close-circle.svg'
import banana from "./assets/banana-rates.png"
import { useLocation, useNavigate } from 'react-router-dom'


export default function Rates() {
  const location = useLocation()
  const {provider, service} = location.state

  const navigate = useNavigate()
  function close() {
    navigate(-1)
  }

    return (
        <>
        <div className="align-rates">
            <div className="rates-pop-up">
              <span className="icon-close" onClick={close}><img src={closeIcon} alt="close icon" /></span>
              <img src={banana} alt="Minion hugging bananas." className="minion-rates"/>
              <h3>{provider.name}'s Rates</h3>
              <div className="scroll-rates">
                {service in provider.services && Object.entries(provider.services[service]).map(([key, value]) => 
                    <div className="rate-category" key={key}>
                      <h4>{key}</h4>
                      <p>{value}</p>
                    </div>
                  )
                }
              </div>
            </div>
        </div>
        </>
    )
}