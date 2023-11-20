import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../hooks/useGlobalContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useGlobalContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user || !user?.isAdmin) {
            navigate('/');
        }
    }, [navigate, user])
    return children;

};

export default ProtectedRoute;
