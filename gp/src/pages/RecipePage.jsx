import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const RecipePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        // Took out unsubscribe
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <NavigationBar />
            <div className='frame'>
                <h1>Recipe Page</h1>
                <p>Welcome to the Recipe Page!</p>
            </div>
        </div>
    );
};

export default RecipePage;