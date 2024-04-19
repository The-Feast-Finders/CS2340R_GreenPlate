import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const ShoppingList = ({ user }) => {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const db = getFirestore();

    useEffect(() => {
        const fetchItems = async () => {
            if (user) {
                const shopRef = collection(db, 'shoppingList', user.uid, 'ingredients');
                const querySnapshot = await getDocs(shopRef);
                let itemList = [];
                querySnapshot.forEach(doc => {
                    itemList.push({ id: doc.id, ...doc.data() });
                });
                setItems(itemList);
            }
        };

        fetchItems();
    }, [user]);
}