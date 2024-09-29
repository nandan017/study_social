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

// Fetch and display profile details when user logs in
onAuthStateChanged(auth,(user) => {
    if(user) {
        const uid = user.uid;
        const docRef = doc(db,"users",uid)
        getDoc(docRef).then((docSnap) => {
            if(docSnap.exists()){
                const userData = docSnap.data();
                document.querySelector("#right p:nth-child(2)").textContent = userData.name || "Your name";
                document.querySelector("#right p:nth-child(4)").textContent = userData.age || "Age";
                document.querySelector("#right p:nth-child(6)").textContent = userData.Location || "Location";
                document.querySelector("#right p:nth-child(8)").textContent = userData.socialLinks || "place your links here";
                document.querySelector("#left p").textContent = userData.bio || "Your bio";
            }
            else {
                console.log("No profile data found");
            }
        });
    }
    else {
        console.log("No user logged in");
    }
});

// Handle form submission to update profile
const form = document.querySelector('.form-4');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.querySelector('input[placeholder="Enter your name"]').value;
  const age = form.querySelector('input[placeholder="Age"]').value;
  const location = form.querySelector('input[placeholder="Location"]').value;
  const bio = form.querySelector('input[placeholder="About/Bio"]').value;
  const socialLinks = form.querySelector('input[placeholder="Place your social links..."]').value;

  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    setDoc(doc(db, "users", uid), {
      name: name,
      age: age,
      location: location,
      bio: bio,
      socialLinks: socialLinks
    }).then(() => {
      alert("Profile updated successfully");
    }).catch((error) => {
      console.error("Error updating profile: ", error);
    });
  } else {
    alert("User is not logged in");
  }
});

