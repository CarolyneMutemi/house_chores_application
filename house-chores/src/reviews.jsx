import addCircle from "./assets/add-circle.svg"
import send from "./assets/send.svg"
import closeIcon from "./assets/close-circle.svg"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { disableComment, postReview } from "./handleReviews"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"


export default function Reviews() {
  const {providerId} = useParams()
  const [provider, setProvider] = useState(JSON.parse(sessionStorage.getItem(`provider_${providerId}`)))

  const [reviews, setReviews] = useState(provider.reviews)
  const [comment, setComment] = useState('')
  
  const navigate = useNavigate()


  useEffect(() => {
    disableComment()
  })

  async function handleSendComment(data, provider_id) {
    if (data.trim().length){
    const provider = await postReview(data, provider_id)
    sessionStorage.setItem(`provider_${providerId}`, JSON.stringify(provider))
    setProvider(provider)
    setReviews(provider.reviews)
    setComment('')}
  }


  function close() {
    navigate(-1)
  }
    return (
        <>
        <div className="provider-reviews">
            <div className="align-reviews">
                <span className="icon-close" onClick={close}><img src={closeIcon} alt="close icon" /></span>
                <h3>{provider.name}'s reviews</h3>
                <div className="users-reviews">
                  {
                    reviews.map((review, index) => 
                      <div className="user-review" key={index}>
                      <h4>{review.client_name}</h4>
                      <p>{review.review}</p>
                    </div>)
                  }
                </div>
                <div className="add-review">
                  <label htmlFor="comment"><img src={addCircle} className="add-comment-icon" title="Add comment." onClick={Cookies.get('session_id') ? null : () => toast('Log in to add a comment')}/></label>
                  <textarea id="comment" rows="1" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                  <img src={send} className="send-comment-icon" title="Send comment." onClick={Cookies.get('session_id') ? async () => await handleSendComment(comment, provider.id) : () => toast('Log in to add a comment')}/>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
        </div>
        </>
    )
}