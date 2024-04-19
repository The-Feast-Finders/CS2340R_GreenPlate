import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const ShoppingList = ({ user }) => {
    const [shoppingItems, setShoppingItems] = useState([]);
    const db = getFirestore();

    const fetchShoppingItems = async () => {
        if (user) {
            // Reference to the 'ingredients' sub-collection in the user's document
            const shoppingRef = collection(db, 'shoppingList', user.uid, 'ingredients');

            try {
                const querySnapshot = await getDocs(shoppingRef);
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setShoppingItems(items);
            } catch (error) {
                console.error("Error fetching shopping items: ", error);
            }
        }
    };

    useEffect(() => {
        fetchShoppingItems();
    }, [user]); // Dependency array ensures this runs when 'user' changes

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            // Delete the item if the quantity is zero or negative
            await deleteDoc(doc(db, `shoppingList/${user.uid}/ingredients`, itemId));
        } else {
            // Update the item with the new quantity
            await updateDoc(doc(db, `shoppingList/${user.uid}/ingredients`, itemId), { quantity: newQuantity });
        }
        fetchShoppingItems(); // Refresh the list after update
    };

    const handleIncrement = (itemId, currentQuantity) => {
        updateQuantity(itemId, currentQuantity + 1);
    };

    const handleDecrement = (itemId, currentQuantity) => {
        updateQuantity(itemId, currentQuantity - 1);
    };

    return (
        <div>
            <h2>Your Shopping List</h2>
            <ul style={{ overflowY: 'auto', maxHeight: '500px' }}>
                {shoppingItems.map(item => (
                    <li key={item.id}>
                        {item.ingredient} - Quantity: {item.quantity}
                        <button onClick={() => handleIncrement(item.id, item.quantity)}>+</button>
                        <button onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingList;
