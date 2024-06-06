import search from "./assets/search.svg"
import price from "./assets/pricetags.svg"
import chat from "./assets/chatbox.svg"
import call from "./assets/call.svg"
import addCircle from "./assets/add-circle.svg"
import ellipsis from "./assets/ellipsis-horizontal-circle.svg"
import checkMark from "./assets/checkmark-circle.svg"
import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { requestSend, simulateAcceptedRequest, addChore } from "./handleChores"
import Cookies from "js-cookie"
import Swal from 'sweetalert2'

export default function SpecificService() {
  const { serviceId } = useParams()
  const [service, setService] = useState('')

  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState()
  const [providers, setProviders] = useState()
  const [providerId, setProviderId] = useState('')
  const [trackRequests, setTrackRequests] = useState({})

  const session_id = Cookies.get('session_id')
  let obj = {}

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


  async function sendRequest(service, provider_name, provider_id) {
    setProviderId(provider_id)
    const {isPending, isConfirmed} = await requestSend(service, provider_name)
    obj[provider_id] = {isPending, isConfirmed}
    if (isPending){
      setTrackRequests({...obj})
      const isConfirmed = await simulateAcceptedRequest(service, provider_name)
      const isPending = false
      obj[provider_id] = {isPending, isConfirmed}
      await addChore(session_id, serviceId, provider_id)
      setTrackRequests({...obj})
      setTimeout(() => {
        obj[provider_id] = {isPending, isConfirmed: !isConfirmed}
        setTrackRequests({...obj})
      }, 5000)
    }
  }

  useEffect(() => {
    const addButton =  document.getElementById(`add_${providerId}`)
    const pendingButton = document.getElementById(`pending_${providerId}`)
    const confirmButton = document.getElementById(`confirm_${providerId}`)

    if (addButton && pendingButton && confirmButton && trackRequests[providerId]) {
      const isPending = trackRequests[providerId].isPending
      const isConfirmed = trackRequests[providerId].isConfirmed
      if (!isPending && !isConfirmed) {
        addButton.classList.remove('toggle-add-status')
        pendingButton.classList.add('toggle-add-status')
        confirmButton.classList.add('toggle-add-status')
      } else if (isPending) {
        addButton.classList.add('toggle-add-status')
        pendingButton.classList.remove('toggle-add-status')
        confirmButton.classList.add('toggle-add-status')
      } else if (isConfirmed) {
        addButton.classList.add('toggle-add-status')
        pendingButton.classList.add('toggle-add-status')
        confirmButton.classList.remove('toggle-add-status')
      }
    }
  })

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
                  <img src={addCircle} className="provider-icons" onClick={Cookies.get('session_id') ? async () => await sendRequest(service, provider.name, provider.id) : () => {Swal.fire("Log in to book a service!")}} id={`add_${provider.id}`}/>
                  <img src={ellipsis} className="provider-icons toggle-add-status" id={`pending_${provider.id}`}/>
                  <img src={checkMark} className="provider-icons toggle-add-status" id={`confirm_${provider.id}`}/>
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