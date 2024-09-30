// Import Firebase functions and initialize
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {getFirestore, doc, getDoc, setDoc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEzKxTwb0t-J6H_bwoto8z3PFJwhd6EBs",
    authDomain: "codify24-52659.firebaseapp.com",
    databaseURL: "https://codify24-52659-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "codify24-52659",
    storageBucket: "codify24-52659.appspot.com",
    messagingSenderId: "442850822241",
    appId: "1:442850822241:web:4ec1f569fe87aec24b4220",
    measurementId: "G-X5Z5TMR7BH"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Reference to the form
const editProfileForm = document.getElementById('edit-profile-form');

// Fetch and display profile details when user logs in
onAuthStateChanged(auth,(user) => {
    if(user) {
        const userId = user.uid;
        const userDocRef = doc(db,"users",userId)

        getDoc(userDocRef).then((docSnapshot) => {
            if(docSnapshot.exists()){
                const userData = docSnapshot.data();
                document.getElementById('name').innerText = userData.name;
                document.getElementById('age').innerText = userData.age;
                document.getElementById('location').innerText = userData.location;
                document.getElementById('bio').innerText = userData.bio;
                document.getElementById('socials').innerText = userData.socials;
            }
        });
    }
    else {
        console.log("No user logged in");
        alert("User not logged in! Login and try again.")
        window.location.href = '/login/login.html';
    }
});

// Handle form submission to update profile
editProfileForm.addEventListener('submit',(event) => {
    event.preventDefault();

    const user = auth.currentUser;
    if(user) {
        const userId = user.uid;
        const updateProfile = {
            name: document.getElementById('edit-name').value,
            age: document.getElementById('edit-age').value,
            location: document.getElementById('edit-location').value,
            bio: document.getElementById('edit-bio').value,
            socials: document.getElementById('edit-socials').value,
        }; 
        setDoc(doc(db, 'users', userId), updateProfile, {merge:true})
            .then(() => {
                alert("Profile updated successfully!");
                // Optionally refresh the page or update fields in real time
                document.getElementById('name').innerText = updateProfile.name;
                document.getElementById('age').innerText = updateProfile.age;
                document.getElementById('location').innerText = updateProfile.location;
                document.getElementById('bio').innerText = updateProfile.bio;
                document.getElementById('socials').innerText = updateProfile.socials;
                window.location.href = "#";

            })
            .catch((error) => {
                console.log("Error updating profile:",error);
            });
    }
    else {
        alert("No user is signed in.")
    }
})