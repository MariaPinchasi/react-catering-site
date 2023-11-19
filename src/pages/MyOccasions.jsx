import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext';
import { getUser } from '../api/userApi';
import NewOccasion from '../components/NewOccasion';

const MyOccasions = () => {
    const { user } = useGlobalContext();
    const [occasions, setOccasions] = useState([]);

    const fetchMenus = async () => {
        const userData = await getUser(user.email);
        setOccasions(userData.occasions);
    }

    useEffect(() => {
        fetchMenus();
    }, [user]);


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