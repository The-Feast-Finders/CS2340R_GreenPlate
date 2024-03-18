import React, { useEffect, useState } from 'react';  
import '../pages/styles/UserInfo.css'; // Import CSS for styling
import { getFirestore, doc, getDoc } from 'firebase/firestore';//necessary for read, write,listen, and query
import { getAuth } from 'firebase/auth'; //needed to identify current user

const UserInfo = () => { //starting main functional component
  const [userInfo, setUserInfo] = useState({ height: '', weight: '', gender: '' }); //initializing user info with default empty string
  const auth = getAuth(); //initialie instance to acces curr users state
  const db = getFirestore(); // initialize database instance to fetch data

  useEffect(() => { // used to execute side effect component
    const fetchUserInfo = async () => { //asynchronous to fetch curr users info from firebase
      const user = auth.currentUser; // sets user = curr user signed in 
      if (user) { //checks if there is a current user
        const docRef = doc(db, "users", user.uid); // Reference to the user's document
        const docSnap = await getDoc(docRef); // fetches curr "snapshot" of state

        if (docSnap.exists()) { // checks if doc exists
          setUserInfo(docSnap.data()); // if it does, update UserInfo state with the data
        } else { //else
          console.log("No such document!"); //message indicating document does not exist
        }
      }
    };

    fetchUserInfo(); //executes fetching process
  }, [auth, db]); //code will re run if any of these change

  return ( //starts return 
    <div className="UserInfo"> {/* div element of class UserInfo */}
      <h3>User Information:</h3> {/* header*/}
      <p>Height: {userInfo.height}</p> {/* displays info*/}
      <p>Weight: {userInfo.weight}</p> {/* displays info*/}
      <p>Gender: {userInfo.gender}</p> {/* displays info*/}
    </div>
  );
};

export default UserInfo;

//Men: BMR = 13.397W + 4.799H - 136.248 + 88.362
//Women: BMR = 9.247W + 3.098H - 103.92 + 447.593