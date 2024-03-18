import React, { useEffect, useState } from 'react';  
import '../pages/styles/UserInfo.css';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState({ height: '', weight: '', gender: '' });
    const [userBMR, setUserBMR] = useState(null);

    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    if (userData.weight && userData.height && userData.gender) {
                        setUserInfo(userData);
                        setUserBMR(calculateBMR(userData.weight, userData.height, userData.gender));
                    } else {
                        console.log("Incomplete user data!");
                    }
                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchUserInfo();
    }, [auth, db]);

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
