import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

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
            }
        }
    };

    useEffect(() => {
        fetchPantryItems();
    }, [user]); // Dependency array ensures this runs when 'user' changes


    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            // Delete the item if the quantity is zero or negative
            await deleteDoc(doc(db, `pantry/${user.uid}/ingredients`, itemId));
        } else {
            // Update the item with the new quantity
            await updateDoc(doc(db, `pantry/${user.uid}/ingredients`, itemId), { quantity: newQuantity });
        }
        fetchPantryItems(); // Refresh the list after update
    };

    const handleIncrement = (itemId, currentQuantity) => {
        updateQuantity(itemId, currentQuantity + 1);
    };

    const handleDecrement = (itemId, currentQuantity) => {
        updateQuantity(itemId, currentQuantity - 1);
    };

    return (
        <div>
            <h2>Your Pantry Items</h2>
            <ul style={{ overflowY: 'auto', maxHeight: '500px', width: '500px', textAlign: 'left' }}>
                {pantryItems.map(item => (
                    <li key={item.id}>
                        {item.ingredient} . . . {item.quantity} . . . {item.calories} calories
                        {item.expDate && ` . . . ${item.expDate.toDate().toLocaleDateString()}`}
                        <button style={{paddingLeft: '13px', paddingRight: '13px', marginLeft: '5px', marginRight: '5px'}} onClick={() => handleIncrement(item.id, item.quantity)}>+</button>
                        <button style={{paddingLeft: '15px', paddingRight: '15px', marginLeft: '5px', marginRight: '5px'}} onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PantryList;
