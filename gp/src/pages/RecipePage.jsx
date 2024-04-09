import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import InputRecipe from '../components/InputRecipe';
import RecipeList from '../components/RecipeList';


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
                <div className="header-container">
                    <h1>Recipe Page</h1>
                </div>
                <div className="content-container" style={{ display: 'flex', gap: '30px' }}>
                    <div className="left-section">
                        <RecipeList user={user}/>
                    </div>
                    <div className="right-section">
                        <InputRecipe user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipePage;