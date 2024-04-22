import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import InputIngredient from '../components/InputIngredient';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PantryList from '../components/PantryList';



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
                <div className="header-container">
                    <h1>Ingredient Page</h1>
                </div>
                <p style={{ marginTop: '0' }}>View and update the ingredients in your pantry</p>
                <PantryList user={user} />
                <InputIngredient user={user}/>  
            </div>      
        </div>
    );
};

export default IngredientPage;