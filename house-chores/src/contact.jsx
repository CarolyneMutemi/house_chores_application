import { useLocation, useNavigate } from "react-router-dom"
import closeIcon from "./assets/close-circle.svg";
import mailIcon from "./assets/mail.svg"
import callIcon from "./assets/call.svg"
import phoneMinion from "./assets/minion_on_phone.png"
import whatsAppIcon from "./assets/logo-whatsapp.svg"


export default function Contact() {
    const navigate = useNavigate()
    const location = useLocation()
    const provider = location.state

    function close() {
        navigate(-1)
      }

    return (
        <>
        <div className="align-contact">
            <div className="contact-info">
              <span className="icon-close" onClick={close}><img src={closeIcon} alt="close icon"/></span>
              <img src={phoneMinion} className="phone-minion" alt="minion with banana phone"/>
              <h4>{provider.name} contact info!</h4>
              <span className="contact">
                <img src={callIcon} className="contact-icons"/>
                <p><a href={`tel:${provider.contact.phone}`}>{provider.contact.phone}</a></p>
              </span>
              <span className="contact">
                <img src={whatsAppIcon} className="contact-icons"/>
                <p><a href={`https://wa.me/${provider.contact.whatsApp}`} target="_blank">{provider.contact.whatsApp}</a></p>
              </span>
              <span className="contact">
                <img src={mailIcon} className="contact-icons"/>
                <p><a href={`mailto:${provider.contact.email}`}>{provider.contact.email}</a></p>
              </span>
            </div>
        </div>
        </>
    )
}
