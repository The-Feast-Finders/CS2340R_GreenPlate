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
                await addDoc(pantryRef, { ingredient: item.ingredient, quantity: item.quantity });
            }

            await deleteDoc(doc(db, `shoppingList/${user.uid}/ingredients`, itemId));
        }
        setSelectedItems([]);
        fetchShoppingItems();
    };

    return (
        <div>
            <h2>Your Shopping List</h2>
            <ul style={{ overflowY: 'auto', maxHeight: '500px' }}>
                {shoppingItems.map(item => (
                    <li key={item.id}>
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                        />
                        {item.ingredient} - Quantity: {item.quantity}
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ marginLeft: '5px' , fontSize: '1.2em'}}>+</button>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{fontSize: '1.2em'}}>-</button>
                    </li>
                ))}
            </ul>
            <button onClick={buyItems}>Buy Selected Items</button>
        </div>
    );
};

export default ShoppingList;
