import search from "./assets/search.svg"
import price from "./assets/pricetags.svg"
import chat from "./assets/chatbox.svg"
import call from "./assets/call.svg"
import addCircle from "./assets/add-circle.svg"
import ellipsis from "./assets/ellipsis-horizontal-circle.svg"
import checkMark from "./assets/checkmark-circle.svg"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"


export default function SpecificService() {
  const { serviceId } = useParams()
  const {service, setService} = useState('')

  useEffect(() => {
    fetch(`http://localhost:/5000/services/${serviceId}`)
    .then((data) => data.json())
    .then((service) => setService(service.name))
  }, [])

    return (
        <>
        <div className="specific-service">
            <h2>Doing dishes</h2>
            <span className="search-span">
              <input type="text" placeholder="Search a town..." id="search"/>
              <label htmlFor="search"><img src={search} className="search-icon"/></label>
            </span>
            <div className="service-providers">
              <section className="each-provider">
                <h5>Sharon Muthoni</h5>
                <div className="provider-data">
                  <p className="towns">Available in: <span className="towns-available">Kibwezi, Makindu, Kiboko</span></p>
                  <div className="service-data">
                    <Link to="/rates/1"><img src={price} className="provider-icons"/></Link>
                    <img src={chat} className="provider-icons"/>
                    <img src={call} className="provider-icons"/>
                    <img src={addCircle} className="provider-icons"/>
                    <img src={ellipsis} className="provider-icons toggle-add-status"/>
                    <img src={checkMark} className="provider-icons toggle-add-status"/>
                    <Link to="/reviews/1" className="provider-reviews">Reviews</Link>
                  </div>
                </div>
              </section>
              <section className="each-provider">
                <h5>Sharon Muthoni</h5>
                <div className="provider-data">
                  <p className="towns">Available in: <span className="towns-available">Kibwezi, Makindu, Kiboko, Kibwezi, Makindu, Kiboko, Kibwezi, Makindu, Kiboko</span></p>
                  <div className="service-data">
                    <Link to="/rates/1"><img src={price} className="provider-icons"/></Link>
                    <img src={chat} className="provider-icons"/>
                    <img src={call} className="provider-icons"/>
                    <img src={addCircle} className="provider-icons"/>
                    <img src={ellipsis} className="provider-icons toggle-add-status"/>
                    <img src={checkMark} className="provider-icons toggle-add-status"/>
                    <Link to="/reviews/1" className="provider-reviews">Reviews</Link>
                  </div>
                </div>
              </section>
              <section className="each-provider">
                <h5>Sharon Muthoni</h5>
                <div className="provider-data">
                  <p className="towns">Available in: <span className="towns-available">Kibwezi, Makindu, Kiboko</span></p>
                  <div className="service-data">
                    <Link to="/rates/1"><img src={price} className="provider-icons"/></Link>
                    <img src={chat} className="provider-icons"/>
                    <img src={call} className="provider-icons"/>
                    <img src={addCircle} className="provider-icons"/>
                    <img src={ellipsis} className="provider-icons toggle-add-status"/>
                    <img src={checkMark} className="provider-icons toggle-add-status"/>
                    <Link to="/reviews/1" className="provider-reviews">Reviews</Link>
                  </div>
                </div>
              </section>
              <section className="each-provider">
                <h5>Sharon Muthoni</h5>
                <div className="provider-data">
                  <p className="towns">Available in: <span className="towns-available">Kibwezi, Makindu, Kiboko</span></p>
                  <div className="service-data">
                    <Link to="/rates/1"><img src={price} className="provider-icons"/></Link>
                    <img src={chat} className="provider-icons"/>
                    <img src={call} className="provider-icons"/>
                    <img src={addCircle} className="provider-icons"/>
                    <img src={ellipsis} className="provider-icons toggle-add-status"/>
                    <img src={checkMark} className="provider-icons toggle-add-status"/>
                    <Link to="/reviews/1" className="provider-reviews">Reviews</Link>
                  </div>
                </div>
              </section>
              <section className="each-provider">
                <h5>Sharon Muthoni</h5>
                <div className="provider-data">
                  <p className="towns">Available in: <span className="towns-available">Kibwezi, Makindu, Kiboko</span></p>
                  <div className="service-data">
                    <Link to="/rates/1"><img src={price} className="provider-icons"/></Link>
                    <img src={chat} className="provider-icons"/>
                    <img src={call} className="provider-icons"/>
                    <img src={addCircle} className="provider-icons"/>
                    <img src={ellipsis} className="provider-icons toggle-add-status"/>
                    <img src={checkMark} className="provider-icons toggle-add-status"/>
                    <Link to="/reviews/1" className="provider-reviews">Reviews</Link>
                  </div>
                </div>
              </section>
              <section className="each-provider">
                <h5>Sharon Muthoni</h5>
                <div className="provider-data">
                  <p className="towns">Available in: <span className="towns-available">Kibwezi, Makindu, Kiboko</span></p>
                  <div className="service-data">
                    <Link to="/rates/1"><img src={price} className="provider-icons"/></Link>
                    <img src={chat} className="provider-icons"/>
                    <img src={call} className="provider-icons"/>
                    <img src={addCircle} className="provider-icons"/>
                    <img src={ellipsis} className="provider-icons toggle-add-status"/>
                    <img src={checkMark} className="provider-icons toggle-add-status"/>
                    <Link to="/reviews/1" className="provider-reviews">Reviews</Link>
                  </div>
                </div>
              </section>
              <section className="each-provider">
                <h5>Sharon Muthoni</h5>
                <div className="provider-data">
                  <p className="towns">Available in: <span className="towns-available">Kibwezi, Makindu, Kiboko</span></p>
                  <div className="service-data">
                    <Link to="/rates/1"><img src={price} className="provider-icons"/></Link>
                    <img src={chat} className="provider-icons"/>
                    <img src={call} className="provider-icons"/>
                    <img src={addCircle} className="provider-icons"/>
                    <img src={ellipsis} className="provider-icons toggle-add-status"/>
                    <img src={checkMark} className="provider-icons toggle-add-status"/>
                    <Link to="/reviews/1" className="provider-reviews">Reviews</Link>
                  </div>
                </div>
              </section>
              <section className="each-provider">
                <h5>Sharon Muthoni</h5>
                <div className="provider-data">
                  <p className="towns">Available in: <span className="towns-available">Kibwezi, Makindu, Kiboko</span></p>
                  <div className="service-data">
                    <Link to="/rates/1"><img src={price} className="provider-icons"/></Link>
                    <img src={chat} className="provider-icons"/>
                    <img src={call} className="provider-icons"/>
                    <img src={addCircle} className="provider-icons"/>
                    <img src={ellipsis} className="provider-icons toggle-add-status"/>
                    <img src={checkMark} className="provider-icons toggle-add-status"/>
                    <Link to="/reviews/1" className="provider-reviews">Reviews</Link>
                  </div>
                </div>
              </section>
              <section className="each-provider">
                <h5>Sharon Muthoni</h5>
                <div className="provider-data">
                  <p className="towns">Available in: <span className="towns-available">Kibwezi, Makindu, Kiboko</span></p>
                  <div className="service-data">
                    <Link to="/rates/1"><img src={price} className="provider-icons"/></Link>
                    <img src={chat} className="provider-icons"/>
                    <img src={call} className="provider-icons"/>
                    <img src={addCircle} className="provider-icons"/>
                    <img src={ellipsis} className="provider-icons toggle-add-status"/>
                    <img src={checkMark} className="provider-icons toggle-add-status"/>
                    <Link to="/reviews/1" className="provider-reviews">Reviews</Link>
                  </div>
                </div>
              </section>
              <section className="each-provider">
                <h5>Sharon Muthoni</h5>
                <div className="provider-data">
                  <p className="towns">Available in: <span className="towns-available">Kibwezi, Makindu, Kiboko</span></p>
                  <div className="service-data">
                    <Link to="/rates/1"><img src={price} className="provider-icons"/></Link>
                    <img src={chat} className="provider-icons"/>
                    <img src={call} className="provider-icons"/>
                    <img src={addCircle} className="provider-icons"/>
                    <img src={ellipsis} className="provider-icons toggle-add-status"/>
                    <img src={checkMark} className="provider-icons toggle-add-status"/>
                    <Link to="/reviews/1" className="provider-reviews">Reviews</Link>
                  </div>
                </div>
              </section>
            </div>
        </div>
        </>
    )
}