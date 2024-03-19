import React, { useEffect, useState } from 'react';  
import '../pages/styles/UserInfo.css';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

const UserInfo = ({ user }) => {
    const [userInfo, setUserInfo] = useState({ height: '', weight: '', gender: '' });
    const [userBMR, setUserBMR] = useState(null);

    useEffect(() => {
        if (user) {
            const db = getFirestore();
            const docRef = doc(db, "users", user.uid);

            const unsubscribe = onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    const userData = doc.data();
                    setUserInfo(userData);
                    if (userData.height && userData.weight && userData.gender) {
                        setUserBMR(calculateBMR(userData.weight, userData.height, userData.gender));
                    }
                } else {
                    console.log("No such document!");
                }
            }, error => {
                console.error("Error fetching user data: ", error);
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        }
    }, [user]);

    const calculateBMR = (weight, height, gender) => {
        if (!weight || !height || !gender) {
            return null; // Return null if any of the values is missing or invalid
        }
        let BMR = 0;
        if (gender === 'male') {
            BMR = 13.397 * weight + 4.799 * height - 136.248 + 88.362;
        } else if (gender === 'female') {
            BMR = 9.247 * weight + 3.098 * height - 103.92 + 447.593;
        }
        return BMR.toFixed(2);
    };

    return (
        <div className="UserInfo">
            <h3>User Information:</h3>
            <p>Height: {userInfo.height || 'Loading...'}</p>
            <p>Weight: {userInfo.weight || 'Loading...'}</p>
            <p>Gender: {userInfo.gender || 'Loading...'}</p>
            <h4>Your Calorie Goal: {userBMR ? `${userBMR} calories/day` : 'Calculating...'}</h4>
        </div>
    );
};

export default UserInfo;

