// Import Firebase functions and initialize
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEzKxTwb0t-J6H_bwoto8z3PFJwhd6EBs",
    authDomain: "codify24-52659.firebaseapp.com",
    // REMOVED: databaseURL is not needed for Firestore
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

// FIX: Wait for the HTML to load before running the script
document.addEventListener('DOMContentLoaded', () => {

    const editProfileForm = document.getElementById('edit-profile-form');

    // Fetch and display profile details when user state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, "users", userId);

            getDoc(userDocRef).then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    document.getElementById('name').innerText = userData.name || 'N/A';
                    document.getElementById('age').innerText = userData.age || 'N/A';
                    document.getElementById('location').innerText = userData.location || 'N/A';
                    document.getElementById('bio').innerText = userData.bio || 'N/A';
                    document.getElementById('socials').innerText = userData.socials || 'N/A';
                } else {
                    // FIX: Handle case for new users with no profile data yet
                    console.log("No profile data found for this user.");
                    document.getElementById('bio').innerText = "Welcome! Please edit your profile to add your details.";
                }
            });
        } else {
            console.log("No user logged in");
            alert("User not logged in! Login and try again.");
            // FIX: Corrected the redirect path to be relative
            window.location.href = '../index.html';
        }
    });

    // Handle form submission to update profile
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                // RENAMED: Changed variable for clarity
                const profileData = {
                    name: document.getElementById('edit-name').value,
                    age: document.getElementById('edit-age').value,
                    location: document.getElementById('edit-location').value,
                    bio: document.getElementById('edit-bio').value,
                    socials: document.getElementById('edit-socials').value,
                };
                
                setDoc(doc(db, 'users', userId), profileData, { merge: true })
                    .then(() => {
                        alert("Profile updated successfully!");
                        // Update the UI immediately
                        document.getElementById('name').innerText = profileData.name;
                        document.getElementById('age').innerText = profileData.age;
                        document.getElementById('location').innerText = profileData.location;
                        document.getElementById('bio').innerText = profileData.bio;
                        document.getElementById('socials').innerText = profileData.socials;
                        window.location.href = "#"; // Closes modal or scrolls to top
                    })
                    .catch((error) => {
                        console.error("Error updating profile:", error);
                        alert("There was an error updating your profile. Please try again.");
                    });
            } else {
                alert("No user is signed in.");
            }
        });
    }
});