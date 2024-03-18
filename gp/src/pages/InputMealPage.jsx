import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import UserInfo from '../components/UserInfo';
import './styles/InputMeal.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, Timestamp } from 'firebase/firestore';
import InputMeal from '../components/InputMeal';

const InputMealPage = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({});

    
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await fetchUserData(currentUser.uid);
            }
        });
    }, []);

    const fetchUserData = async (uid) => {
        const db = getFirestore();
        const userRef = doc(db, 'users', uid);
        try {
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const calculateBMR = (weight, height, gender) => {
        let BMR = 0;
        if (gender === 'Male') {
          BMR = 13.397 * weight + 4.799 * height - 136.248 + 88.362;
        } else if (gender === 'Female') {
          BMR = 9.247 * weight + 3.098 * height - 103.92 + 447.593;
        }
        return BMR.toFixed(2);
    };

    const userBMR = userData ? calculateBMR(userData.weight, userData.height, userData.gender) : 0;

    return (
        <div>
            <NavigationBar />
            <div className='frame'> 
                <h1>Input Meal</h1>

                <div className='container'>
                    <UserInfo userData={userData} /> {/* Pass userData as props */}
                    <h3>Your Calorie Goal: {userBMR} calories/day</h3>
                </div>
            <InputMeal />    
            </div>
        </div>
    );
};

export default InputMealPage;
