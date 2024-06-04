import addCircle from "./assets/add-circle.svg"
import send from "./assets/send.svg"
import closeIcon from "./assets/close-circle.svg"
import { useLocation, useNavigate } from "react-router-dom"


export default function Reviews() {
  const location = useLocation()
  const provider = location.state
  const reviews = provider.reviews
  
  const navigate = useNavigate()

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
                    {/* <div className="user-review">
                      <h4>Ted Shmosby</h4>
                      <p>Provider one is good. They are quite good at their job.</p>
                    </div>
                    <div className="user-review">
                      <h4>Ted Shmosby</h4>
                      <p>Provider one is good. They are quite good at their job.</p>
                    </div>
                    <div className="user-review">
                      <h4>Ted Shmosby</h4>
                      <p>Provider one is good. They are quite good at their job.</p>
                    </div>
                    <div className="user-review">
                      <h4>Ted Shmosby</h4>
                      <p>Provider one is good. They are quite good at their job.</p>
                    </div>
                    <div className="user-review">
                      <h4>Ted Shmosby</h4>
                      <p>Provider one is good. They are quite good at their job.</p>
                    </div>
                    <div className="user-review">
                      <h4>Ted Shmosby</h4>
                      <p>Provider one is good. They are quite good at their job.</p>
                    </div>
                    <div className="user-review">
                      <h4>Ted Shmosby</h4>
                      <p>Provider one is good. They are quite good at their job.</p>
                    </div>
                    <div className="user-review">
                      <h4>Ted Shmosby</h4>
                      <p>Provider one is good. They are quite good at their job.</p>
                    </div>
                    <div className="user-review">
                      <h4>Ted Shmosby</h4>
                      <p>Provider one is good. They are quite good at their job.Provider one is good. They are quite good at their job.Provider one is good. They are quite good at their job.Provider one is good. They are quite good at their job.Provider one is good. They are quite good at their job.</p>
                    </div>
                    <div className="user-review">
                      <h4>Ted Shmosby</h4>
                      <p>Provider one is good. They are quite good at their job.</p>
                    </div>
                    <div className="user-review">
                      <h4>Ted Shmosby</h4>
                      <p>Provider one is good. They are quite good at their job.</p>
                    </div> */}
                </div>
                <div className="add-review">
                  <label htmlFor="comment"><img src={addCircle} className="add-comment-icon"/></label>
                  <textarea id="comment" rows="1" placeholder="Add a comment..."></textarea>
                  <img src={send} className="send-comment-icon"/>
                </div>
            </div>
        </div>
        </>
    )
}