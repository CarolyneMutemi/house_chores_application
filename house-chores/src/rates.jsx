import closeIcon from './assets/close-circle.svg'
import banana from "./assets/banana-rates.png"
import { useNavigate } from 'react-router-dom'


export default function Rates() {
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
              <h3>Sharon Muthoni's Rates</h3>
              <div className="scroll-rates">
                <div className="rate-category">
                  <h4>One bedroom</h4>
                  <p>8k - 10k </p>
                </div>
                <div className="rate-category">
                  <h4>One bedroom</h4>
                  <p>8k - 10k </p>
                </div>
                <div className="rate-category">
                  <h4>One bedroom</h4>
                  <p>8k - 10k </p>
                </div>
                <div className="rate-category">
                  <h4>One bedroom</h4>
                  <p>8k - 10k </p>
                </div>
                <div className="rate-category">
                  <h4>One bedroom</h4>
                  <p>8k - 10k </p>
                </div>
                <div className="rate-category">
                  <h4>One bedroom</h4>
                  <p>8k - 10k </p>
                </div>
                <div className="rate-category">
                  <h4>One bedroom</h4>
                  <p>8k - 10k </p>
                </div>
                <div className="rate-category">
                  <h4>One bedroom</h4>
                  <p>8k - 10k </p>
                </div>
              </div>
            </div>
        </div>
        </>
    )
}