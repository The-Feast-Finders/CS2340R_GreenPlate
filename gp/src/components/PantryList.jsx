import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

const PantryList = ({ user }) => {
    const [pantryItems, setPantryItems] = useState([]);
    const db = getFirestore();

    const fetchPantryItems = async () => {
        if (user) {
            // Reference to the 'ingredients' sub-collection in the user's document
            const pantryRef = collection(db, 'pantry', user.uid, 'ingredients');

            try {
                const querySnapshot = await getDocs(pantryRef);
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPantryItems(items);
            } catch (error) {
                console.error("Error fetching pantry items: ", error);
                // Handle the error appropriately
            }
        }
    };

    useEffect(() => {
        fetchPantryItems();
    }, [user]); // Dependency array ensures this runs when 'user' changes

    return (
        <div>
            <h2>Your Pantry Items</h2>
            <ul>
                {pantryItems.map(item => (
                    <li key={item.id}>{item.ingredient} --- {item.quantity} --- {item.calories} --- {item.expDate?.toDate().toLocaleDateString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default PantryList;
