import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc, addDoc, query, where } from 'firebase/firestore';

const ShoppingList = ({ user }) => {
    const [shoppingItems, setShoppingItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        fetchShoppingItems();
    }, [user]); // Fetch when user changes

    const fetchShoppingItems = async () => {
        if (user) {
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

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            await deleteDoc(doc(db, `shoppingList/${user.uid}/ingredients`, itemId));
        } else {
            await updateDoc(doc(db, `shoppingList/${user.uid}/ingredients`, itemId), { quantity: newQuantity });
        }
        fetchShoppingItems();
    };

    const handleSelectItem = (itemId) => {
        setSelectedItems(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(itemId)) {
                newSelection.delete(itemId);
            } else {
                newSelection.add(itemId);
            }
            return Array.from(newSelection);
        });
    };

    const buyItems = async () => {
        const pantryRef = collection(db, 'pantry', user.uid, 'ingredients');
        for (const itemId of selectedItems) {
            const item = shoppingItems.find(it => it.id === itemId);
            const pantryQuery = query(pantryRef, where("ingredient", "==", item.ingredient));
            const pantryDocs = await getDocs(pantryQuery);
            const pantryDoc = pantryDocs.docs[0];

            if (pantryDoc) {
                await updateDoc(pantryDoc.ref, { quantity: pantryDoc.data().quantity + item.quantity });
            } else {
                await addDoc(pantryRef, { ingredient: item.ingredient, quantity: item.quantity, calories: 0, expDate: null });
            }

            await deleteDoc(doc(db, `shoppingList/${user.uid}/ingredients`, itemId));
        }
        setSelectedItems([]);
        fetchShoppingItems();
    };

    const buyAllItems = async () => {
        const pantryRef = collection(db, 'pantry', user.uid, 'ingredients');
        
        for (const item of shoppingItems) {
            const pantryQuery = query(pantryRef, where("ingredient", "==", item.ingredient));
            const pantryDocs = await getDocs(pantryQuery);
            const pantryDoc = pantryDocs.docs[0];
    
            if (pantryDoc) {
                // If the item already exists in pantry, update its quantity
                await updateDoc(pantryDoc.ref, { quantity: pantryDoc.data().quantity + item.quantity });
            } else {
                // If the item doesn't exist in pantry, add it
                await addDoc(pantryRef, { ingredient: item.ingredient, quantity: item.quantity, calories: item.calories, expDate: null });
            }
    
            // Delete the item from the shopping list
            await deleteDoc(doc(db, `shoppingList/${user.uid}/ingredients`, item.id));
        }
        
        // Clear selected items and fetch updated shopping items
        setSelectedItems([]);
        fetchShoppingItems();
    };
    

    return (
        <div>
            <h2>Your Shopping List</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <button style={{ width: '250px', fontWeight: 'bold' }} onClick={buyItems}>Buy Selected Items</button>
                <button style={{ width: '250px', fontWeight: 'bold' }} onClick={buyAllItems}>Buy All Items</button>
            </div>
            <ul style={{ overflowY: 'auto', maxHeight: '500px' }}>
                {shoppingItems.map(item => (
                    <li key={item.id}>
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                        />
                        {item.ingredient} - Quantity: {item.quantity}
                        <button style={{paddingLeft: '13px', paddingRight: '13px', marginLeft: '5px', marginRight: '5px'}} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        <button style={{paddingLeft: '15px', paddingRight: '15px', marginLeft: '5px', marginRight: '5px'}} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingList;
