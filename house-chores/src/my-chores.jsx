import { useEffect, useState } from "react"
import { getMyChores } from "./usePost"

export default function MyChores() {

    const [myChores, setMyChores] = useState([])

    async function getChores () {
        const chores = await  getMyChores()
        setMyChores(chores)
    }

    useEffect(() => {
        getChores()
    }, [])

    return (
        <>
        <div className="my-chores">
            <h3>My chores</h3>
            {myChores.map((chore) => 
                <p key={chore.id}><strong>{chore.service}</strong> by <strong>{chore.provider_name}</strong> on <i>{chore.date}</i></p>
            )}
        </div>
        </>
    )
}