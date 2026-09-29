import { useSession } from '@/entities/session'
import { useEffect } from 'react'


export function ProfilePage () {
    const { user, userId, logout } = useSession()
    // useEffect(() => {
    //     console.log(user)
    // })
    return (
        <main>
            <h1>Profile Page</h1>
            <p>Id: {userId}</p>
            <p>Name: {user?.user_name}</p>
            <p>Email: {user?.user_email}</p>
            <button onClick={() => logout()}>Logout</button>
        </main>
    )
}
