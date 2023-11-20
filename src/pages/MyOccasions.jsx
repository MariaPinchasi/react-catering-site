import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext';
import { getUser } from '../api/userApi';
import NewOccasion from '../components/NewOccasion';



const MyOccasions = () => {
    const { user } = useGlobalContext();
    const [occasions, setOccasions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = async () => {
        const userData = await getUser(user.email);
        setOccasions(userData.occasions);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchUsers();
    }, [user]);

    if (isLoading) {
        return <div className='message'>Loading...</div>
    }
    return (
        <main className=' occasions-list'>
            <h1>My Occasions</h1>
            <div className='occasions-container'>
                {occasions.map(occasion => {
                    return (
                        <NewOccasion {...occasion} isAdmin={user.isAdmin} key={occasion.id} />
                    )
                })}
            </div>
        </main>
    )
}

export default MyOccasions