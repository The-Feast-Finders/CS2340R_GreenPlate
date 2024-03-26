import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import InputIngredient from '../components/InputIngredient';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



const IngredientPage = () => {

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
                <h1>Ingredient Page</h1>
                <p>Welcome to the Ingredient Page!</p>
            </div>
            <InputIngredient user={user}/>        
        </div>
    );
};

export default IngredientPage;