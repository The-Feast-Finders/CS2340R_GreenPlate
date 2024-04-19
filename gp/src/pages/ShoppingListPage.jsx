import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import InputShop from '../components/InputShop';

const ShoppingList = () => {


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
                <h1>Shopping List</h1>
                <p>Welcome to the Shopping List</p>
                <InputShop user={user} />
            </div>
        </div>
    );
};

export default ShoppingList;