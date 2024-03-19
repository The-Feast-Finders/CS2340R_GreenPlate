import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const InputData = ({ user }) => {
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');

    const navigate = useNavigate();

    const handleSave = async (event) => {
        event.preventDefault();

        if (user) {
            const userData = { weight, gender, height };
            await saveUserData(user.uid, userData);
        } else {
            console.log("No user logged in");
            
        }
    };

    const saveUserData = async (uid, userData) => {
        try {
            const db = getFirestore();
            const userRef = doc(db, 'users', uid);
            await setDoc(userRef, userData, { merge: true });
            console.log('User data saved successfully');
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    

    return (
        <form onSubmit={handleSave}>
            <div>
                <label htmlFor="weight">Weight:</label>
                <input
                    type="number"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="height">Height:</label>
                <input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default InputData;
