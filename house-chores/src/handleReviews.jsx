import Cookies from "js-cookie";


export function disableComment() {
    if (!Cookies.get('session_id')) {
       const comment =  document.querySelector("textarea")
       comment.setAttribute('disabled', '')
    }
}

export async function postReview(review, provider_id) {
    const session_id = Cookies.get('session_id')
    const data = {review}

    try{
        const response = await fetch(`http://localhost:5000/post_review/${session_id}/${provider_id}`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    if (!response.ok) throw Error(`Response Status: ${response.status}`);
    else {
        const data = response.json()
        return data
    }
    }catch (error) {
        console.log(error)
    }
}
