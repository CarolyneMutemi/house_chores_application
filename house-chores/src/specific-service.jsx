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
  const [service, setService] = useState('')

  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState()
  const [providers, setProviders] = useState()

  useEffect(() => {
    fetch(`http://localhost:5000/services/${serviceId}`)
    .then(res => res.json())
    .then(data => setService(data.name))
    .catch((error) => {
      setService('')
      console.log(error.message)
    })

    fetch(`http://localhost:5000/providers/${serviceId}`)
    .then(res => res.json())
    .then(data => setProviders(data))
    .catch(error => setError(error))
    .finally(setIsLoading(false))
  }, [])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
      <>
      <div className="specific-service">
          <h2>{service}</h2>
          <span className="search-span">
            <input type="text" placeholder="Search a town..." id="search"/>
            <label htmlFor="search"><img src={search} className="search-icon"/></label>
          </span>
          <div className="service-providers">
          {providers && providers.map((provider) => (
            <section className="each-provider" key={provider.id}>
              <h5>{provider.name}</h5>
              <div className="provider-data">
                <p className="towns">Available in: <span className="towns-available">{provider.location.join(', ')}</span></p>
                <div className="service-data">
                  <Link to={`/rates/${provider.id}`} state={{provider, service}}><img src={price} className="provider-icons"/></Link>
                  <img src={chat} className="provider-icons"/>
                  <img src={call} className="provider-icons"/>
                  <img src={addCircle} className="provider-icons"/>
                  <img src={ellipsis} className="provider-icons toggle-add-status"/>
                  <img src={checkMark} className="provider-icons toggle-add-status"/>
                  <Link to={`/reviews/${provider.id}`} state={provider} className="provider-reviews">Reviews</Link>
                </div>
              </div>
            </section>
          ))}
          </div>
      </div>
      </>
  )
}