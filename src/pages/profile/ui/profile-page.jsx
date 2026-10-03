import { useSession } from '@/entities/session'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export function ProfilePage () {
    const { user, userId, logout } = useSession()
    // useEffect(() => {
    //     console.log(user)
    // })
    const navigate = useNavigate()
    return (
        <main>
            <h1>Profile Page</h1>
            <p>Id: {userId}</p>
            <p>Name: {user?.full_name}</p>
            <p>Email: {user?.email}</p>
            <button onClick={() => logout(navigate)}>Logout</button>
        </main>
    )
}
