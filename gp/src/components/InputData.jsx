import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const InputData = () => {
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [meals, setMeals] = useState([]); // Assuming this is an array

    // Authenticate and set user
    const auth = getAuth();
    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const handleSave = (event) => {
        event.preventDefault(); // Prevents the default form submit action

        if (user) {
            const userData = { weight, gender, height, meals };
            saveUserData(user.uid, userData);
        } else {
            console.log("No user logged in");
            // Handle the case where there is no user logged in
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
