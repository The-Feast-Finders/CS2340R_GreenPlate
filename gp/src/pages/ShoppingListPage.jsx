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
                <p style={{ margingTop: '0' }}>Keep track of your groceries by viewing and updating your shopping list</p>
                <div className="content-container" style={{ display: 'flex', gap: '10px'}}>
                    <div className="left-section">
                        <ShoppingList user={user} />
                    </div>
                    <div className="right-section">
                        <InputShop user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingListPage;