import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import InputShop from '../components/InputShop';
import ShoppingList from '../components/ShoppingList';

const ShoppingListPage = () => {


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
                <div>
                    <h1 style={{ marginBottom: '0' }}>Shopping List</h1>
                </div>
                <InputShop user={user} />
                <ShoppingList user={user} />
            </div>
        </div>
    );
};

export default ShoppingListPage;