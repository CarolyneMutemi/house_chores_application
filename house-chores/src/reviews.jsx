import addCircle from "./assets/add-circle.svg"
import send from "./assets/send.svg"
import closeIcon from "./assets/close-circle.svg"
import { useNavigate } from "react-router-dom"


export default function Reviews() {
  const navigate = useNavigate()

  function close() {
    navigate(-1)
  }
    return (
        <>
        <div className="provider-reviews">
            <div className="align-reviews">
                <span class="icon-close" onClick={close}><img src={closeIcon} alt="close icon" /></span>
                <h3>Provider one reviews</h3>
                <div className="users-reviews">
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
                    </div>
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